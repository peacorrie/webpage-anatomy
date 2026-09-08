// Shared WCAG contrast math, used by the contrast checker and the guessing game.
window.WA = window.WA || {};
window.WA.contrast = (function () {
  function hexToRgb(hex) {
    var h = hex.replace("#", "").trim();
    if (h.length === 3) {
      h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    }
    var num = parseInt(h, 16);
    if (h.length !== 6 || isNaN(num)) return null;
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  }

  function channelToLinear(c) {
    var s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }

  function relativeLuminance(rgb) {
    var r = channelToLinear(rgb.r);
    var g = channelToLinear(rgb.g);
    var b = channelToLinear(rgb.b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function ratio(hexA, hexB) {
    var a = hexToRgb(hexA);
    var b = hexToRgb(hexB);
    if (!a || !b) return null;
    var la = relativeLuminance(a);
    var lb = relativeLuminance(b);
    var lighter = Math.max(la, lb);
    var darker = Math.min(la, lb);
    return (lighter + 0.05) / (darker + 0.05);
  }

  function grade(r) {
    return {
      aaNormal: r >= 4.5,
      aaLarge: r >= 3,
      aaaNormal: r >= 7,
      aaaLarge: r >= 4.5,
    };
  }

  return { hexToRgb: hexToRgb, relativeLuminance: relativeLuminance, ratio: ratio, grade: grade };
})();
