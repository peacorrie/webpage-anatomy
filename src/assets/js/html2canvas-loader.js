// html2canvas is ~170KB and only needed by the two "Download as PNG"
// buttons (homepage blueprint, style guide). Loading it eagerly on every
// page cost real, measured performance in a Lighthouse audit, so it's
// fetched on demand instead, the first time either button is used.
window.WA = window.WA || {};
window.WA.loadHtml2Canvas = function () {
  if (typeof html2canvas !== "undefined") return Promise.resolve();
  if (window.WA._html2canvasPromise) return window.WA._html2canvasPromise;

  window.WA._html2canvasPromise = new Promise(function (resolve, reject) {
    var script = document.createElement("script");
    script.src = "/assets/js/vendor/html2canvas.min.js";
    script.onload = function () { resolve(); };
    script.onerror = function () { reject(new Error("Failed to load html2canvas")); };
    document.head.appendChild(script);
  });

  return window.WA._html2canvasPromise;
};
