const STORAGE_KEY = 'force_gpt5_enabled';

function setIcon(_enabled) {
  const path = {
    16: 'icon.png',
    32: 'icon.png',
    48: 'icon.png',
    128: 'icon.png',
  };
  chrome.action.setIcon({ path }, () => void chrome.runtime.lastError);
}

function ensureInitialState() {
  chrome.storage.sync.get([STORAGE_KEY], (_res) => {
    setIcon(true);
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
    setIcon(true);
  }
});

