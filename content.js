(() => {
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

    // Only match the exact token GPT-5 (avoid GPT-5.x, GPT-5 Mini, etc.)
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
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      const atEnd = end === editor.value.length;
      if (!atEnd) {
        editor.selectionStart = editor.selectionEnd = editor.value.length;
      }
      document.execCommand('insertText', false, insertionText);
      return;
    }

    // ContentEditable (ProseMirror)
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
  let enabledCache = true; // default on

  // Initialize cache and watch for changes
  try {
    chrome.storage?.sync?.get?.([STORAGE_KEY], (res) => {
      if (res && Object.prototype.hasOwnProperty.call(res, STORAGE_KEY)) {
        enabledCache = res[STORAGE_KEY] !== false;
      }
    });
    chrome.storage?.onChanged?.addListener?.((changes, area) => {
      if (area === 'sync' && changes && changes[STORAGE_KEY]) {
        enabledCache = changes[STORAGE_KEY].newValue !== false;
      }
    });
  } catch (_) {}

  function handlePotentialSend() {
    if (!enabledCache) return;
    if (!isModelExactlyGPT5()) return;
    appendSuffixIfNeeded();
  }

  function isCurrentlyStreaming() {
    const stopBtn = document.querySelector('button[data-testid="stop-button"], button#composer-submit-button[aria-label*="Stop"]');
    return !!stopBtn;
  }

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const sendBtn = target.closest('button[data-testid="send-button"], #composer-submit-button');
    if (!sendBtn) return;
    const isStop = sendBtn.getAttribute('data-testid') === 'stop-button' ||
      (sendBtn.getAttribute('aria-label') || '').toLowerCase().includes('stop');
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
})();


