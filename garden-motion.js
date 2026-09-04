export function animateVisitors(foreground) {
  if (!foreground) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const walkers = [...foreground.querySelectorAll('.sketch-visitor')].map((element, index) => ({
    element, x: 0, age: index * 4.5, direction: index === 1 ? -1 : 1, speed: 0, mode: '', index,
  }));
  let frame = 0, previous = 0, width = 0, end = 0;
  function measure() {
    if (!document.body.classList.contains('garden-open')) return;
    const box = foreground.getBoundingClientRect();
    width = box.width;
    const door = document.querySelector('.garden-world-door')?.getBoundingClientRect();
    end = Math.max(100, Math.min(width - 65, (door?.left ?? width) - box.left - 60));
    walkers.forEach(walker => {
      walker.x = walker.x ? Math.min(walker.x, end) : end * [.12, .43, .75][walker.index];
      walker.element.style.setProperty('--visitor-x', `${walker.x}px`);
    });
  }
  function mode(walker, value) {
    if (walker.mode === value) return;
    walker.mode = value;
    walker.element.dataset.gait = value;
    if (!walker.element.classList.contains('is-paused')) {
      walker.element.setAttribute('aria-label', value === 'run' ? '正在小跑的小人，点击停留 5 秒 / Pause for 5 seconds' : '正在散步的小人，点击停留 5 秒 / Pause for 5 seconds');
      walker.element.querySelector('.visitor-note').textContent = value === 'run' ? ['Let’s go!', 'Coming!', 'Aha!'][walker.index] : ['Aha!', 'Hmm…', 'Look closer'][walker.index];
    }
  }
  walkers.forEach(walker => {
    let resumeTimer;
    walker.element.addEventListener('click', () => {
      clearTimeout(resumeTimer);
      walker.element.classList.add('is-paused');
      walker.element.setAttribute('aria-pressed', 'true');
      walker.element.setAttribute('aria-label', '小人停留中，5 秒后继续；再次点击重新计时 / Resting for 5 seconds; click to restart');
      walker.element.querySelector('.visitor-note').textContent = 'Hello!';
      resumeTimer = setTimeout(() => {
        // Resume gently with a walk, even if the visitor was running before.
        walker.age = 0;
        walker.speed = 0;
        walker.mode = '';
        walker.element.classList.remove('is-paused');
        walker.element.setAttribute('aria-pressed', 'false');
        mode(walker, 'walk');
      }, 5000);
    });
  });
  function tick(now) {
    const dt = previous ? Math.min((now - previous) / 1000, .05) : 0;
    previous = now;
    walkers.forEach(walker => {
      if (walker.element.classList.contains('is-paused') || !walker.element.offsetWidth) return;
      walker.age += dt;
      const phase = walker.age % 18;
      const gait = phase < 7 ? 'walk' : phase < 11 ? 'run' : phase < 13 ? 'idle' : 'walk';
      mode(walker, gait);
      const target = gait === 'run' ? 86 : gait === 'walk' ? 23 : 0;
      walker.speed += (target - walker.speed) * Math.min(1, dt * 5);
      walker.x += walker.direction * walker.speed * dt;
      if (walker.x > end || walker.x < 14) {
        walker.x = Math.max(14, Math.min(end, walker.x));
        walker.direction *= -1;
      }
      walker.element.style.setProperty('--visitor-x', `${walker.x.toFixed(2)}px`);
      walker.element.style.setProperty('--visitor-facing', walker.direction);
    });
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    const active = document.body.classList.contains('garden-open') && !document.hidden;
    document.body.classList.toggle('garden-motion-active', active && !reduced.matches);
    if (!active || reduced.matches) return;
    measure();
    frame = requestAnimationFrame(tick);
  }
  // Ignore other body class changes, including our own animation-state class.
  let wasOpen = document.body.classList.contains('garden-open');
  new MutationObserver(() => {
    const open = document.body.classList.contains('garden-open');
    if (open !== wasOpen) { wasOpen = open; sync(); }
  }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  window.addEventListener('resize', measure);
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  measure();
  sync();
}
