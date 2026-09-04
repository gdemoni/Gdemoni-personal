import test from 'node:test';
import assert from 'node:assert/strict';
import { animateVisitors } from '../garden-motion.js';

test('visitors walk, run, rest for five seconds, restart the timer, and respect reduced motion', t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const classes = () => {
    const values = new Set();
    return { contains: name => values.has(name), add: name => values.add(name), remove: name => values.delete(name), toggle: (name, on) => on ? values.add(name) : values.delete(name) };
  };
  const body = { classList: classes() };
  body.classList.add('garden-open');
  const docEvents = {}, winEvents = {}, mediaEvents = {};
  const media = { matches: false, addEventListener: (name, fn) => mediaEvents[name] = fn };
  const visitors = [0, 1, 2].map(() => {
    const props = new Map();
    const events = {}, attributes = new Map(), note = { textContent: '' };
    return { classList: classes(), dataset: {}, offsetWidth: 50,
      style: { setProperty: (name, value) => props.set(name, value), getPropertyValue: name => props.get(name) },
      addEventListener: (name, fn) => events[name] = fn, click: () => events.click(),
      setAttribute: (name, value) => attributes.set(name, value), getAttribute: name => attributes.get(name), querySelector: () => note };
  });
  globalThis.document = { body, hidden: false,
    querySelector: () => ({ getBoundingClientRect: () => ({ left: 1000 }) }),
    addEventListener: (name, fn) => docEvents[name] = fn };
  globalThis.window = { addEventListener: (name, fn) => winEvents[name] = fn };
  globalThis.matchMedia = () => media;
  globalThis.MutationObserver = class { observe() {} };
  let id = 0, time = 1000;
  const frames = new Map();
  globalThis.requestAnimationFrame = fn => { frames.set(++id, fn); return id; };
  globalThis.cancelAnimationFrame = key => frames.delete(key);
  const advance = seconds => {
    for (let n = 0; n < Math.ceil(seconds * 60); n++) {
      time += 1000 / 60;
      const callbacks = [...frames.values()]; frames.clear();
      callbacks.forEach(fn => fn(time));
      t.mock.timers.tick(1000 / 60);
    }
  };
  const position = () => parseFloat(visitors[0].style.getPropertyValue('--visitor-x'));
  animateVisitors({ getBoundingClientRect: () => ({ width: 1200, left: 0 }), querySelectorAll: () => visitors });
  advance(1);
  assert.equal(visitors[0].dataset.gait, 'walk');
  const walkStart = position(); advance(1); const walkDistance = position() - walkStart;
  advance(6);
  assert.equal(visitors[0].dataset.gait, 'run');
  const runStart = position(); advance(1);
  assert.ok(position() - runStart > walkDistance * 3);
  visitors[0].click();
  assert.equal(visitors[0].getAttribute('aria-pressed'), 'true');
  assert.equal(visitors[0].querySelector().textContent, 'Hello!');
  const paused = position(); advance(2); assert.equal(position(), paused);
  visitors[0].click(); advance(4.8); assert.equal(position(), paused);
  assert.equal(visitors[0].getAttribute('aria-pressed'), 'true');
  advance(.4);
  assert.equal(visitors[0].getAttribute('aria-pressed'), 'false');
  assert.equal(visitors[0].dataset.gait, 'walk');
  assert.notEqual(position(), paused);
  assert.notEqual(visitors[0].querySelector().textContent, 'Hello!');
  advance(40);
  assert.ok(position() >= 14 && position() <= 940);
  assert.ok(visitors.some(v => v.style.getPropertyValue('--visitor-facing') === -1));
  document.hidden = true; docEvents.visibilitychange();
  assert.equal(frames.size, 0);
  assert.equal(body.classList.contains('garden-motion-active'), false);
  document.hidden = false; docEvents.visibilitychange(); assert.equal(frames.size, 1);
  media.matches = true; mediaEvents.change(); assert.equal(frames.size, 0);
  assert.equal(body.classList.contains('garden-motion-active'), false);
});
