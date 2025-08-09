const STORAGE_KEY = 'force_gpt5_enabled';

function setIcon(enabled) {
  const suffix = enabled ? '' : '-dark';
  const path = {
    16: `icons/icon16${suffix}.png`,
    32: `icons/icon32${suffix}.png`,
    48: `icons/icon48${suffix}.png`,
    128: `icons/icon128${suffix}.png`,
  };
  chrome.action.setIcon({ path }, () => void chrome.runtime.lastError);
}

function ensureInitialState() {
  chrome.storage.sync.get([STORAGE_KEY], (res) => {
    const enabled = res[STORAGE_KEY] !== false;
    setIcon(enabled);
  });
}

chrome.runtime.onInstalled.addListener(() => {
  ensureInitialState();
});

chrome.runtime.onStartup.addListener(() => {
  ensureInitialState();
});

chrome.runtime.onMessage.addListener((msg, _sender, _sendResponse) => {
  if (msg && msg.type === 'updateIcon') {
    setIcon(Boolean(msg.enabled));
  }
});

