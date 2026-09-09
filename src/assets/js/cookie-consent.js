(function () {
  var STORAGE_KEY = "wa-cookie-consent";
  var banner = document.getElementById("cookieBanner");
  var acceptBtn = document.getElementById("cookieAccept");
  var declineBtn = document.getElementById("cookieDecline");
  var prefsLink = document.getElementById("cookiePreferencesLink");

  function loadGoogleAnalytics() {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-7ZSNQFEW7Q";
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", "G-7ZSNQFEW7Q");
  }

  function loadClarity() {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "yfeb0ps9ka");
  }

  var analyticsLoaded = false;
  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    loadGoogleAnalytics();
    loadClarity();
  }

  function getStoredConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* localStorage unavailable — the banner will just show again next visit */
    }
  }

  function hideBanner() {
    if (banner) banner.hidden = true;
  }

  function showBanner() {
    if (banner) banner.hidden = false;
  }

  // The Ko-fi floating widget is also fixed to the bottom of the screen
  // and would otherwise render right on top of this banner's buttons
  // while it's showing. Anything that wants to draw a floating UI element
  // there (see the Ko-fi block in base.njk) waits for this event instead
  // of drawing immediately, so the two never fight for the same pixels.
  // window.WA.cookieConsentResolved is a synchronous flag alongside the
  // event, since a later script (loaded after this one, so it can't add
  // its listener in time) still needs to tell "already resolved" apart
  // from "never happened yet" the moment it runs.
  window.WA = window.WA || {};
  function resolveConsent() {
    window.WA.cookieConsentResolved = true;
    document.dispatchEvent(new CustomEvent("wa:cookie-consent-resolved"));
  }

  var consent = getStoredConsent();
  if (consent === "accepted") {
    loadAnalytics();
    resolveConsent();
  } else if (consent === "declined") {
    resolveConsent();
  } else {
    // No stored choice yet — ask first, load nothing until they answer.
    showBanner();
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      setStoredConsent("accepted");
      loadAnalytics();
      hideBanner();
      resolveConsent();
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener("click", function () {
      setStoredConsent("declined");
      hideBanner();
      resolveConsent();
    });
  }

  // Lets someone change their mind later without clearing browser data.
  if (prefsLink) {
    prefsLink.addEventListener("click", function (e) {
      e.preventDefault();
      showBanner();
      banner.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
})();
