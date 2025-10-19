// screenshot.js
// Adds a subtle screenshot button to the page (bottom-right) and captures the visible viewport as a JPEG.
// Usage: include html2canvas (CDN) and this script in index.html (both with defer).

(function () {
  // create and inject button
  const btn = document.createElement('button');
  btn.id = 'screenshotBtn';
  btn.className = 'screenshot';
  btn.type = 'button';
  btn.title = 'Save screenshot (JPEG)';
  btn.setAttribute('aria-label', 'Save screenshot as JPEG');
  btn.innerHTML = '📸';

  // Button visual + transient 'saving' state handled via class
  btn.addEventListener('click', async () => {
    if (!window.html2canvas) {
      // html2canvas not loaded yet (should be loaded via CDN), give graceful error
      alert('Screenshot library not loaded yet. Try again in a moment.');
      return;
    }

    btn.disabled = true;
    btn.classList.add('saving');

    try {
      // Prefer devicePixelRatio for good resolution but cap to avoid huge images
      const scale = Math.min(2, window.devicePixelRatio || 1);
      // Capture visible viewport
      const canvas = await window.html2canvas(document.documentElement, {
        backgroundColor: null, // preserve transparent backgrounds (page has dark bg anyway)
        scale,
        useCORS: true,
        // Ensure we capture viewport area and current scroll position
        windowWidth: document.documentElement.clientWidth,
        windowHeight: document.documentElement.clientHeight,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      });

      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
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
      btn.disabled = false;
      btn.classList.remove('saving');
      // small visual feedback: briefly pulse
      btn.classList.add('pulsed');
      setTimeout(()=> btn.classList.remove('pulsed'), 800);
    }
  });

  // inject on DOM ready
  function inject() {
    // Append to body so it's above other layout but doesn't interfere with focus order
    document.body.appendChild(btn);

    // Make button reachable by keyboard (tab) and ensure minimal disruption
    btn.tabIndex = 0;
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    inject();
  } else {
    window.addEventListener('DOMContentLoaded', inject, { once: true });
  }
})();