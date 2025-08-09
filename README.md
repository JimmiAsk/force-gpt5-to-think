# Force GPT-5 to think

Appends a thinking reminder to your ChatGPT prompt only when the selected model is exactly GPT-5.

Links:
- Install page: https://jimmiask.github.io/force-gpt5-to-think/
- Repository: https://github.com/JimmiAsk/force-gpt5-to-think

## What it does
- Detects when the model selector indicates GPT-5 (exact match)
- On send (click or Enter), appends:

```
---

IMPORTANT: You **MUST** think carefully before you give your answer, the result depends on it!
```

- Skips when ChatGPT is currently streaming a response (Stop button showing)
- Works on `chatgpt.com` and `chat.openai.com`

## Install (easiest): One‑click userscript
This is the simplest path for most users. It also auto‑updates.

1. Install [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo):
   - Chrome Web Store: link above
2. Click this link to install the userscript (it will open a Tampermonkey prompt):
   - [Install Userscript](https://raw.githubusercontent.com/JimmiAsk/force-gpt5-to-think/main/userscript/force-gpt5.user.js)
   - Or visit the [Install page](https://jimmiask.github.io/force-gpt5-to-think/)
3. After install, it just works on `chatgpt.com` and `chat.openai.com` when the model is exactly GPT‑5.
4. To temporarily disable/enable, use Tampermonkey's menu command named "Enabled: ON/OFF (click to toggle)".

## Install (Chrome extension without store)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable Developer mode
4. Click "Load unpacked" and select the folder containing `manifest.json`
5. Optional: use the toggle in the extension popup to enable/disable

## Permissions
- **Storage**: to persist the on/off toggle in Chrome Sync storage
- **Host permissions**: `https://chatgpt.com/*`, `https://chat.openai.com/*`

## Support
Open an issue: https://github.com/JimmiAsk/force-gpt5-to-think/issues

