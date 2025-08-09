# Force GPT-5 to think

Appends a thinking reminder to your ChatGPT prompt only when the selected model is exactly GPT-5.

Created by [@AGJimmi](https://x.com/AGJimmi) · [Star on GitHub](https://github.com/JimmiAsk/force-gpt5-to-think)

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

## Why
- Make GPT‑5 think without burning your limited “thinking” quota
- Forces the router to pick thinking mode by appending a smart suffix
- Simple AF and super effective

Want to share? Use this prefilled tweet:
- [Share on X](https://twitter.com/intent/tweet?text=why%20pay%20%24200%20for%20unlimited%20GPT-5%20thinking%0A%0Awhen%20there%20is%20an%20extension%20that%20will%20do%20it%20for%20free%0A%0Ait%20makes%20GPT-5%20think%20by%20adding%20to%20the%20prompt%0A%0Ait%27s%20simple%20af%20but%20super%20effective%0A%0Aif%20you%20don%27t%20use%20this%20you%27re%20ngmi%0A%0Ahttps%3A%2F%2Fgithub.com%2FJimmiAsk%2Fforce-gpt5-to-think)

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

