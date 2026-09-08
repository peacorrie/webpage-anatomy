(function () {
  function wireDialog(dialogId, openBtnIds, closeBtnIds) {
    var dialog = document.getElementById(dialogId);
    if (!dialog) return;
    var lastTrigger = null;

    openBtnIds.forEach(function (id) {
      var btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener("click", function () {
        lastTrigger = btn;
        dialog.showModal();
      });
    });

    closeBtnIds.forEach(function (id) {
      var btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener("click", function () {
        dialog.close();
      });
    });

    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });

    // Native <dialog> restores focus in most browsers, but we do it
    // explicitly so it's guaranteed regardless of browser behavior.
    dialog.addEventListener("close", function () {
      if (lastTrigger) lastTrigger.focus();
    });
  }

  wireDialog("glassModal", ["openGlassModal"], ["closeGlassModal", "dismissGlassModal"]);
  wireDialog("homepageModal", ["openHomepageModal", "openHomepageModalFromAnatomy"], ["closeHomepageModal"]);
  wireDialog("fPatternModal", ["openFPatternModal"], ["closeFPatternModal", "dismissFPatternModal"]);
  wireDialog("zPatternModal", ["openZPatternModal"], ["closeZPatternModal", "dismissZPatternModal"]);
  wireDialog("gridPatternModal", ["openGridPatternModal"], ["closeGridPatternModal", "dismissGridPatternModal"]);
  wireDialog("navTypesModal", ["openNavTypesModal"], ["closeNavTypesModal", "dismissNavTypesModal"]);
  wireDialog("heroTypesModal", ["openHeroTypesModal"], ["closeHeroTypesModal", "dismissHeroTypesModal"]);
  wireDialog("foldTypesModal", ["openFoldTypesModal"], ["closeFoldTypesModal", "dismissFoldTypesModal"]);
  wireDialog("contentTypesModal", ["openContentTypesModal"], ["closeContentTypesModal", "dismissContentTypesModal"]);
  wireDialog("footerTypesModal", ["openFooterTypesModal"], ["closeFooterTypesModal", "dismissFooterTypesModal"]);
  wireDialog("contrastCheckerModal", ["openContrastCheckerModal"], ["closeContrastCheckerModal", "dismissContrastCheckerModal"]);
  wireDialog("contrastGameModal", ["openContrastGameModal"], ["closeContrastGameModal", "dismissContrastGameModal"]);
  wireDialog("styleGuideModal", ["openStyleGuideModal"], ["closeStyleGuideModal"]);
  wireDialog("boxModelModal", ["openBoxModelModal"], ["closeBoxModelModal", "dismissBoxModelModal"]);
  wireDialog("breakpointModal", ["openBreakpointModal"], ["closeBreakpointModal", "dismissBreakpointModal"]);
  wireDialog("quizModal", ["openQuizModal"], ["closeQuizModal", "dismissQuizModal"]);

  var copyBtn = document.getElementById("copyGlassCode");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var code = ".glass {\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 12px;\n}";
      navigator.clipboard.writeText(code).then(function () {
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("copied");
        setTimeout(function () {
          copyBtn.textContent = "Copy";
          copyBtn.classList.remove("copied");
        }, 2000);
      }).catch(function () {
        copyBtn.textContent = "Copy failed";
        setTimeout(function () {
          copyBtn.textContent = "Copy";
        }, 2000);
      });
    });
  }
})();
