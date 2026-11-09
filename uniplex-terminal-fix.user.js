// ==UserScript==
// @name         Uniplex Terminal Text Color Fix
// @namespace    https://github.com/g0dl3ss1337
// @version      1.0
// @description  Fixes invisible terminal text in Meridian dark theme by replacing dark background fillStyle with readable foreground color
// @author       g0dl3ss1337
// @match        https://panel.uniplex.xyz/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const origGetContext = HTMLCanvasElement.prototype.getContext;

    HTMLCanvasElement.prototype.getContext = function(type, attributes) {
        const ctx = origGetContext.apply(this, arguments);

        if (ctx && type === '2d' && !ctx.__meridianColorPatched) {
            ctx.__meridianColorPatched = true;

            const origFillText = ctx.fillText;
            ctx.fillText = function(text, x, y, maxWidth) {
                // If text color matches the dark background theme tokens (#070a11 / #0a0e17)
                const current = (this.fillStyle || '').toString().toLowerCase();
                if (
                    current === '#070a11' ||
                    current === '#0a0e17' ||
                    current === 'rgb(7, 10, 17)' ||
                    current === '#000000' ||
                    current === 'black'
                ) {
                    this.fillStyle = '#cbd5e1'; // Fallback to theme --terminal-foreground token
                }

                return origFillText.apply(this, arguments);
            };
        }

        return ctx;
    };
})();