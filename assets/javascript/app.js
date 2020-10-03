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
            option.textContent = choice;
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

// counters
// let game = {
//     correct: 0,
//     incorrect: 0,
//     unanswered: 0,
//     timer: 120,
//     // timer count down function
//     decrement: function () {
//         game.timer--;
//         $("#timer").html("<div id='timer'><h2> Time Remaining: " + game.timer + " seconds</h2></div>");
//         if (game.timer === 0) {
//             clearInterval(countDown);
//             console.log("game over");
//             game.done();
//         }
//     },
//     // answer checks
//     done: function () {
//         clearInterval(countDown);

//         // condensed code for checking answers
//         for (var i = 0; i < questions.length; i++){
//             $.each($("input[name='question-"+[i]+"']:checked"), function() {
//                 if ($(this).val() == questions[i].correctAnswer) {
//                     game.correct++;
//                 } else {
//                     game.incorrect++;
//                 }
//             });
//         }

        
//         console.log(game.incorrect + " incorrect");
//         console.log(game.correct + " correct");
//         game.results();
//     },
//     // display results and final game score
//     results: function () {
//         $("#timer").remove();
//         $("#gameBody").html("<h2>Let's see how you did!</h2>");
//         $("#gameBody").append("<img src='assets/images/clap.gif' alt='image' height='208' width='500'>");
//         $("#gameBody").append("<h3>Correct Answers: " + this.correct + "</h3>");
//         $("#gameBody").append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
//         $("#gameBody").append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
//         if (game.correct === 15) {
//             $("#gameBody").append("<h2>Perfect Score! Fantastic! You really know your movies!</h2>");
//             $("#gameBody").append("<button type='button' class='btn btn-info btn-lg' id='restart'>Start</button>");

//         } else if (game.correct > game.incorrect) {
//             $("#gameBody").append("<h3>Not Bad! Want to try again?</h3>");
//             $("#gameBody").append("<button type='button' class='btn btn-info btn-lg' id='restart'>Start</button>");

//         } else {
//             $("#gameBody").append("<h3>Hmmmm..... Want to try again?</h3>");
//             $("#gameBody").append("<button type='button' class='btn btn-info btn-lg' id='restart'>Start</button>");
//         }
//     },
//     // restart game
//     restart: function () {
//         game.correct = 0;
//         game.incorrect = 0;
//         game.unanswered = 0;
//         game.timer = 120;
//         // start timer
//         countDown = setInterval(game.decrement, 1000);
//         // create div to append into so that it only appears when the button is clicked, includes timer div
//         $("#game").html("<div id='gameBody'><div id='timer'></div>");
//         // remove start button
//         $("#start").remove();
//         console.log("You clicked start");
//         console.log(questions);
//         // loop through questions with radio answers-break between questions and answers
//         for (var i = 0; i < questions.length; i++) {
//             $("#gameBody").append('<h3>' + questions[i].question + '<h3>');
//             for (var j = 0; j < questions[i].answers.length; j++) {
//                 $("#gameBody").append("<input type='radio' name='question-" + i + "' value='" + questions[i].answers[j] + "'>" + questions[i].answers[j] + "<br>");
//             }
//             //    break between each question
//             $("#gameBody").append("<br>");
//         }
//         $("#gameBody").append("<button type='button' class='btn btn-info btn-lg' id='end'>Done</button>");
//     }
// }

// variable for the interval counter
// let countDown;


// timers
// setInterval(game.decrement, 1000);

// global functions
// function startgame() {
//     $("#start").on("click", function () {
//         // start timer
//         countDown = setInterval(game.decrement, 1000);
//         // create div to append into so that it only appears when the button is clicked, includes timer div
//         $("#game").append("<div id='gameBody'><div id='timer'></div>");
//         // remove start button
//         $("#start").remove();
//         console.log("You clicked start");
//         console.log(questions);
//         // loop through questions with radio answers-break between questions and answers
//         for (var i = 0; i < questions.length; i++) {
//             $("#gameBody").append('<h3>' + questions[i].question + '<h3>');
//             for (var j = 0; j < questions[i].answers.length; j++) {
//                 $("#gameBody").append("<input type='radio' name='question-" + i + "' value='" + questions[i].answers[j] + "'>" + questions[i].answers[j] + "<br>");
//             }
//             //    break between each question
//             $("#gameBody").append("<br>");
//         }
//         $("#gameBody").append("<button type='button' class='btn btn-info btn-lg' id='end'>Done</button>");
//     })
// }


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