import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const source = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const transitionCode = source.slice(source.indexOf('const storyboard ='), source.indexOf('function commitGardenPanel'));

function setup(reduced = false) {
  const animations = [];
  const commits = [];
  const sheet = {
    inert: false, contains: () => false,
    setAttribute() {}, removeAttribute() {},
    animate(frames) {
      let finish, reject;
      const finished = new Promise((resolve, fail) => { finish = resolve; reject = fail; });
      const animation = { frames, finished, finish, cancel: () => reject(Object.assign(new Error('cancelled'), { name: 'AbortError' })) };
      animations.push(animation);
      return animation;
    }
  };
  const context = vm.createContext({
    document: { querySelector: () => sheet, body: { classList: { contains: name => name === 'garden-open' } } },
    window: { matchMedia: () => ({ matches: reduced }) },
    commits
  });
  vm.runInContext('const panelIds = ["about", "projects", "skills", "contact"]; let activeGardenPanel = "about"; function commitGardenPanel(id) { activeGardenPanel = id; commits.push(id); }', context);
  vm.runInContext(transitionCode, context);
  return { context, animations, commits, sheet };
}

test('old sheet exits before the latest requested content is revealed', async () => {
  const { context, animations, commits, sheet } = setup();
  const done = context.activateGardenPanel('projects');
  assert.equal(animations[0].frames[1].transform, 'translateY(64px)');
  assert.deepEqual(commits, []);
  assert.equal(sheet.inert, true);
  context.activateGardenPanel('contact');
  animations[0].finish();
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(commits, ['contact']);
  animations[1].finish();
  await done;
  assert.equal(sheet.inert, false);
});

test('reduced motion switches immediately; closing cancels pending navigation', async () => {
  const reduced = setup(true);
  await reduced.context.activateGardenPanel('projects');
  assert.deepEqual(reduced.commits, ['projects']);
  assert.equal(reduced.animations.length, 0);
  const normal = setup();
  const done = normal.context.activateGardenPanel('projects');
  normal.context.resetPanelTransition();
  await done;
  assert.deepEqual(normal.commits, []);
  assert.equal(normal.sheet.inert, false);
});
