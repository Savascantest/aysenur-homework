import assert from 'node:assert/strict';
import test from 'node:test';
import { browserProgressKey, loadBrowserProgress, resetBrowserProgress, saveBrowserProgress } from '../src/lib/browser-progress.js';
const memory=()=>{const values=new Map();return{getItem:(key)=>values.get(key)||null,setItem:(key,value)=>values.set(key,value),removeItem:(key)=>values.delete(key)}};
test('BrowserProgress is package-namespaced and resettable',()=>{const storage=memory();saveBrowserProgress(storage,'2026-09-14-a1b2c3d4e5',{completed:{a:true}});assert.match(browserProgressKey('2026-09-14-a1b2c3d4e5'),/a1b2c3d4e5/);assert.equal(loadBrowserProgress(storage,'other').completed.a,undefined);assert.equal(loadBrowserProgress(storage,'2026-09-14-a1b2c3d4e5').completed.a,true);assert.deepEqual(resetBrowserProgress(storage,'2026-09-14-a1b2c3d4e5').drafts,{});});
test('BrowserProgress is local data, not LearnerState',()=>{const storage=memory();saveBrowserProgress(storage,'package',{drafts:{writing:'draft'},speaking:{task:true}});const loaded=loadBrowserProgress(storage,'package');assert.equal(loaded.drafts.writing,'draft');assert.equal(Object.hasOwn(loaded,'observations'),false);});
