import { AspectRatio, Box } from 'components';
import React, { useEffect, useRef } from 'react';
import { COLORS } from '../constants';

// Diamond dot cluster. Idle: overlapping webs — a hub lights, then spokes grow,
// while the next hub starts before the last fades. Hover: single cursor hub.

const COLS = 17;
const ROWS = 15;
const DIAMOND_CLIP = 1.08;

const MIN_REACH = 1.0;
const MAX_REACH = 4.0;
const MIN_SPOKES = 1;
const MAX_SPOKES = 3;

const REST_SPOKES_MIN = 5;
const REST_SPOKES_MAX = 7;
const REST_DELAY_MS = 160;

const AUTO_HIGHLIGHT_MS = 380;
const AUTO_HOLD_MS = 900;
const AUTO_SPAWN_MS = 1500;
const AUTO_MAX_WEBS = 3;
const AUTO_SPOKES_MIN = 3;
const AUTO_SPOKES_MAX = 5;

const RIPPLE_MS = 950;
const SIZE_SMOOTH_MS = 140;
const HUB_BLEND_MS = 500; // cursor hub crossfade / bloom in

const GROW_MS = 280;
const LIFE_MS = 1000;
const FADE_MS = 1400;
const CURSOR_MAX_CONNS = 12;

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
    let focusR = 0;
    let centerIdx = 0;
    let pointer = null;
    // Spokes keyed `${from}:${to}`. Cursor rewrites `from` to the live hub.
    let conns = new Map();
    let connSeq = 0;
    let lastWanted = new Set();
    let idleMs = 0;
    let restingNow = false;
    let webs = []; // { hub, phase, phaseMs, age }
    let spawnMs = 0;
    let focusHub = 0;
    let lastHub = -1; // previous cursor hub for crossfade
    let cursorHubAge = 0;
    let prevHub = -1;
    let prevHubFade = 0;
    let rafId = null;
    let lastTime = 0;

    const dot = (x, y, r) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const buildNodes = () => {
      nodes = [];
      let best = -1;
      for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
          const nx = (col / (COLS - 1)) * 2 - 1;
          const ny = (row / (ROWS - 1)) * 2 - 1;
          if (Math.abs(nx) + Math.abs(ny) > DIAMOND_CLIP) continue;
          const w = Math.max(0, 1 - Math.hypot(nx, ny));
          nodes.push({
            nx,
            ny,
            rand: hashRand(col + 1, row + 1),
            x: 0,
            y: 0,
            r: 0,
            idleAlpha: 0,
          });
          if (w > best) {
            best = w;
            centerIdx = nodes.length - 1;
          }
        }
      }
    };

    const spokesFor = (hubIdx, mode) => {
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
      let lo = MIN_SPOKES;
      let hi = MAX_SPOKES;
      let salt = 7;
      if (mode === 'rest') {
        lo = REST_SPOKES_MIN;
        hi = REST_SPOKES_MAX;
        salt = 11;
      } else if (mode === 'auto') {
        lo = AUTO_SPOKES_MIN;
        hi = AUTO_SPOKES_MAX;
        salt = 13;
      }
      const count =
        lo + Math.floor(hashRand(hubIdx * 2 + 3, salt) * (hi - lo + 1));
      return candidates.slice(0, count).map((c) => c.i);
    };

    const pickAutoHub = (avoid) => {
      if (nodes.length < 2) return 0;
      let idx = Math.floor(Math.random() * nodes.length);
      let tries = 0;
      while (avoid && avoid.has(idx) && tries < 8) {
        idx = Math.floor(Math.random() * nodes.length);
        tries += 1;
      }
      return idx;
    };

    const cursorHub = () => {
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

    const ageConns = (dt, liveKeys) => {
      conns.forEach((c, key) => {
        if (c.progress < 1) c.progress = Math.min(1, c.progress + dt / GROW_MS);
        if (!liveKeys.has(key)) c.life -= dt;
        if (c.life <= 0) conns.delete(key);
      });
    };

    const spawnWeb = () => {
      const used = new Set(webs.map((w) => w.hub));
      webs.push({
        hub: pickAutoHub(used),
        phase: 'highlight',
        phaseMs: 0,
        age: 0,
      });
      spawnMs = 0;
    };

    const stepCursor = (dt) => {
      idleMs += dt;
      restingNow = idleMs >= REST_DELAY_MS;
      const hubIdx = cursorHub();
      if (hubIdx !== lastHub) {
        if (lastHub >= 0) {
          prevHub = lastHub;
          prevHubFade = 1;
        }
        lastHub = hubIdx;
        cursorHubAge = 0;
      }
      cursorHubAge += dt;
      if (prevHubFade > 0) {
        prevHubFade = Math.max(0, prevHubFade - dt / HUB_BLEND_MS);
        if (prevHubFade <= 0) prevHub = -1;
      }
      focusHub = hubIdx;

      // Re-anchor every spoke to the live hub (single-hub cursor mode).
      [...conns.entries()].forEach(([key, c]) => {
        if (c.from === hubIdx) return;
        conns.delete(key);
        c.from = hubIdx;
        conns.set(`${hubIdx}:${c.to}`, c);
      });

      const liveKeys = new Set();
      spokesFor(hubIdx, restingNow ? 'rest' : 'move').forEach((to) => {
        if (to === hubIdx) return;
        const key = `${hubIdx}:${to}`;
        liveKeys.add(key);
        connSeq += 1;
        const c = conns.get(key);
        if (c) {
          c.life = LIFE_MS;
          c.seq = connSeq;
        } else {
          conns.set(key, {
            from: hubIdx,
            to,
            progress: 0,
            life: LIFE_MS,
            seq: connSeq,
          });
        }
      });
      ageConns(dt, liveKeys);

      if (conns.size > CURSOR_MAX_CONNS) {
        [...conns.entries()]
          .sort((a, b) => {
            const aLive = liveKeys.has(a[0]) ? 1 : 0;
            const bLive = liveKeys.has(b[0]) ? 1 : 0;
            if (aLive !== bLive) return aLive - bLive;
            return (a[1].seq || 0) - (b[1].seq || 0);
          })
          .slice(0, conns.size - CURSOR_MAX_CONNS)
          .forEach(([key]) => conns.delete(key));
      }
      lastWanted = liveKeys;
    };

    const stepAuto = (dt) => {
      spawnMs += dt;
      if (
        webs.length === 0 ||
        (spawnMs >= AUTO_SPAWN_MS && webs.length < AUTO_MAX_WEBS)
      ) {
        spawnWeb();
      }

      const liveKeys = new Set();
      const next = [];

      webs.forEach((w) => {
        w.age += dt;
        w.phaseMs += dt;
        let keep = true;

        if (w.phase === 'highlight') {
          if (w.phaseMs >= AUTO_HIGHLIGHT_MS) {
            w.phase = 'connect';
            w.phaseMs = 0;
          }
        } else if (w.phase === 'connect' || w.phase === 'hold') {
          const outs = spokesFor(w.hub, 'auto');
          if (!outs.length) {
            keep = false;
          } else {
            outs.forEach((to) => {
              if (to === w.hub) return;
              const key = `${w.hub}:${to}`;
              liveKeys.add(key);
              const c = conns.get(key);
              if (c) c.life = LIFE_MS;
              else
                conns.set(key, {
                  from: w.hub,
                  to,
                  progress: 0,
                  life: LIFE_MS,
                });
            });
            if (w.phase === 'connect') {
              let grown = true;
              outs.forEach((to) => {
                const c = conns.get(`${w.hub}:${to}`);
                if (!c || c.progress < 1) grown = false;
              });
              if (grown) {
                w.phase = 'hold';
                w.phaseMs = 0;
              }
            } else if (w.phaseMs >= AUTO_HOLD_MS) {
              keep = false;
            }
          }
        }

        if (keep) next.push(w);
      });

      webs = next;
      focusHub = webs.length ? webs[webs.length - 1].hub : focusHub;
      ageConns(dt, liveKeys);
      lastWanted = liveKeys;
    };

    const lineAlpha = (c) => Math.min(1, c.life / FADE_MS);

    // Expanding disk from a hub, 0..1 by distance and age.
    const rippleAt = (hx, hy, age, x, y) => {
      const t = Math.min(1, age / RIPPLE_MS);
      if (t <= 0) return 0;
      const reach = easeOutCubic(t) * focusR;
      const dist = Math.hypot(x - hx, y - hy);
      return dist <= reach ? Math.max(0, 1 - dist / focusR) : 0;
    };

    const easeToward = (cur, target, dt, ms) =>
      cur + (target - cur) * Math.min(1, dt / ms);

    const draw = (hubIdx, dt) => {
      ctx.clearRect(0, 0, width, height);
      const hub = nodes[hubIdx];
      const fx = pointer ? pointer.x : hub.x;
      const fy = pointer ? pointer.y : hub.y;

      nodes.forEach((n, i) => {
        let fw;
        if (pointer) {
          const bloom = easeOutCubic(Math.min(1, cursorHubAge / HUB_BLEND_MS));
          fw = Math.max(0, 1 - Math.hypot(n.x - fx, n.y - fy) / focusR);
          if (i === hubIdx) fw = Math.max(fw, bloom);
          if (i === prevHub && prevHubFade > 0) {
            fw = Math.max(fw, prevHubFade * 0.85);
          }
        } else {
          fw = 0;
          webs.forEach((w) => {
            const h = nodes[w.hub];
            fw = Math.max(fw, rippleAt(h.x, h.y, w.age, n.x, n.y));
          });
        }
        const jitter = fw > 0.85 ? 1 : 1 - n.rand * (1 - fw) * 0.6;
        const targetR = Math.max(0.9, (0.7 + fw ** 1.3 * 6.3) * jitter);
        const targetA = 0.28 + fw * 0.55;
        n.r = easeToward(n.r, targetR, dt, SIZE_SMOOTH_MS);
        n.idleAlpha = easeToward(n.idleAlpha, targetA, dt, SIZE_SMOOTH_MS);
      });

      const litness = new Map();
      if (pointer) {
        const bloom = easeOutCubic(Math.min(1, cursorHubAge / HUB_BLEND_MS));
        litness.set(hubIdx, bloom);
        if (prevHub >= 0 && prevHubFade > 0) {
          litness.set(prevHub, prevHubFade);
        }
      } else {
        webs.forEach((w) => {
          const bloom = easeOutCubic(Math.min(1, w.age / (RIPPLE_MS * 0.28)));
          litness.set(w.hub, Math.max(litness.get(w.hub) || 0, bloom));
        });
      }
      conns.forEach((c) => {
        const a = easeOutCubic(c.progress) * lineAlpha(c);
        litness.set(c.from, Math.max(litness.get(c.from) || 0, a));
        litness.set(c.to, Math.max(litness.get(c.to) || 0, a));
      });

      ctx.fillStyle = COLORS.accentBlue;
      nodes.forEach((n) => {
        ctx.globalAlpha = n.idleAlpha;
        dot(n.x, n.y, n.r);
      });

      ctx.strokeStyle = COLORS.activeBlue;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      conns.forEach((c) => {
        const start = pointer ? nodes[hubIdx] : nodes[c.from];
        const end = nodes[c.to];
        const p = easeOutCubic(c.progress);
        ctx.globalAlpha = lineAlpha(c);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(
          start.x + (end.x - start.x) * p,
          start.y + (end.y - start.y) * p
        );
        ctx.stroke();
      });

      ctx.fillStyle = COLORS.activeBlue;
      litness.forEach((lit, i) => {
        ctx.globalAlpha = lit;
        dot(nodes[i].x, nodes[i].y, nodes[i].r);
      });
      ctx.globalAlpha = 1;
    };

    const settled = () => {
      if (!pointer || !restingNow) return false;
      if (cursorHubAge < HUB_BLEND_MS || prevHubFade > 0) return false;
      let still = true;
      conns.forEach((c, key) => {
        if (c.progress < 1 || !lastWanted.has(key)) still = false;
      });
      return still;
    };

    const frame = (time) => {
      const dt = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      if (pointer) stepCursor(dt);
      else stepAuto(dt);
      draw(focusHub, dt);
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
      const wasIdle = !pointer;
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      idleMs = 0;
      if (wasIdle) {
        webs = [];
        conns.clear();
        lastHub = -1;
        prevHub = -1;
        prevHubFade = 0;
        cursorHubAge = 0;
      }
      kick();
    };
    const onLeave = () => {
      pointer = null;
      conns.clear();
      webs = [];
      lastHub = -1;
      prevHub = -1;
      prevHubFade = 0;
      spawnMs = AUTO_SPAWN_MS;
      kick();
    };

    buildNodes();
    focusHub = centerIdx;
    spawnMs = AUTO_SPAWN_MS;
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
