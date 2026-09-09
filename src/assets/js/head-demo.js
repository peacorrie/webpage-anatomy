(function () {
  var titleInput = document.getElementById("headDemoTitle");
  var descInput = document.getElementById("headDemoDescription");
  if (!titleInput || !descInput) return;

  var previewTitle = document.getElementById("sharePreviewTitle");
  var previewDesc = document.getElementById("sharePreviewDesc");

  function update() {
    previewTitle.textContent = titleInput.value.trim() || "Untitled page";
    previewDesc.textContent = descInput.value.trim() || "No description provided.";
  }

  titleInput.addEventListener("input", update);
  descInput.addEventListener("input", update);
})();
