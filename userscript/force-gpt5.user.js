// ==UserScript==
// @name         Force GPT-5 to think
// @namespace    https://github.com/JimmiAsk/force-gpt5-to-think
// @version      1.0.0
// @description  Appends a thinking reminder to your ChatGPT prompt only when the selected model is exactly GPT-5.
// @author       You
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @downloadURL  https://raw.githubusercontent.com/JimmiAsk/force-gpt5-to-think/main/userscript/force-gpt5.user.js
// @updateURL    https://raw.githubusercontent.com/JimmiAsk/force-gpt5-to-think/main/userscript/force-gpt5.user.js
// ==/UserScript==

(function () {
  const PROMPT_SUFFIX = `\n---\n\nIMPORTANT: You **MUST** think carefully before you give your answer, the result depends on it!`;

  function findModelSwitcherButton() {
    return document.querySelector('button[data-testid="model-switcher-dropdown-button"]');
  }

  function isModelExactlyGPT5() {
    const button = findModelSwitcherButton();
    if (!button) return false;
    const text = (button.textContent || "").replace(/\s+/g, " ").trim();
    if (text === "GPT-5") return true;
    if (text === "ChatGPT 5") return true;
    return /(^|\b)GPT-5(\b|$)/.test(text);
  }

  function getPromptEditor() {
    const prosemirror = document.querySelector('#prompt-textarea[contenteditable="true"]');
    if (prosemirror) return prosemirror;
    const fallback = document.querySelector('textarea[name="prompt-textarea"]');
    return fallback || null;
  }

  function getCurrentPromptText(editor) {
    if (!editor) return "";
    if (editor instanceof HTMLTextAreaElement) return editor.value;
    return editor.innerText || "";
  }

  function appendSuffixIfNeeded() {
    const editor = getPromptEditor();
    if (!editor) return;
    const currentText = getCurrentPromptText(editor);
    const currentWithoutTrailingWS = currentText.replace(/\s+$/, "");
    if (currentWithoutTrailingWS.endsWith(PROMPT_SUFFIX)) return;
    const insertionText = (currentWithoutTrailingWS.length === 0 ? "" : "\n") + PROMPT_SUFFIX;
    if (editor instanceof HTMLTextAreaElement) {
      const end = editor.value.length;
      editor.setSelectionRange(end, end);
      document.execCommand('insertText', false, insertionText);
      return;
    }
    editor.focus();
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(editor);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('insertText', false, insertionText);
  }

  function isEnterToSend(event) {
    if (event.isComposing) return false;
    if (event.key !== 'Enter') return false;
    if (event.shiftKey) return false;
    return true;
  }

  const STORAGE_KEY = 'force_gpt5_enabled';
  let enabledCache = GM_getValue(STORAGE_KEY, true);

  function handlePotentialSend() {
    if (!enabledCache) return;
    if (!isModelExactlyGPT5()) return;
    appendSuffixIfNeeded();
  }

  function isCurrentlyStreaming() {
    const stopBtn = document.querySelector('button[data-testid="stop-button"], button#composer-submit-button[aria-label*="Stop"]');
    return !!stopBtn;
  }

  // Event hooks
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const sendBtn = target.closest('button[data-testid="send-button"], #composer-submit-button');
    if (!sendBtn) return;
    const isStop = sendBtn.getAttribute('data-testid') === 'stop-button' ||
      ((sendBtn.getAttribute('aria-label') || '').toLowerCase().includes('stop'));
    if (isStop || isCurrentlyStreaming()) return;
    handlePotentialSend();
  }, true);

  document.addEventListener('keydown', (event) => {
    if (!isEnterToSend(event)) return;
    if (isCurrentlyStreaming()) return;
    const editor = getPromptEditor();
    if (!editor) return;
    const active = document.activeElement;
    if (active === editor || (active && editor.contains(active))) {
      handlePotentialSend();
    }
  }, true);

  // Menu toggle for quick enable/disable
  function refreshMenu() {
    if (typeof GM_registerMenuCommand !== 'function') return;
    GM_registerMenuCommand(`Enabled: ${enabledCache ? 'ON' : 'OFF'} (click to toggle)`, () => {
      enabledCache = !enabledCache;
      GM_setValue(STORAGE_KEY, enabledCache);
      // Rebuild menu to reflect new state on next open
    });
  }

  refreshMenu();
})();


