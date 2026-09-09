(function () {
  // The public subscription endpoint behind this Kit form, the same one
  // Kit's own embed script posts to. Posting to it directly, styled to
  // match this site instead of Kit's own widget, keeps every signup form
  // in the site's own design system with one shared submit function.
  var FORM_ACTION = "https://app.kit.com/forms/9897097/subscriptions";
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function isValidEmail(email) {
    return EMAIL_RE.test(email);
  }

  function submitEmail(email) {
    var body = new FormData();
    body.append("email_address", email);
    return fetch(FORM_ACTION, {
      method: "POST",
      body: body,
      headers: { Accept: "application/json" }
    }).then(function (res) {
      return res.json().then(function (data) {
        return { ok: res.ok, data: data };
      });
    });
  }

  function extractErrorMessage(data) {
    if (!data || !data.errors) return null;
    if (typeof data.errors === "string") return data.errors;
    if (Array.isArray(data.errors) && typeof data.errors[0] === "string") return data.errors[0];
    return null;
  }

  function isSuccessStatus(status) {
    return status === "success" || status === "quarantined";
  }

  window.WA = window.WA || {};
  window.WA.emailSignup = {
    submit: submitEmail,
    isValidEmail: isValidEmail,
    extractErrorMessage: extractErrorMessage,
    isSuccessStatus: isSuccessStatus
  };

  // ---- Homepage Blueprint download gate ----
  (function () {
    var gate = document.getElementById("blueprintEmailGate");
    var form = document.getElementById("blueprintEmailForm");
    if (!gate || !form) return;

    var input = document.getElementById("blueprintEmailInput");
    var submitBtn = document.getElementById("blueprintEmailSubmit");
    var feedback = document.getElementById("blueprintEmailFeedback");
    var closeBtn = document.getElementById("closeBlueprintEmailGate");

    function setFeedback(message, kind) {
      feedback.textContent = message || "";
      feedback.classList.remove("is-error", "is-success");
      if (kind) feedback.classList.add(kind);
    }

    function resetSubmitButton() {
      submitBtn.disabled = false;
      submitBtn.textContent = "Get My Blueprint";
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        gate.close();
      });
    }

    gate.addEventListener("click", function (e) {
      if (e.target === gate) gate.close();
    });

    gate.addEventListener("close", function () {
      setFeedback("");
      resetSubmitButton();
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = input.value.trim();
      if (!isValidEmail(email)) {
        setFeedback("Please enter a valid email address.", "is-error");
        input.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
      setFeedback("");

      submitEmail(email)
        .then(function (result) {
          var status = result.data && result.data.status;
          if (result.ok && isSuccessStatus(status)) {
            setFeedback("You're on the list. Your download is starting now.", "is-success");
            resetSubmitButton();
            form.reset();
            setTimeout(function () {
              gate.close();
              if (window.WA && window.WA.generateWireframePNG) {
                window.WA.generateWireframePNG();
              }
            }, 900);
          } else {
            setFeedback(extractErrorMessage(result.data) || "Something went wrong. Please try again in a moment.", "is-error");
            resetSubmitButton();
          }
        })
        .catch(function () {
          setFeedback("Something went wrong. Please try again in a moment.", "is-error");
          resetSubmitButton();
        });
    });
  })();

  // ---- Footer newsletter signup ----
  (function () {
    var form = document.getElementById("footerSignupForm");
    if (!form) return;

    var input = document.getElementById("footerSignupEmail");
    var feedback = document.getElementById("footerSignupFeedback");
    var submitBtn = form.querySelector("button[type=submit]");
    var originalLabel = submitBtn.textContent;

    function setFeedback(message, kind) {
      feedback.textContent = message || "";
      feedback.classList.remove("is-error", "is-success");
      if (kind) feedback.classList.add(kind);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = input.value.trim();
      if (!isValidEmail(email)) {
        setFeedback("Please enter a valid email address.", "is-error");
        input.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Signing up...";
      setFeedback("");

      submitEmail(email)
        .then(function (result) {
          var status = result.data && result.data.status;
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
          if (result.ok && isSuccessStatus(status)) {
            setFeedback("You're on the list. Thanks for signing up.", "is-success");
            form.reset();
          } else {
            setFeedback(extractErrorMessage(result.data) || "Something went wrong. Please try again in a moment.", "is-error");
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
          setFeedback("Something went wrong. Please try again in a moment.", "is-error");
        });
    });
  })();
})();
