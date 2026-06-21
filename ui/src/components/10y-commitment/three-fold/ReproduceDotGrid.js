import { AspectRatio, Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { COLORS } from '../constants';

// Interactive replacement for the static reproduce/diagram.svg. The original art
// is a diamond-shaped cluster of #9CB5FF dots that shrink toward the edges, with a
// single #003CFF hub radiating spokes to its nearest neighbours. Here the hub is
// whichever node sits closest to the cursor, so the spokes redraw as the pointer
// moves. Canvas (not SVG/React state) because the hub recomputes on every
// pointermove and we don't want to thrash the DOM for ~100 nodes.

// Grid is built in normalised space then mapped to pixels on resize, so the whole
// thing stays responsive. The aspect ratio matches the source SVG's viewBox.
const COLS = 13;
const ROWS = 11;
const DIAMOND_CLIP = 1.08; // keep nodes inside a slightly soft rhombus
const MAX_NEIGHBOURS = 8;
const NEIGHBOUR_REACH = 2.6; // in grid cells

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
    let pointer = null; // { x, y } in CSS px relative to canvas, or null
    let rafId = null;

    const dot = (x, y, r) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    // Build the diamond cluster once. weight is 1 at the centre and falls to 0 at
    // the rim — it drives both the dot radius and opacity falloff seen in the art.
    const buildNodes = () => {
      nodes = [];
      for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
          const nx = (col / (COLS - 1)) * 2 - 1; // -1..1
          const ny = (row / (ROWS - 1)) * 2 - 1;
          if (Math.abs(nx) + Math.abs(ny) > DIAMOND_CLIP) continue;
          const weight = Math.max(0, 1 - Math.hypot(nx, ny));
          nodes.push({ nx, ny, weight, x: 0, y: 0 });
        }
      }
    };

    const draw = () => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);

      // Pick the hub: nearest node to the cursor, or the centre node at rest.
      let hub;
      if (pointer) {
        let best = Infinity;
        nodes.forEach((n) => {
          const d = (n.x - pointer.x) ** 2 + (n.y - pointer.y) ** 2;
          if (d < best) {
            best = d;
            hub = n;
          }
        });
      } else {
        hub = nodes.reduce((a, b) => (b.weight > a.weight ? b : a));
      }

      const reach = cell * NEIGHBOUR_REACH;
      const neighbours = nodes
        .filter((n) => n !== hub)
        .map((n) => ({ n, d: Math.hypot(n.x - hub.x, n.y - hub.y) }))
        .filter((o) => o.d <= reach)
        .sort((a, b) => a.d - b.d)
        .slice(0, MAX_NEIGHBOURS)
        .map((o) => o.n);
      const active = new Set(neighbours);

      // Spokes first, under the dots.
      ctx.strokeStyle = COLORS.activeBlue;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      neighbours.forEach((n) => {
        ctx.beginPath();
        ctx.moveTo(hub.x, hub.y);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();
      });

      // Idle dots, faded and shrunk toward the rim.
      ctx.fillStyle = COLORS.accentBlue;
      nodes.forEach((n) => {
        if (n === hub || active.has(n)) return;
        ctx.globalAlpha = 0.3 + n.weight * 0.6;
        dot(n.x, n.y, 1.6 + n.weight * 2.8);
      });
      ctx.globalAlpha = 1;

      // Connected neighbours, then the hub on top.
      ctx.fillStyle = COLORS.activeBlue;
      neighbours.forEach((n) => dot(n.x, n.y, 3.2));
      dot(hub.x, hub.y, 6);
    };

    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        draw();
      });
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
      draw();
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
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
      if (rafId) cancelAnimationFrame(rafId);
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
