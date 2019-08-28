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

        // $.each($("input[name='question-0']:checked"), function () {
        //     if ($(this).val() == questions[0].correctAnswer) {
        //         game.correct++;
        //     } else {
        //         game.incorrect++;
        //     }
        // });
        // $.each($("input[name='question-1']:checked"), function () {
        //     if ($(this).val() == questions[1].correctAnswer) {
        //         game.correct++;
        //     } else {
        //         game.incorrect++;
        //     }
        // });
        // $.each($("input[name='question-2']:checked"), function () {
        //     if ($(this).val() == questions[2].correctAnswer) {
        //         game.correct++;
        //     } else {
        //         game.incorrect++;
        //     }
        // });
        // $.each($("input[name='question-3']:checked"), function () {
        //     if ($(this).val() == questions[3].correctAnswer) {
        //         game.correct++;
        //     } else {
        //         game.incorrect++;
        //     }
        // });
        // $.each($("input[name='question-4']:checked"), function () {
        //     if ($(this).val() == questions[4].correctAnswer) {
        //         game.correct++;
        //     } else {
        //         game.incorrect++;
        //     }
        // });
        // $.each($("input[name='question-5']:checked"), function () {
        //     if ($(this).val() == questions[5].correctAnswer) {
        //         game.correct++;
        //     } else {
        //         game.incorrect++;
        //     }
        // });
        // $.each($("input[name='question-6']:checked"), function () {
        //     if ($(this).val() == questions[6].correctAnswer) {
        //         game.correct++;
        //     } else {
        //         game.incorrect++;
        //     }
        // });
        // $.each($("input[name='question-7']:checked"), function () {
        //     if ($(this).val() == questions[7].correctAnswer) {
        //         game.correct++;
        //     } else {
        //         game.incorrect++;
        //     }
        // });
        // $.each($("input[name='question-8']:checked"), function () {
        //     if ($(this).val() == questions[8].correctAnswer) {
        //         game.correct++;
        //     } else {
        //         game.incorrect++;
        //     }
        // });
        // $.each($("input[name='question-9']:checked"), function () {
        //     if ($(this).val() == questions[9].correctAnswer) {
        //         game.correct++;
        //     } else {
        //         game.incorrect++;
        //     }
        // });
        // $.each($("input[name='question-10']:checked"), function () {
        //     if ($(this).val() == questions[10].correctAnswer) {
        //         game.correct++;
        //     } else {
        //         game.incorrect++;
        //     }
        // });
        // $.each($("input[name='question-11']:checked"), function () {
        //     if ($(this).val() == questions[11].correctAnswer) {
        //         game.correct++;
        //     } else {
        //         game.incorrect++;
        //     }
        // });
        // $.each($("input[name='question-12']:checked"), function () {
        //     if ($(this).val() == questions[12].correctAnswer) {
        //         game.correct++;
        //     } else {
        //         game.incorrect++;
        //     }
        // });
        // $.each($("input[name='question-13']:checked"), function () {
        //     if ($(this).val() == questions[13].correctAnswer) {
        //         game.correct++;
        //     } else {
        //         game.incorrect++;
        //     }
        // });
        // $.each($("input[name='question-14']:checked"), function () {
        //     if ($(this).val() == questions[14].correctAnswer) {
        //         game.correct++;
        //     } else {
        //         game.incorrect++;
        //     }
        // });
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

// questions
var questions = [{
    question: "What was the name of Molly Ringwalds love interest in Sixteen Candles?",
    answers: ["Kevin McCalister", "Jake Ryan", "Tony Manero", "Travis Bickle"],
    correctAnswer: "Jake Ryan"
}, {
    question: "In 'An Affair to Remeber', where were Nickie Ferrante and Terry Mckay supposed to meet in six months?",
    answers: ["Central Park", "Statue of Liberty", "Coney Island", "Empire State Building"],
    correctAnswer: "Empire State Building"
}, {
    question: "Which 1950's actress became the Princess of Monaco?",
    answers: ["Audrey Hepburn", "Doris Day", "Marilyn Monroe", "Grace Kelly"],
    correctAnswer: "Grace Kelly"
}, {
    question: "In what moive must John McClane defeat Hans Gruber in order to save Christmas?",
    answers: ["White Christmas", "Black Christmas", "Die Hard", "Black Christmas"],
    correctAnswer: "Die Hard"
}, {
    question: "What's the name of the arch enemy Deadpool is searching for?",
    answers: ["Colossus", "Francis", "Warlord", "Weasal"],
    correctAnswer: "Francis"
}, {
    question: "Who was the first black actress to win an Academy Award for 'Best Actress'?",
    answers: ["Viola Davis", "Eartha Kitt", "Cicely Tyson", "Halle Berry"],
    correctAnswer: "Halle Berry"
}, {
    question: "What was the first full length animated moive?",
    answers: ["Snow White", "Fun and Fancy Free", "Gulliver's Travels", "Pinocchio"],
    correctAnswer: "Snow White"
}, {
    question: "What was the name of John Wick's dog, that his wife gave to him?",
    answers: ["Brutus", "Patch", "Princess", "Daisy"],
    correctAnswer: "Daisy"
}, {
    question: "In Hitchcock's 'The Birds', what kind of bird was Melanie Daniels bringing to Mitch Brenner?",
    answers: ["Cockatiels", "Parakeets", "Lovebirds", "Canaries"],
    correctAnswer: "Lovebirds"
}, {
    question: "What song did Aretha Franklin sing in 'Blues Brother'?",
    answers: ["Respect", "Think", "Natural Woman", "Chain of Fools"],
    correctAnswer: "Think"
}, {
    question: "Who is Keyser Soze in the film 'The Usual Suspects'?",
    answers: ["Dean Keaton", "Michael McManus", "Todd Hockney", "Verbal Kint"],
    correctAnswer: "Verbal Kint"
}, {
    question: "What was the name of Will Smith's character in 'Indepence Day'?",
    answers: ["Jimmy Wilder", "David Levinson", "Russel Casse", "Steven Hiller"],
    correctAnswer: "Steven Hiller"
}, {
    question: "What movie is this line from, 'There's no crying in baseball'?",
    answers: ["Major League", "A League of Their Own", "Bull Durham", "Rookie of the Year"],
    correctAnswer: "A League of Their Own"
}, {
    question: "Judy Garland starred as Dorothy Gale in what classic film?",
    answers: ["The Harvey Girls", "Pillow Talk", "Gentlemen Prefer Blondes", "The Wizard of Oz"],
    correctAnswer: "The Wizard of Oz"
}, {
    question: "In Harry Potter the meaning of the word 'Muggle' is?",
    answers: ["a witch/wiazrd who can transform into an animal", "wizard prison", "non magical people", "fairies"],
    correctAnswer: "non magical people"
}];

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