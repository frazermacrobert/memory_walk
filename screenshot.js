// screenshot.js
// Capture p5 canvas + rest of page and composite into one JPEG download.
// Usage: include html2canvas (CDN) and this script in index.html (both with defer).

(function () {
  const BUTTON_ID = 'screenshotBtn';

  function createButton() {
    const existing = document.getElementById(BUTTON_ID);
    if (existing) return existing;

    const btn = document.createElement('button');
    btn.id = BUTTON_ID;
    btn.className = 'screenshot';
    btn.type = 'button';
    btn.title = 'Save screenshot (JPEG)';
    btn.setAttribute('aria-label', 'Save screenshot as JPEG');
    btn.innerHTML = '📸';
    btn.tabIndex = 0;
    return btn;
  }

  async function captureAndDownloadJPEG() {
    if (!window.html2canvas) {
      alert('Screenshot library not loaded yet. Try again in a moment.');
      return;
    }

    const btn = document.getElementById(BUTTON_ID);
    btn.disabled = true;
    btn.classList.add('saving');

    try {
      // Find the p5 canvas placed inside #canvas-holder (fallback to first canvas)
      const canvasHolder = document.getElementById('canvas-holder');
      const canvasEl = (canvasHolder && canvasHolder.querySelector('canvas')) || document.querySelector('canvas');

      // Capture p5 canvas (if present) as an image first
      let p5Image = null;
      let canvasRect = { left: 0, top: 0, width: 0, height: 0 };
      if (canvasEl && canvasEl instanceof HTMLCanvasElement) {
        // Ensure up-to-date rendering
        // toDataURL will fail if canvas is tainted by cross-origin images; those should be avoided or served with CORS.
        try {
          const png = canvasEl.toDataURL('image/png');
          p5Image = new Image();
          p5Image.src = png;
          await new Promise((res, rej) => {
            p5Image.onload = res;
            p5Image.onerror = rej;
          });
          canvasRect = canvasEl.getBoundingClientRect();
        } catch (err) {
          console.warn('Could not export p5 canvas directly:', err);
          p5Image = null;
        }
      }

      // Determine scale (cap to avoid huge images)
      const scale = Math.min(2, window.devicePixelRatio || 1);

      // Use html2canvas to rasterize the page WITHOUT the canvas element(s)
      const htmlCanvas = await window.html2canvas(document.documentElement, {
        backgroundColor: null,
        scale,
        useCORS: true,
        ignoreElements: (el) => {
          // ignore the element we captured directly (if any)
          if (canvasEl && el === canvasEl) return true;
          // also ignore any other canvas elements to avoid duplication
          if (el.tagName === 'CANVAS') return true;
          return false;
        },
        // keep viewport consistent and capture the visible viewport
        windowWidth: document.documentElement.clientWidth,
        windowHeight: document.documentElement.clientHeight,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      });

      // If we didn't get p5Image for some reason, html2canvas already captured everything (best-effort)
      // In that case just download htmlCanvas as JPEG.
      let outCanvas;
      if (!p5Image) {
        outCanvas = document.createElement('canvas');
        outCanvas.width = htmlCanvas.width;
        outCanvas.height = htmlCanvas.height;
        const ctx = outCanvas.getContext('2d');
        // If htmlCanvas has transparency, fill background with page background color (optional)
        ctx.fillStyle = '#0a0b10';
        ctx.fillRect(0, 0, outCanvas.width, outCanvas.height);
        ctx.drawImage(htmlCanvas, 0, 0);
      } else {
        // Create an output canvas the same size as the html2canvas result (which represents the viewport)
        outCanvas = document.createElement('canvas');
        outCanvas.width = htmlCanvas.width;
        outCanvas.height = htmlCanvas.height;
        const ctx = outCanvas.getContext('2d');

        // Optionally fill with same background as page so JPEG isn't black/transparent
        ctx.fillStyle = '#0a0b10';
        ctx.fillRect(0, 0, outCanvas.width, outCanvas.height);

        // Draw the html capture first
        ctx.drawImage(htmlCanvas, 0, 0);

        // Compute where to place the p5 canvas image on the output canvas.
        // htmlCanvas corresponds to the viewport; canvasRect is relative to viewport.
        // Need to account for scale used by html2canvas.
        const offsetX = Math.round((canvasRect.left + window.scrollX) * scale);
        const offsetY = Math.round((canvasRect.top + window.scrollY) * scale);
        // p5Image natural size might differ from canvasEl.width/height depending on devicePixelRatio.
        // Use canvasEl.width/height (actual pixel buffer size) to place and size correctly.
        const srcW = canvasEl.width;
        const srcH = canvasEl.height;
        // Destination size is scaled by html2canvas scale
        const destW = Math.round(srcW * (outCanvas.width / (document.documentElement.clientWidth * scale)));
        const destH = Math.round(srcH * (outCanvas.height / (document.documentElement.clientHeight * scale)));
        // Simpler: draw p5Image at offset and scale by scale factor between canvas pixel size and CSS size:
        // compute CSS size of canvas and relation to pixel buffer
        const cssW = canvasRect.width;
        const cssH = canvasRect.height;
        const pixelRatio = (srcW / cssW) || 1;
        const drawW = Math.round(cssW * pixelRatio * scale / pixelRatio); // effectively srcW * scale
        const drawH = Math.round(cssH * pixelRatio * scale / pixelRatio);
        // We'll draw using the p5Image natural size scaled by html2canvas scale:
        ctx.drawImage(p5Image, offsetX, offsetY, Math.round(srcW * scale), Math.round(srcH * scale));
      }

      // Export JPEG at high quality
      const dataUrl = outCanvas.toDataURL('image/jpeg', 0.92);
      const a = document.createElement('a');
      a.href = dataUrl;
      const timestamp = new Date().toISOString().slice(0,19).replace(/[:T]/g,'-');
      a.download = `memory-walk-${timestamp}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Screenshot failed', err);
      alert('Failed to capture screenshot. See console for details.');
    } finally {
      const btn = document.getElementById(BUTTON_ID);
      if (btn) {
        btn.disabled = false;
        btn.classList.remove('saving');
        btn.classList.add('pulsed');
        setTimeout(()=> btn.classList.remove('pulsed'), 800);
      }
    }
  }

  function inject() {
    const btn = createButton();
    btn.addEventListener('click', captureAndDownloadJPEG);
    // Place in DOM
    document.body.appendChild(btn);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    inject();
  } else {
    window.addEventListener('DOMContentLoaded', inject, { once: true });
  }
})();
