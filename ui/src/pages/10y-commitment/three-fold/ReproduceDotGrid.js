import { AspectRatio, Box } from 'components';
import React, { useEffect, useRef } from 'react';
import { COLORS } from '../constants';

// Interactive replacement for the static reproduce/diagram.svg. The original art
// is a diamond-shaped cluster of #9CB5FF dots that shrink toward the edges, with a
// single #003CFF hub radiating spokes to a handful of nearby (but not strictly
// adjacent) nodes. Here the hub is whichever node sits closest to the cursor.
//
// There is always exactly ONE centre dot — the grid dot nearest the cursor — and
// every live line runs from that single centre out to an outer dot. As the cursor
// moves to the next dot the lines re-anchor to it (the previous dot stops being a
// centre), so connections accumulate and the star reaches further as you move.
// Each outer connection carries its own lifespan: the ones the current centre keeps
// choosing stay refreshed, while those inherited from earlier positions start their
// timer the moment the cursor moves on and fade out after a few seconds. Every grid
// Dot sizes follow the cursor rather than the grid: the dot under the cursor is
// the biggest and brightest, easing down (with per-dot randomness) toward the
// edges, so a soft spotlight tracks the pointer. Canvas + a single rAF loop
// because we animate lots of lines and resize every dot each frame.

// Denser, larger cluster than the source SVG so the accumulating web has room to
// grow and fill out instead of saturating a handful of dots.
const COLS = 17;
const ROWS = 15;
const DIAMOND_CLIP = 1.08; // keep nodes inside a slightly soft rhombus

// Neighbour selection (in grid cells). A spoke can reach anywhere in this ring,
// so lengths and angles vary instead of locking onto the 8 immediate neighbours.
const MIN_REACH = 1.0;
const MAX_REACH = 4.0;
const MIN_SPOKES = 1;
const MAX_SPOKES = 3;

// While the cursor is moving, a hub draws only MIN..MAX_SPOKES so the trail stays
// light. Once the cursor has been still for REST_DELAY_MS the current hub blooms
// out to REST_SPOKES_MIN..MAX so it settles into a fuller star instead of a stub.
const REST_SPOKES_MIN = 5;
const REST_SPOKES_MAX = 7;
const REST_DELAY_MS = 160;

// Spoke timing, in ms. GROW_MS is how long a spoke takes to extend to its dot.
// LIFE_MS is how long a spoke stays after it was last touched by the cursor; over
// the final FADE_MS of that life it fades out before being removed.
const GROW_MS = 280;
const LIFE_MS = 1000;
const FADE_MS = 1400;

// Deterministic pseudo-random in [0,1) from two ints, so a given hub always picks
// the same web (no flicker) while different hubs look different.
const hashRand = (a, b) => {
  const v = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return v - Math.floor(v);
};

const easeOutCubic = (t) => 1 - (1 - t) ** 3;

const ReproduceDotGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    let nodes = [];
    let width = 0;
    let height = 0;
    let cell = 0;
    let focusR = 0; // radius over which the cursor's size spotlight falls off
    let centerIdx = 0;
    let pointer = null; // { x, y } in CSS px, or null at rest
    // Outer connections keyed by their outer dot index -> { progress, life }. They
    // all anchor to the current hub, so only the outer end is stored.
    let conns = new Map();
    let lastWanted = new Set(); // outer indices refreshed by the current hub
    let idleMs = 0; // ms since the cursor last moved (reset on every pointermove)
    let restingNow = false; // true once idle past REST_DELAY_MS -> hub blooms
    let rafId = null;
    let lastTime = 0;

    const dot = (x, y, r) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    // Build the diamond cluster once in normalised space. weight is 1 at the centre
    // and falls to 0 at the rim; it drives the dot-size/opacity falloff. baseR adds
    // a little per-dot randomness so the cluster isn't a rigid gradient.
    const buildNodes = () => {
      nodes = [];
      let best = -1;
      for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
          const nx = (col / (COLS - 1)) * 2 - 1; // -1..1
          const ny = (row / (ROWS - 1)) * 2 - 1;
          if (Math.abs(nx) + Math.abs(ny) > DIAMOND_CLIP) continue;
          const weight = Math.max(0, 1 - Math.hypot(nx, ny));
          // rand is a stable per-dot random factor; actual radius is computed each
          // frame from the dot's distance to the cursor (see draw), not baked here.
          const rand = hashRand(col + 1, row + 1);
          nodes.push({ nx, ny, weight, rand, x: 0, y: 0, r: 0, idleAlpha: 0 });
          if (weight > best) {
            best = weight;
            centerIdx = nodes.length - 1;
          }
        }
      }
    };

    // The node indices a hub connects to: a stable, varied pick from the reachable
    // ring. The resting set is a superset of the moving set (same sorted prefix),
    // so blooming on stop only adds spokes — it never reshuffles existing ones.
    const spokesFor = (hubIdx, resting) => {
      const hub = nodes[hubIdx];
      const candidates = [];
      nodes.forEach((n, i) => {
        if (i === hubIdx) return;
        const d = Math.hypot(n.x - hub.x, n.y - hub.y) / cell;
        if (d >= MIN_REACH && d <= MAX_REACH) {
          candidates.push({ i, score: hashRand(hubIdx + 1, i + 1) });
        }
      });
      candidates.sort((a, b) => a.score - b.score);
      const count = resting
        ? REST_SPOKES_MIN +
          Math.floor(
            hashRand(hubIdx * 2 + 5, 11) *
              (REST_SPOKES_MAX - REST_SPOKES_MIN + 1)
          )
        : MIN_SPOKES +
          Math.floor(
            hashRand(hubIdx * 2 + 3, 7) * (MAX_SPOKES - MIN_SPOKES + 1)
          );
      return candidates.slice(0, count).map((c) => c.i);
    };

    const currentHub = () => {
      if (!pointer) return centerIdx;
      let best = Infinity;
      let idx = centerIdx;
      nodes.forEach((n, i) => {
        const d = (n.x - pointer.x) ** 2 + (n.y - pointer.y) ** 2;
        if (d < best) {
          best = d;
          idx = i;
        }
      });
      return idx;
    };

    const step = (dt) => {
      // The current hub picks its outer dots; those connections get their life
      // topped up (so they persist while the cursor rests here) and any that are
      // brand new grow in. Connections the hub no longer chooses — including all the
      // ones inherited from the previous dot — age and fade out. Every connection,
      // old or new, is drawn from this one hub, so the lines follow the cursor.
      idleMs += dt;
      restingNow = idleMs >= REST_DELAY_MS;
      const hubIdx = currentHub();
      conns.delete(hubIdx); // a dot can't connect to itself once it's the centre
      const wanted = new Set();
      spokesFor(hubIdx, restingNow).forEach((to) => {
        if (to === hubIdx) return;
        wanted.add(to);
        const c = conns.get(to);
        if (c) c.life = LIFE_MS;
        else conns.set(to, { progress: 0, life: LIFE_MS });
      });
      conns.forEach((c, to) => {
        if (c.progress < 1) c.progress = Math.min(1, c.progress + dt / GROW_MS);
        if (!wanted.has(to)) c.life -= dt;
        if (c.life <= 0) conns.delete(to);
      });
      lastWanted = wanted;
      return hubIdx;
    };

    const lineAlpha = (c) => Math.min(1, c.life / FADE_MS);

    const draw = (hubIdx) => {
      ctx.clearRect(0, 0, width, height);
      const hub = nodes[hubIdx];
      const fx = pointer ? pointer.x : hub.x;
      const fy = pointer ? pointer.y : hub.y;

      // Size + brightness track the cursor: the dot under it is biggest/brightest,
      // easing down toward the edges. Jitter (stable per dot) barely touches dots
      // near the cursor and grows outward, so the focus is steady while the rim is
      // randomly sized. Cached on each node for the lines/overlay below.
      nodes.forEach((n, i) => {
        // The hub is treated as full focus (no distance penalty, no jitter) so the
        // dot under the cursor is always the biggest and its size stays steady as
        // the cursor moves within a cell. Other dots ease down by distance, with
        // jitter that vanishes near the cursor and grows outward to randomise the rim.
        const fw =
          i === hubIdx
            ? 1
            : Math.max(0, 1 - Math.hypot(n.x - fx, n.y - fy) / focusR);
        const jitter = i === hubIdx ? 1 : 1 - n.rand * (1 - fw) * 0.6;
        n.r = Math.max(0.9, (0.7 + fw ** 1.3 * 6.3) * jitter);
        n.idleAlpha = 0.28 + fw * 0.55;
      });

      // How "lit" each node is (0..1): the one centre is full; each connected outer
      // dot gets its line's grown-and-faded strength. Lit dots are the same accent
      // dots crossfaded to blue on top, so they never change size.
      const litness = new Map([[hubIdx, 1]]);
      conns.forEach((c, to) => {
        litness.set(
          to,
          Math.max(
            litness.get(to) || 0,
            easeOutCubic(c.progress) * lineAlpha(c)
          )
        );
      });

      // Idle cluster dots, faded; size from the cursor spotlight.
      ctx.fillStyle = COLORS.accentBlue;
      nodes.forEach((n) => {
        ctx.globalAlpha = n.idleAlpha;
        dot(n.x, n.y, n.r);
      });

      // Lines from the single hub out to each connected dot, drawn as far as they've
      // grown and faded by their remaining life.
      ctx.strokeStyle = COLORS.activeBlue;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      conns.forEach((c, to) => {
        const end = nodes[to];
        const p = easeOutCubic(c.progress);
        ctx.globalAlpha = lineAlpha(c);
        ctx.beginPath();
        ctx.moveTo(hub.x, hub.y);
        ctx.lineTo(hub.x + (end.x - hub.x) * p, hub.y + (end.y - hub.y) * p);
        ctx.stroke();
      });

      // Blue overlay on lit nodes, alpha = litness, same radius as the idle dot.
      ctx.fillStyle = COLORS.activeBlue;
      litness.forEach((lit, i) => {
        ctx.globalAlpha = lit;
        dot(nodes[i].x, nodes[i].y, nodes[i].r);
      });
      ctx.globalAlpha = 1;
    };

    // Keep ticking until the cursor has been still long enough to bloom AND the
    // bloomed star is fully grown with nothing left fading — only then is it static.
    const settled = () => {
      if (!restingNow) return false;
      let still = true;
      conns.forEach((c, to) => {
        if (c.progress < 1 || !lastWanted.has(to)) still = false;
      });
      return still;
    };

    const frame = (time) => {
      const dt = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      const hubIdx = step(dt);
      draw(hubIdx);
      if (!settled()) {
        rafId = requestAnimationFrame(frame);
      } else {
        rafId = null;
        lastTime = 0;
      }
    };

    const kick = () => {
      if (rafId == null) {
        lastTime = 0;
        rafId = requestAnimationFrame(frame);
      }
    };

    const layout = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const halfW = (width * 0.92) / 2;
      const halfH = (height * 0.92) / 2;
      const cx = width / 2;
      const cy = height / 2;
      nodes.forEach((n) => {
        n.x = cx + n.nx * halfW;
        n.y = cy + n.ny * halfH;
      });
      cell = (halfW * 2) / (COLS - 1);
      focusR = halfW * 1.3;
      kick();
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      idleMs = 0; // moving keeps the trail light; bloom only after we stop
      kick();
    };
    const onLeave = () => {
      pointer = null;
      kick();
    };

    buildNodes();
    layout();

    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(canvas);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <Box w="100%" maxW="560px" px={{ base: 2, md: 4 }}>
      <AspectRatio ratio={479.421 / 422.25} w="100%">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Interactive diagram of one disciple reproducing into many"
          style={{ width: '100%', height: '100%', touchAction: 'none' }}
        />
      </AspectRatio>
    </Box>
  );
};

export default ReproduceDotGrid;
