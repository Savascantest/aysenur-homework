const emptyProgress = () => ({ completed: {}, answers: {}, mistakes: {}, drafts: {}, speaking: {} });
export const browserProgressKey = (packageId) => `aysenur-homework:${packageId}:browser-progress`;
export function loadBrowserProgress(storage, packageId) {
  try { return { ...emptyProgress(), ...JSON.parse(storage.getItem(browserProgressKey(packageId)) || '{}') }; }
  catch { return emptyProgress(); }
}
export function saveBrowserProgress(storage, packageId, progress) { storage.setItem(browserProgressKey(packageId), JSON.stringify(progress)); }
export function resetBrowserProgress(storage, packageId) { storage.removeItem(browserProgressKey(packageId)); return emptyProgress(); }
