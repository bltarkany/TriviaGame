// global variables

// var to store timer
let timer;
let timeContainer = document.getElementById('timer');
// element grab
let welcome = document.getElementById('startBtn');
let gameDiv = document.getElementById('game-div');

// variable to store game counters and functions
let game = {
    // game counters
    time: questions.length * 15,
    correct: 0,
    incorrect: 0, 
    unanswered: 0,
    currentIndex: 0,

    // function to create countdown
    countDown: function(){
        // decrease by one 
        game.time --;
        timeContainer.textContent = game.time;
        // conditional for zero time left on game clock
        if (game.time <= 0){
            game.time = 0;
            timeContainer.textContent = game.time;
            game.done();
        }
    },

    done: function (){
        clearInterval(timer);
        console.log('done function called');
        // create save high scores options

    },

    populate: function() {
        // grab the current question
        let current = questions[this.currentIndex];
        // grab question slot and give it the current question
        let title = document.getElementById('question');
        title.textContent = current.question;

        // empty btn div
        let optionEl = document.getElementById('options');
        optionEl.innerHTML = '';

        // iterate through the object array
        current.choices.forEach(function(choice, i){
            let option = document.createElement('button');
            option.setAttribute('class', 'btn btn-lg choice');
            option.setAttribute('value', choice);
            option.textContent = `${i + 1}. ${choice}`;
            option.onclick = game.checkAnswer;

            // append each button to the DOM 
            optionEl.appendChild(option);
        });
       
    },

    checkAnswer: () => {
        if(this.value === questions[game.currentIndex].correctAnswer){
            game.correct++;
            // display correct tab
        } else {
            game.incorrect++;
            game.time -= 10;
            // display incorrect tab
        }

        game.currentIndex++;
        if (game.currentIndex ===  questions.length){
            game.done();
        } else {
            game.populate();
        }
    },
    start: () => {
        // hide the welcome element, display game div
        welcome.classList.add('hide');
        gameDiv.classList.remove('hide');
        // start timer
        timer = setInterval(game.countDown, 1000);
        // populate questions
        game.populate();

    },
    restart: () =>{
        // reset the game counters
        game.time = questions.length * 15;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.currentIndex = 0;
        // run the start quiz function

    },


}

// creates stop when done is clicked
$(document).on("click", "#end", function () {
    game.done();
});
// creates restart for dynamically created button
$(document).on("click", "#restart", function () {
    console.log("you clicked me");
    game.restart();
});


// Main Game Logic
// ======================================================================
$(document).ready(function () {
    // event.preventDefault();
    $('#start').on('click', function(){
        game.start();
    })
   

    // $('#staticBackdrop').on('shown.bs.modal', function () {
    //     $('#staticBackdrop').trigger('focus')
    // });
});