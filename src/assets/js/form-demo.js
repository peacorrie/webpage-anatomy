(function () {
  var input = document.getElementById("formDemoValidate");
  if (!input) return;

  var msg = document.getElementById("formDemoValidateMsg");
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function clearState() {
    input.classList.remove("is-valid", "is-invalid");
    msg.classList.remove("is-error", "is-success");
    msg.textContent = "";
  }

  // showRequired is true only on blur, so an empty field doesn't get
  // scolded for being empty while someone is still in the middle of
  // typing their first character.
  function validate(showRequired) {
    var value = input.value.trim();
    clearState();

    if (value === "") {
      if (showRequired) {
        input.classList.add("is-invalid");
        msg.classList.add("is-error");
        msg.textContent = "Email is required.";
      }
      return;
    }

    if (EMAIL_RE.test(value)) {
      input.classList.add("is-valid");
      msg.classList.add("is-success");
      msg.textContent = "Looks good.";
    } else {
      input.classList.add("is-invalid");
      msg.classList.add("is-error");
      msg.textContent = "That doesn't look like a valid email.";
    }
  }

  input.addEventListener("input", function () {
    validate(false);
  });
  input.addEventListener("blur", function () {
    validate(true);
  });
})();
