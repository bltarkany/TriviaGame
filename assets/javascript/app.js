// global variables
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
var game = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    timer: 120,
    // timer count down function
    decrement: function () {
        game.timer--;
        $("#timer").html("<div id='timer'><h2> Time Remaining: " + game.timer + " seconds</h2></div>");
        if (game.timer === 0) {
            clearInterval(countDown);
            console.log("game over");
            game.done();
        }
    },
    // answer checks
    done: function () {
        clearInterval(countDown);

        // condensed code for checking answers
        for (var i = 0; i < questions.length; i++){
            $.each($("input[name='question-"+[i]+"']:checked"), function() {
                if ($(this).val() == questions[i].correctAnswer) {
                    game.correct++;
                } else {
                    game.incorrect++;
                }
            });
        }

        
        console.log(game.incorrect + " incorrect");
        console.log(game.correct + " correct");
        game.results();
    },
    // display results and final game score
    results: function () {
        $("#timer").remove();
        $("#gameBody").html("<h2>Let's see how you did!</h2>");
        $("#gameBody").append("<img src='assets/images/clap.gif' alt='image' height='208' width='500'>");
        $("#gameBody").append("<h3>Correct Answers: " + this.correct + "</h3>");
        $("#gameBody").append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
        $("#gameBody").append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
        if (game.correct === 15) {
            $("#gameBody").append("<h2>Perfect Score! Fantastic! You really know your movies!</h2>");
            $("#gameBody").append("<button type='button' class='btn btn-info btn-lg' id='restart'>Start</button>");

        } else if (game.correct > game.incorrect) {
            $("#gameBody").append("<h3>Not Bad! Want to try again?</h3>");
            $("#gameBody").append("<button type='button' class='btn btn-info btn-lg' id='restart'>Start</button>");

        } else {
            $("#gameBody").append("<h3>Hmmmm..... Want to try again?</h3>");
            $("#gameBody").append("<button type='button' class='btn btn-info btn-lg' id='restart'>Start</button>");
        }
    },
    // restart game
    restart: function () {
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.timer = 120;
        // start timer
        countDown = setInterval(game.decrement, 1000);
        // create div to append into so that it only appears when the button is clicked, includes timer div
        $("#game").html("<div id='gameBody'><div id='timer'></div>");
        // remove start button
        $("#start").remove();
        console.log("You clicked start");
        console.log(questions);
        // loop through questions with radio answers-break between questions and answers
        for (var i = 0; i < questions.length; i++) {
            $("#gameBody").append('<h3>' + questions[i].question + '<h3>');
            for (var j = 0; j < questions[i].answers.length; j++) {
                $("#gameBody").append("<input type='radio' name='question-" + i + "' value='" + questions[i].answers[j] + "'>" + questions[i].answers[j] + "<br>");
            }
            //    break between each question
            $("#gameBody").append("<br>");
        }
        $("#gameBody").append("<button type='button' class='btn btn-info btn-lg' id='end'>Done</button>");
    }
}

// variable for the interval counter
var countDown;


// timers
// setInterval(game.decrement, 1000);

// global functions
function startgame() {
    $("#start").on("click", function () {
        // start timer
        countDown = setInterval(game.decrement, 1000);
        // create div to append into so that it only appears when the button is clicked, includes timer div
        $("#game").append("<div id='gameBody'><div id='timer'></div>");
        // remove start button
        $("#start").remove();
        console.log("You clicked start");
        console.log(questions);
        // loop through questions with radio answers-break between questions and answers
        for (var i = 0; i < questions.length; i++) {
            $("#gameBody").append('<h3>' + questions[i].question + '<h3>');
            for (var j = 0; j < questions[i].answers.length; j++) {
                $("#gameBody").append("<input type='radio' name='question-" + i + "' value='" + questions[i].answers[j] + "'>" + questions[i].answers[j] + "<br>");
            }
            //    break between each question
            $("#gameBody").append("<br>");
        }
        $("#gameBody").append("<button type='button' class='btn btn-info btn-lg' id='end'>Done</button>");
    })
}


// Main Game Logic
// ======================================================================
$(document).ready(function () {
    // event.preventDefault();
    startgame();
})