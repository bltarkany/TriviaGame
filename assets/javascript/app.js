// global variables

// var to store timer
let timer;
let timeContainer = document.getElementById("timer");
// element grab
let welcome = document.getElementById("startBtn");
let gameDiv = document.getElementById("game-div");
let correctDiv = document.getElementById("correct");
let wrongDiv = document.getElementById("wrong");

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
  // create save high scores options
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
  console.log(this.value);
  console.log(this);
  if (this.value === questions[game.currentIndex].correctAnswer) {
    game.correct++;
    // display correct tab
    correctDiv.classList.remove("hide");
    setTimeout(() => {
      correctDiv.classList.add("hide");
    }, 1000);
  } else {
    game.incorrect++;
    game.time -= 10;
    timeContainer.textContent = game.time;
    // display incorrect tab
    wrongDiv.classList.remove("hide");
    setInterval(() => {
      wrongDiv.classList.add("hide");
    }, 1000);
  }

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

// Main Game Logic
// ======================================================================
$(document).ready(function () {
  // event.preventDefault();
  $("#start").on("click", function () {
    start();
  });

  // $('#staticBackdrop').on('shown.bs.modal', function () {
  //     $('#staticBackdrop').trigger('focus')
  // });
});
