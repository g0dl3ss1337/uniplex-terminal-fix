# Uniplex Panel Terminal Text Color Fix 🛠️

<p align="center">
  <a href="#installation"><img src="https://img.shields.io/badge/Tampermonkey-Supported-00485B?logo=tampermonkey&logoColor=white" alt="Tampermonkey"></a>
  <a href="https://panel.uniplex.xyz"><img src="https://img.shields.io/badge/Target-panel.uniplex.xyz-blue" alt="Target"></a>
  <a href="#"><img src="https://img.shields.io/badge/Status-Temporary%20Workaround%20%2F%20Bug%20Report-orange" alt="Status"></a>
</p>

A bug report and temporary Tampermonkey userscript to fix invisible terminal console text in the **Meridian dark theme** on [Uniplex Panel](https://panel.uniplex.xyz).

---

## 🐛 Bug Report

### Description
In the Uniplex server control panel (`panel.uniplex.xyz`), when running under the Meridian dark theme, the server console terminal (xterm.js canvas renderer) renders output text using a dark color that matches or is nearly identical to the dark background (`#070a11`, `#0a0e17`, `rgb(7, 10, 17)`, `#000000`).

As a result, all console logs, server output, and command outputs become completely invisible against the dark terminal background.

### Root Cause
The 2D canvas rendering context used by the terminal receives theme tokens intended for dark backgrounds or fallback black values for the text drawing routines (`ctx.fillText`), instead of the intended foreground color token (`--terminal-foreground` or a light hex like `#cbd5e1`).

---

## 🩹 Temporary Fix (Userscript)

The userscript [`uniplex-terminal-fix.user.js`](./uniplex-terminal-fix.user.js) hooks into `HTMLCanvasElement.prototype.getContext('2d')` and intercepts `ctx.fillText`. When a canvas text fill attempts to use black or dark background color values, it dynamically substitutes it with `#cbd5e1` (a readable light slate color).

### ⚠️ Known Limitations
- **Console text is visible and readable.**
- **Text Selection (Highlighting) is not visible**: While you can read and copy text normally, the visual selection highlight remains invisible when selecting text with the mouse in the console canvas.

---

## 📥 Installation

1. Install a userscript manager extension in your browser:
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Edge, Opera)
   - [Violentmonkey](https://violentmonkey.github.io/)
2. Open [`uniplex-terminal-fix.user.js`](./uniplex-terminal-fix.user.js) or install it directly into your userscript manager.
3. Confirm the script installation.
4. Refresh your [Uniplex Panel](https://panel.uniplex.xyz) page.

---

## 💡 Suggested Upstream Fix (for Uniplex Developers)

In the panel frontend theme / xterm configuration:
- Ensure the xterm theme config defines `theme.foreground` using the bright text token (e.g. `--terminal-foreground` / `#cbd5e1`) instead of inheriting dark background color variables.
- Verify that `theme.selectionBackground` or `theme.selection` has sufficient opacity and contrasting color so that text selection is clearly visible.

---

## 📄 License
MIT © g0dl3ss1337
