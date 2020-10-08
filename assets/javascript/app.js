// global variables

// highscores grab from local storage
let scoreHistory = JSON.parse(window.localStorage.getItem("highscores")) || [];

// var to store timer
let timer;
let timeContainer = document.getElementById("timer");
// element grab
let welcome = document.getElementById("startBtn");
let gameDiv = document.getElementById("game-div");
let correctDiv = document.getElementById("correct");
let message = document.getElementById("res-mes");
let wrongDiv = document.getElementById("wrong");
let scoreDiv = document.getElementById("score");
let scoreMess = document.getElementById("score-mess");
let playerScore = document.getElementById("player-score");

// variable to store game counters and functions
let game = {
  // game counters
  time: questions.length * 15,
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentIndex: 0,
};
// function to create countdown
function countDown() {
  // decrease by one
  game.time--;
  timeContainer.textContent = game.time;
  // conditional for zero time left on game clock
  if (game.time <= 0) {
    game.time = 0;
    timeContainer.textContent = game.time;
    done();
  }
}

function done() {
  clearInterval(timer);
  console.log("done function called");
  gameDiv.classList.add("hide");
  scoreDiv.classList.remove("hide");
  // create save high scores options
  document.getElementById("score-mess").textContent = `Well, well nicely done`;
  document.getElementById(
    "player-score"
  ).textContent = `Your new score is ${game.time}`;
  let image = document.createElement("img");
  image.setAttribute("src", "./assets/images/clap.gif");
  image.setAttribute("class", "score-img");
  scoreDiv.append(image);
}

function populate() {
  // grab the current question
  let current = questions[game.currentIndex];
  // grab question slot and give it the current question
  let title = document.getElementById("question");
  title.textContent = current.question;

  // empty btn div
  let optionEl = document.getElementById("options");
  optionEl.innerHTML = "";

  // iterate through the object array
  current.choices.forEach(function (choice, i) {
    let option = document.createElement("button");
    option.setAttribute("class", "btn btn-lg choice");
    option.setAttribute("value", choice);
    option.textContent = `${i + 1}. ${choice}`;
    option.onclick = checkAnswer;

    // append each button to the DOM
    optionEl.appendChild(option);
  });
}

function checkAnswer() {
  if (this.value === questions[game.currentIndex].correctAnswer) {
    game.correct++;
    // display correct tab
    message.textContent = `Correct!!`;
    correctDiv.classList.remove("wrong");
    correctDiv.classList.add("correct");
  } else {
    game.incorrect++;
    game.time -= 10;
    timeContainer.textContent = game.time;
    // display incorrect tab
    message.textContent = `Wrong!!`;
    correctDiv.classList.remove("correct");
    correctDiv.classList.add("wrong");
  }

  correctDiv.classList.remove("hide");
  setTimeout(function () {
    correctDiv.classList.add("hide");
  }, 1000);

  game.currentIndex++;
  if (game.currentIndex === questions.length) {
    done();
  } else {
    populate();
  }
}

function start() {
  // hide the welcome element, display game div
  welcome.classList.add("hide");
  gameDiv.classList.remove("hide");
  // start timer
  timer = setInterval(countDown, 1000);
  // populate questions
  populate();
}

function restart() {
  welcome.classList.remove("hide");
  scoreDiv.classList.add("hide");
  game.correct = 0;
  game.incorrect = 0;
  game.currentIndex = 0;
  game.unanswered = 0;
}

function addPlayer() {
  // add functionality to save player to the high scores list in local storage
  let newScore = {
    player: document.getElementById("player").value,
    score: game.time,
  };
  scoreHistory.push(newScore);
  window.localStorage.setItem("highscores", JSON.stringify(scoreHistory));
  leaders();
  restart();
}

function leaders() {
  // empty leader board and repopulate
  document.getElementById("leaders").innerHTML = "";
  // sort players by score
  let sorted = scoreHistory.sort((a, b) => {
    return b.score - a.score;
  });
  // add each leader to the leader modal
  sorted.forEach((player, i) => {
    let li = document.createElement("li");
    li.setAttribute("class", "list-group-item");
    li.textContent = `${i + 1}. ${player.player}  --  ${player.score}`;
    document.getElementById("leaders").appendChild(li);
  });
}

function clearScore() {
  window.localStorage.removeItem("highscores");
  location.reload();
}

// Main Game Logic
// ======================================================================
$(document).ready(function () {
  // set the leader board
  leaders();
  // event.preventDefault();
  $("#start").on("click", function () {
    start();
  });

  $("#playerBtn").on("click", function () {
    addPlayer();
  });

  $("#clear").on("click", () => {
    clearScore();
  });
});
