(function () {
  var downloadBtn = document.getElementById("downloadWireframe");
  if (!downloadBtn) return;

  function generateWireframePNG() {
    var wireframe = document.getElementById("homepageWireframe");
    if (!wireframe) {
      alert("Could not generate the image. Please try again.");
      return;
    }

    downloadBtn.textContent = "Generating PNG...";
    downloadBtn.disabled = true;

    window.WA.loadHtml2Canvas().then(renderWireframe).catch(function () {
      alert("Could not generate the image. Please try again.");
      downloadBtn.textContent = "Download as PNG";
      downloadBtn.disabled = false;
    });
  }

  function renderWireframe() {
    var wireframe = document.getElementById("homepageWireframe");
    var clone = wireframe.cloneNode(true);
    clone.id = "wireframe-clone";
    clone.style.cssText = "position: fixed; left: -9999px; top: 0; width: 800px; background: #FAF7F2; padding: 48px; z-index: -1;";
    document.body.appendChild(clone);

    setTimeout(function () {
      html2canvas(clone, {
        scale: 2,
        backgroundColor: "#FAF7F2",
        logging: false,
        useCORS: true,
        width: 800,
        height: clone.scrollHeight
      }).then(function (canvas) {
        document.body.removeChild(clone);
        var link = document.createElement("a");
        link.download = "homepage-anatomy-by-creativepea.png";
        link.href = canvas.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        downloadBtn.textContent = "Download as PNG";
        downloadBtn.disabled = false;
      }).catch(function (error) {
        if (document.getElementById("wireframe-clone")) {
          document.body.removeChild(clone);
        }
        console.error("Download failed:", error);
        alert("Download failed: " + error.message);
        downloadBtn.textContent = "Download as PNG";
        downloadBtn.disabled = false;
      });
    }, 200);
  }

  // Exposed so the email capture gate (email-capture.js) can trigger the
  // real download after a successful signup, without the two files needing
  // to know about each other's internals beyond this one function.
  window.WA = window.WA || {};
  window.WA.generateWireframePNG = generateWireframePNG;

  var gate = document.getElementById("blueprintEmailGate");

  downloadBtn.addEventListener("click", function () {
    if (gate && typeof gate.showModal === "function") {
      gate.showModal();
    } else {
      generateWireframePNG();
    }
  });
})();
