const STORAGE_KEY = 'force_gpt5_enabled';

function setIcon(_enabled) {
  const path = {
    16: 'image copy.png',
    32: 'image copy.png',
    48: 'image copy.png',
    128: 'image copy.png',
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

