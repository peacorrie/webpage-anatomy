(function () {
  var downloadBtn = document.getElementById("downloadStyleGuide");
  if (!downloadBtn) return;

  downloadBtn.addEventListener("click", function () {
    var sheet = document.getElementById("styleGuideSheet");
    if (!sheet || typeof html2canvas === "undefined") {
      alert("Could not generate the image. Please try again.");
      return;
    }

    downloadBtn.textContent = "Generating PNG...";
    downloadBtn.disabled = true;

    var clone = sheet.cloneNode(true);
    clone.id = "style-guide-clone";
    clone.style.cssText = "position: fixed; left: -9999px; top: 0; width: 640px; z-index: -1;";
    document.body.appendChild(clone);

    setTimeout(function () {
      html2canvas(clone, {
        scale: 2,
        backgroundColor: "#FFF9F2",
        logging: false,
        useCORS: true,
        width: 640,
        height: clone.scrollHeight
      }).then(function (canvas) {
        document.body.removeChild(clone);
        var link = document.createElement("a");
        link.download = "webpage-anatomy-style-guide.png";
        link.href = canvas.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        downloadBtn.textContent = "Download as PNG";
        downloadBtn.disabled = false;
      }).catch(function (error) {
        if (document.getElementById("style-guide-clone")) {
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
