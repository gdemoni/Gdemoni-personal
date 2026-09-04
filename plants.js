import { sketchPlant } from './botanical-art.js';
// Original botanical silhouettes: curved stems, unequal leaves and fine veins.
const palette = ['#9db391', '#bfd0ae', '#78956f', '#aabb8e', '#8ea982'];
const path = (d, cls = '', fill = 'none') => `<path d="${d}" class="${cls}" fill="${fill}"/>`;

function leaf(x, y, tipX, tipY, width, color) {
  const dx = tipX - x, dy = tipY - y;
  const length = Math.hypot(dx, dy);
  const nx = -dy / length * width, ny = dx / length * width;
  const mx = x + dx * .52, my = y + dy * .52;
  return path(`M${x} ${y} Q${mx + nx} ${my + ny} ${tipX} ${tipY} Q${mx - nx * .72} ${my - ny * .72} ${x} ${y}Z`, 'botanical-leaf', color)
    + path(`M${x} ${y} Q${mx + nx * .12} ${my + ny * .12} ${tipX} ${tipY}`, 'botanical-vein');
}

function foliage(index, fern) {
  let drawing = '';
  const count = fern ? 11 : 5;
  // Three branches make a clump, with room between them for the scene behind.
  for (let branch = 0; branch < 3; branch++) {
    const tilt = [-32, 12, 39][branch] + (index % 3) * 3;
    let stem = path('M100 310 Q76 183 101 35', 'botanical-stem');
    for (let n = 0; n < count; n++) {
      const t = n / count;
      const y = 253 - t * 193, x = 88 + t * t * 11;
      const reach = (fern ? 55 : 66) * (1 - t * .65);
      for (const side of [-1, 1]) {
        stem += leaf(x, y + side * 5, x + side * reach, y - (fern ? 29 : 52), fern ? 9 : 23, palette[(n + branch + index) % palette.length]);
      }
    }
    stem += leaf(99, 66, 102, 17, fern ? 8 : 15, palette[index % 5]);
    drawing += `<g transform="rotate(${tilt} 100 310) translate(0 ${branch === 1 ? 0 : 30})">${stem}</g>`;
  }
  return drawing;
}

function grasses(index) {
  let drawing = '';
  for (let n = 0; n < 9; n++) {
    const x = 91 + n * 2;
    const tipX = 12 + n * 21;
    const tipY = 24 + ((n * 43 + index * 29) % 133);
    const bend = (tipX - 100) * .8;
    drawing += path(`M${x} 318 Q${x + bend * .2} 150 ${tipX} ${tipY} Q${x + bend + 21} 188 ${x + 7} 318Z`, 'botanical-blade', palette[(n + index) % 5]);
    drawing += path(`M${x + 3} 310 Q${x + bend * .6} 166 ${tipX} ${tipY}`, 'botanical-vein');
  }
  return drawing;
}

export function plantForeground(foreground) {
  const bed = foreground?.querySelector('.garden-plant-bed');
  if (!bed) return;
  const planes = {
    far: [[7, 74, 'grass'], [20, 58, 'grass'], [34, 82, 'fern'], [48, 68, 'grass'], [62, 80, 'grass'], [76, 65, 'fern'], [92, 86, 'grass']],
    middle: [[0, 235, 'broad'], [12, 205, 'rolled'], [23, 185, 'spear'], [32, 195, 'fern'], [44, 180, 'broad'], [54, 175, 'fern'], [61, 150, 'spear'], [73, 175, 'fern'], [84, 185, 'broad'], [95, 185, 'spear']],
    near: [[1, 480, 'broad'], [14, 355, 'rolled'], [32, 185, 'fern'], [44, 225, 'broad'], [64, 395, 'rolled'], [85, 290, 'broad'], [100, 200, 'fern']],
  };
  const layers = Object.entries(planes).map(([depth, specs]) => {
    const layer = document.createElement('div');
    layer.className = `botanical-layer botanical-layer-${depth}`;
    layer.dataset.depth = depth;
    layer.replaceChildren(...specs.map(([x, height, kind], i) => {
      const plant = document.createElement('div');
      plant.className = `botanical-clump botanical-${kind}`;
      plant.dataset.depth = depth;
      plant.style.cssText = `--plant-x:${x}%;--plant-height:${height}px;--plant-lean:${i % 2 ? 5 : -4}deg;--plant-depth:${i % 3};--breeze-duration:${5.3 + i % 5 * .7}s;--breeze-delay:${-i * 1.37}s;`;
      const drawing = depth === 'far' ? (kind === 'grass' ? grasses(i) : foliage(i, true)) : sketchPlant(kind, i);
      plant.innerHTML = `<svg viewBox="0 0 200 320" preserveAspectRatio="none" aria-hidden="true"><g class="botanical-sway">${drawing}</g></svg>`;
      return plant;
    }));
    return layer;
  });
  bed.replaceChildren(...layers);

  const scene = foreground.closest('.garden-world-section');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clumps = [...bed.querySelectorAll('.botanical-clump')];
  let pending = 0, pointer = null;
  function draw() {
    pending = 0;
    const bounds = bed.getBoundingClientRect();
    const look = pointer && bounds.width ? Math.max(-1, Math.min(1, (pointer.x - bounds.left) / bounds.width * 2 - 1)) : 0;
    layers.forEach(layer => {
      const parallax = { far: 1, middle: 3, near: 9 }[layer.dataset.depth];
      layer.style.setProperty('--layer-shift', `${(-look * parallax).toFixed(2)}px`);
    });
    clumps.forEach(plant => {
      // Anchor positions are independent of the transform: no feedback jitter.
      const center = bounds.left + plant.offsetLeft + plant.offsetWidth / 2;
      const distance = pointer ? pointer.x - center : Infinity;
      const near = pointer && pointer.y > bounds.top + plant.offsetTop - 55;
      const radius = Math.max(145, plant.offsetWidth * .7);
      const influence = near ? Math.max(0, 1 - Math.abs(distance) / radius) : 0;
      const bend = { far: 4, middle: 10, near: 16 }[plant.dataset.depth];
      const lean = influence * (distance < 0 ? 1 : -1) * bend;
      plant.style.setProperty('--plant-touch', `${lean.toFixed(2)}deg`);
    });
  }
  function reset() {
    pointer = null;
    if (pending) cancelAnimationFrame(pending);
    draw();
  }
  scene.addEventListener('pointermove', event => {
    if (reduced.matches || event.pointerType === 'touch') return;
    pointer = { x: event.clientX, y: event.clientY };
    if (!pending) pending = requestAnimationFrame(draw);
  }, { passive: true });
  scene.addEventListener('pointerleave', reset);
  scene.addEventListener('pointercancel', reset);
  reduced.addEventListener('change', reset);
  window.addEventListener('blur', reset);
}
