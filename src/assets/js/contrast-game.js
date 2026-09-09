(function () {
  var preview = document.getElementById("cgPreview");
  if (!preview || !window.WA || !window.WA.contrast) return;

  // The dialog only exists on the homepage. On the standalone lab page this
  // demo also lives on, there is no dialog to gate on or reset from.
  var modal = document.getElementById("contrastGameModal");

  // Curated for variety (clear passes, clear fails, and a couple of
  // genuinely close calls) — graded live via the shared utility below,
  // never hardcoded, so the "right answer" can't drift out of sync.
  var pairs = [
    { fg: "#22182B", bg: "#FFF9F2" },
    { fg: "#FF3D9A", bg: "#FFF9F2" },
    { fg: "#00BFA5", bg: "#FFF9F2" },
    { fg: "#FFD23F", bg: "#FFF9F2" },
    { fg: "#FF6B5B", bg: "#22182B" },
    { fg: "#707070", bg: "#FFF9F2" },
    { fg: "#FFFFFF", bg: "#B8175E" },
    { fg: "#000000", bg: "#00BFA5" },
  ];

  var scoreEl = document.getElementById("cgScore");
  var guessRow = document.getElementById("cgGuessRow");
  var result = document.getElementById("cgResult");
  var resultText = document.getElementById("cgResultText");
  var passBtn = document.getElementById("cgGuessPass");
  var failBtn = document.getElementById("cgGuessFail");
  var nextBtn = document.getElementById("cgNext");

  var score = 0;
  var total = 0;
  var current = null;
  var lastIndex = -1;

  function pickPair() {
    var idx;
    do {
      idx = Math.floor(Math.random() * pairs.length);
    } while (idx === lastIndex && pairs.length > 1);
    lastIndex = idx;
    return pairs[idx];
  }

  function newRound() {
    current = pickPair();
    preview.style.color = current.fg;
    preview.style.background = current.bg;
    guessRow.hidden = false;
    result.hidden = true;
    result.classList.remove("is-correct", "is-incorrect");
  }

  function guess(guessedPass) {
    var ratio = window.WA.contrast.ratio(current.fg, current.bg);
    var actuallyPasses = ratio >= 4.5;
    var correct = guessedPass === actuallyPasses;

    total += 1;
    if (correct) score += 1;
    scoreEl.textContent = "Score: " + score + " / " + total;

    guessRow.hidden = true;
    result.hidden = false;
    result.classList.add(correct ? "is-correct" : "is-incorrect");
    resultText.textContent =
      (correct ? "Right! " : "Not quite. ") +
      "Actual ratio: " + ratio.toFixed(2) + ":1 — that " +
      (actuallyPasses ? "passes" : "fails") + " AA normal text (4.5:1).";
  }

  if (passBtn) passBtn.addEventListener("click", function () { guess(true); });
  if (failBtn) failBtn.addEventListener("click", function () { guess(false); });
  if (nextBtn) nextBtn.addEventListener("click", newRound);

  var opener = document.getElementById("openContrastGameModal");
  if (modal && opener) {
    // Inside the homepage modal, each open starts a fresh round and each
    // close resets the score, so returning later always starts clean.
    modal.addEventListener("close", function () {
      score = 0;
      total = 0;
      scoreEl.textContent = "Score: 0 / 0";
    });
    opener.addEventListener("click", newRound);
  } else {
    // On its standalone page there is no dialog lifecycle to hook, so the
    // first round just starts as soon as the page loads.
    newRound();
  }
})();
