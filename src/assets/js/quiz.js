(function () {
  var form = document.getElementById("quizForm");
  if (!form) return;

  var questions = Array.from(form.querySelectorAll(".quiz-q"));
  var scoreEl = document.getElementById("quizScore");
  var resultEl = document.getElementById("quizResult");
  var resultTextEl = document.getElementById("quizResultText");
  var retryBtn = document.getElementById("quizRetry");
  var answered = {};
  var score = 0;

  function updateScore() {
    scoreEl.textContent = "Score: " + score + " / " + questions.length;
  }

  function maybeShowResult() {
    if (Object.keys(answered).length === questions.length) {
      var pct = Math.round((score / questions.length) * 100);
      var msg;
      if (pct === 100) msg = "Perfect score! You've got webpage anatomy down cold.";
      else if (pct >= 70) msg = "Solid. You clearly read the page.";
      else msg = "Worth a re-read. Scroll back up and try again.";
      resultTextEl.textContent = score + " / " + questions.length + ". " + msg;
      resultEl.hidden = false;
      resultEl.focus();
    }
  }

  questions.forEach(function (fieldset, qIndex) {
    var correctIndex = parseInt(fieldset.dataset.correct, 10);
    var inputs = Array.from(fieldset.querySelectorAll("input[type=radio]"));
    var feedback = fieldset.querySelector(".quiz-feedback");

    inputs.forEach(function (input, optIndex) {
      input.addEventListener("change", function () {
        if (answered[qIndex] !== undefined) return;

        var isCorrect = optIndex === correctIndex;
        answered[qIndex] = isCorrect;
        if (isCorrect) score += 1;

        fieldset.classList.add("answered");
        inputs.forEach(function (otherInput, otherIndex) {
          var wrapper = otherInput.closest(".quiz-option");
          otherInput.disabled = true;
          if (otherIndex === correctIndex) wrapper.classList.add("is-correct");
          else if (otherIndex === optIndex) wrapper.classList.add("is-incorrect");
        });

        feedback.textContent = isCorrect
          ? "Correct! " + fieldset.dataset.explanation
          : "Not quite. " + fieldset.dataset.explanation;

        updateScore();
        maybeShowResult();
      });
    });
  });

  retryBtn.addEventListener("click", function () {
    answered = {};
    score = 0;
    updateScore();
    resultEl.hidden = true;
    questions.forEach(function (fieldset) {
      fieldset.classList.remove("answered");
      fieldset.querySelectorAll(".quiz-option").forEach(function (opt) {
        opt.classList.remove("is-correct", "is-incorrect");
      });
      fieldset.querySelectorAll("input[type=radio]").forEach(function (input) {
        input.disabled = false;
        input.checked = false;
      });
      fieldset.querySelector(".quiz-feedback").textContent = "";
    });
    form.querySelector(".quiz-q").scrollIntoView({ behavior: "smooth", block: "center" });
  });

  updateScore();
})();
