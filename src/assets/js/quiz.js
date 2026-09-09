(function () {
  var dataEl = document.getElementById("quizData");
  var intro = document.getElementById("quizIntro");
  if (!dataEl || !intro) return;

  var allQuestions = JSON.parse(dataEl.textContent);
  var playArea = document.getElementById("quizPlayArea");
  var scoreEl = document.getElementById("quizScore");
  var form = document.getElementById("quizForm");
  var list = document.getElementById("quizList");
  var resultEl = document.getElementById("quizResult");
  var resultTextEl = document.getElementById("quizResultText");
  var retryBtn = document.getElementById("quizRetry");
  var shareArea = document.getElementById("quizShareArea");
  var shareNote = document.getElementById("quizShareNote");

  var PASS_THRESHOLD = 75;
  var SHARE_URL = "https://webpageanatomy.com/lab/quiz/";

  var WITTY_MESSAGES = [
    "Excellent, you're a wiz! You clearly did not skim this page.",
    "Certified Webpage Anatomy expert. Somewhere, a recruiter is impressed.",
    "You scored like someone who reads alt text for fun.",
    "Sharp work. Your z-index game is stronger than most production codebases.",
    "You passed. A <div> is being used correctly right now because of you.",
    "Impressive. You know more about the DOM than half the job applicants who claim to."
  ];

  var answered = {};
  var score = 0;
  var questions = [];

  function shuffle(arr) {
    var copy = arr.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function poolForLevel(level) {
    if (level === "beginner") {
      return allQuestions.filter(function (q) { return q.level === "beginner"; });
    }
    if (level === "intermediate") {
      return allQuestions.filter(function (q) { return q.level === "beginner" || q.level === "intermediate"; });
    }
    return allQuestions.slice();
  }

  function renderQuestions(selected) {
    list.innerHTML = "";
    selected.forEach(function (q, index) {
      var qIndex = index + 1;
      var fieldset = document.createElement("fieldset");
      fieldset.className = "quiz-q";
      fieldset.dataset.correct = q.correct;
      fieldset.dataset.explanation = q.explanation;

      var legend = document.createElement("legend");
      legend.textContent = qIndex + ". " + q.question;
      fieldset.appendChild(legend);

      var optionsWrap = document.createElement("div");
      optionsWrap.className = "quiz-options";

      q.options.forEach(function (opt, optIndex) {
        var wrapper = document.createElement("div");
        wrapper.className = "quiz-option";

        var input = document.createElement("input");
        input.type = "radio";
        input.id = "q" + qIndex + "-opt" + (optIndex + 1);
        input.name = "q" + qIndex;

        var label = document.createElement("label");
        label.setAttribute("for", input.id);
        label.textContent = opt;

        wrapper.appendChild(input);
        wrapper.appendChild(label);
        optionsWrap.appendChild(wrapper);
      });
      fieldset.appendChild(optionsWrap);

      var feedback = document.createElement("p");
      feedback.className = "quiz-feedback";
      feedback.setAttribute("role", "status");
      fieldset.appendChild(feedback);

      list.appendChild(fieldset);
    });
  }

  function updateScore() {
    scoreEl.textContent = "Score: " + score + " / " + questions.length;
  }

  function pickWittyMessage() {
    return WITTY_MESSAGES[Math.floor(Math.random() * WITTY_MESSAGES.length)];
  }

  function maybeShowResult(level, levelLabel) {
    if (Object.keys(answered).length !== questions.length) return;

    var pct = Math.round((score / questions.length) * 100);
    var passed = pct >= PASS_THRESHOLD;
    var msg;

    if (passed) {
      msg = pickWittyMessage();
      resultTextEl.textContent = score + " / " + questions.length + " (" + pct + "%). " + msg;
      prepareShare(levelLabel, msg, pct);
      shareArea.hidden = false;
    } else {
      msg = "Worth a re-read. Scroll back up and try again.";
      resultTextEl.textContent = score + " / " + questions.length + " (" + pct + "%). " + msg;
      shareArea.hidden = true;
    }

    resultEl.hidden = false;
    resultEl.focus();
  }

  function wireQuestions() {
    var fieldsets = Array.from(list.querySelectorAll(".quiz-q"));
    fieldsets.forEach(function (fieldset, qIndex) {
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
          maybeShowResult(fieldset.dataset.level, currentLevelLabel);
        });
      });
    });
  }

  var currentLevelLabel = "";

  function startLevel(level, count, levelLabel) {
    var pool = poolForLevel(level);
    var pickCount = Math.min(count, pool.length);
    questions = shuffle(pool).slice(0, pickCount);
    answered = {};
    score = 0;
    currentLevelLabel = levelLabel;

    renderQuestions(questions);
    wireQuestions();
    updateScore();

    resultEl.hidden = true;
    shareArea.hidden = true;
    if (shareNote) shareNote.hidden = true;
    intro.hidden = true;
    playArea.hidden = false;
    playArea.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  Array.from(document.querySelectorAll(".quiz-level-btn")).forEach(function (btn) {
    btn.addEventListener("click", function () {
      var level = btn.dataset.level;
      var count = parseInt(btn.dataset.count, 10);
      var levelLabel = btn.querySelector("strong").textContent;
      startLevel(level, count, levelLabel);
    });
  });

  retryBtn.addEventListener("click", function () {
    playArea.hidden = true;
    resultEl.hidden = true;
    intro.hidden = false;
    intro.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // ---- Sharing ----
  var shareThreadsBtn = document.getElementById("shareThreads");
  var shareFacebookBtn = document.getElementById("shareFacebook");
  var shareInstagramBtn = document.getElementById("shareInstagram");
  var shareEmailBtn = document.getElementById("shareEmail");
  var shareDownloadBtn = document.getElementById("shareDownload");
  var cardLevel = document.getElementById("quizShareCardLevel");
  var cardScore = document.getElementById("quizShareCardScore");
  var cardMessage = document.getElementById("quizShareCardMessage");

  var lastShareText = "";

  function prepareShare(levelLabel, message, pct) {
    lastShareText = "I scored " + score + "/" + questions.length + " (" + pct + "%) on the Webpage Anatomy " + levelLabel + " quiz. " + SHARE_URL;
    if (cardLevel) cardLevel.textContent = levelLabel + " level";
    if (cardScore) cardScore.textContent = score + " / " + questions.length;
    if (cardMessage) cardMessage.textContent = message;
  }

  function showShareNote(text) {
    if (!shareNote) return;
    shareNote.textContent = text;
    shareNote.hidden = false;
  }

  function downloadShareImage(onDone) {
    var card = document.getElementById("quizShareCard");
    if (!card || typeof window.WA === "undefined" || !window.WA.loadHtml2Canvas) {
      if (onDone) onDone();
      return;
    }
    window.WA.loadHtml2Canvas().then(function () {
      var clone = card.cloneNode(true);
      clone.id = "quiz-share-card-clone";
      clone.style.cssText = "position: fixed; left: -9999px; top: 0; z-index: -1;";
      clone.setAttribute("aria-hidden", "false");
      clone.style.display = "flex";
      document.body.appendChild(clone);

      setTimeout(function () {
        html2canvas(clone, { scale: 2, backgroundColor: "#FFF9F2", logging: false, useCORS: true }).then(function (canvas) {
          document.body.removeChild(clone);
          var link = document.createElement("a");
          link.download = "webpage-anatomy-quiz-score.png";
          link.href = canvas.toDataURL("image/png");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          if (onDone) onDone();
        }).catch(function () {
          if (document.getElementById("quiz-share-card-clone")) document.body.removeChild(clone);
          if (onDone) onDone();
        });
      }, 100);
    });
  }

  if (shareThreadsBtn) {
    shareThreadsBtn.addEventListener("click", function () {
      window.open("https://www.threads.net/intent/post?text=" + encodeURIComponent(lastShareText), "_blank", "noopener");
    });
  }

  if (shareFacebookBtn) {
    shareFacebookBtn.addEventListener("click", function () {
      window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(SHARE_URL), "_blank", "noopener");
    });
  }

  if (shareEmailBtn) {
    shareEmailBtn.addEventListener("click", function () {
      var subject = "I passed the Webpage Anatomy quiz";
      window.location.href = "mailto:?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lastShareText);
    });
  }

  if (shareInstagramBtn) {
    shareInstagramBtn.addEventListener("click", function () {
      // Instagram has no web intent for pre-filled posts, downloading the
      // image is the only real way to get a score onto a Story or post.
      downloadShareImage(function () {
        showShareNote("Image downloaded. Instagram doesn't support sharing straight from the web, add it to your Story or post from there.");
      });
    });
  }

  if (shareDownloadBtn) {
    shareDownloadBtn.addEventListener("click", function () {
      downloadShareImage();
    });
  }
})();
