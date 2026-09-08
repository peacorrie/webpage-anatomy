(function () {
  var downloadBtn = document.getElementById("downloadWireframe");
  if (!downloadBtn) return;

  downloadBtn.addEventListener("click", function () {
    var wireframe = document.getElementById("homepageWireframe");
    if (!wireframe || typeof html2canvas === "undefined") {
      alert("Could not generate the image. Please try again.");
      return;
    }

    downloadBtn.textContent = "Generating PNG...";
    downloadBtn.disabled = true;

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
  });
})();
