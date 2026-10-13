const moves = {
  rock: { emoji: "✊", label: "ROCK" },
  paper: { emoji: "✋", label: "PAPER" },
  scissors: { emoji: "✌️", label: "SCISSORS" }
};

const playerHand = document.querySelector("#playerHand");
const computerHand = document.querySelector("#computerHand");
const playerStage = document.querySelector("#playerStage");
const computerStage = document.querySelector("#computerStage");
const playerCaption = document.querySelector("#playerCaption");
const computerCaption = document.querySelector("#computerCaption");
const resultCard = document.querySelector("#resultCard");
const resultIcon = document.querySelector("#resultIcon");
const resultKicker = document.querySelector("#resultKicker");
const resultTitle = document.querySelector("#resultTitle");
const resultMessage = document.querySelector("#resultMessage");
const roundNumber = document.querySelector("#roundNumber");
const playerScore = document.querySelector("#yourScoreno");
const computerScore = document.querySelector("#compScoreno");
const choiceButtons = [...document.querySelectorAll(".choice-button")];

let round = 0;
let playerWins = 0;
let computerWins = 0;
let isPlaying = false;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function setResult(type, icon, kicker, title, message) {
  resultCard.classList.remove("result-win", "result-lose", "result-draw", "result-pop");
  if (type) resultCard.classList.add(`result-${type}`);
  resultIcon.textContent = icon;
  resultKicker.textContent = kicker;
  resultTitle.textContent = title;
  resultMessage.textContent = message;
  void resultCard.offsetWidth;
  resultCard.classList.add("result-pop");
}

function animateScore(element) {
  element.classList.remove("score-pop");
  void element.offsetWidth;
  element.classList.add("score-pop");
}

async function playRound(playerMove) {
  if (isPlaying) return;
  isPlaying = true;
  choiceButtons.forEach((button) => {
    button.disabled = true;
    button.classList.toggle("is-selected", button.dataset.move === playerMove);
  });

  playerStage.classList.remove("is-reveal");
  computerStage.classList.remove("is-reveal");
  playerStage.classList.add("is-thinking");
  computerStage.classList.add("is-thinking");
  playerCaption.textContent = "ROCK...";
  computerCaption.textContent = "ROCK...";
  setResult("", "✦", "GET READY", "Rock, paper, scissors…", "Both hands are getting ready to throw.");

  // CSS controls the hand-bobbing and throw animations.
  await sleep(850);

  const computerMove = Object.keys(moves)[Math.floor(Math.random() * 3)];
  playerHand.textContent = moves[playerMove].emoji;
  computerHand.textContent = moves[computerMove].emoji;
  playerStage.classList.remove("is-thinking");
  computerStage.classList.remove("is-thinking");
  playerStage.classList.add("is-reveal");
  computerStage.classList.add("is-reveal");
  playerCaption.textContent = moves[playerMove].label;
  computerCaption.textContent = moves[computerMove].label;

  round += 1;
  roundNumber.textContent = String(round).padStart(2, "0");

  if (playerMove === computerMove) {
    setResult("draw", "↔", "ROUND DRAW", "A perfect match.", "Same move! Throw again to break the tie.");
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    playerWins += 1;
    playerScore.textContent = playerWins;
    animateScore(playerScore);
    setResult("win", "✦", "ROUND WON", "That's how it's done!", `${moves[playerMove].label} beats ${moves[computerMove].label.toLowerCase()}. Keep that streak alive.`);
  } else {
    computerWins += 1;
    computerScore.textContent = computerWins;
    animateScore(computerScore);
    setResult("lose", "↗", "ROUND LOST", "The CPU got this one.", `${moves[computerMove].label} beats ${moves[playerMove].label.toLowerCase()}. Your comeback starts now.`);
  }

  await sleep(560);
  playerStage.classList.remove("is-reveal");
  computerStage.classList.remove("is-reveal");
  choiceButtons.forEach((button) => { button.disabled = false; });
  isPlaying = false;
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => playRound(button.dataset.move));
});

document.querySelector("#resetButton").addEventListener("click", () => {
  if (isPlaying) return;
  round = 0;
  playerWins = 0;
  computerWins = 0;
  playerScore.textContent = "0";
  computerScore.textContent = "0";
  roundNumber.textContent = "00";
  playerHand.textContent = "✊";
  computerHand.textContent = "✊";
  playerCaption.textContent = "PICK YOUR MOVE";
  computerCaption.textContent = "WAITING FOR YOU";
  choiceButtons.forEach((button) => button.classList.remove("is-selected"));
  setResult("", "✦", "SCORE RESET", "Fresh start.", "Pick rock, paper, or scissors to start the showdown.");
  playerStage.classList.remove("is-thinking", "is-reveal");
  computerStage.classList.remove("is-thinking", "is-reveal");
});
