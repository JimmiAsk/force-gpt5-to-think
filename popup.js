const STORAGE_KEY = 'force_gpt5_enabled';

async function getEnabled() {
  return new Promise((resolve) => {
    chrome.storage.sync.get([STORAGE_KEY], (res) => {
      resolve(res[STORAGE_KEY] !== false);
    });
  });
}

async function setEnabled(enabled) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [STORAGE_KEY]: enabled }, () => resolve());
  });
}

async function init() {
  const toggle = document.getElementById('enabledToggle');
  const enabled = await getEnabled();
  toggle.checked = enabled;
  toggle.addEventListener('change', async () => {
    await setEnabled(toggle.checked);
    chrome.runtime.sendMessage({ type: 'updateIcon', enabled: toggle.checked });
  });
}

init();

