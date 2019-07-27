// global variables

// counters
var correct = 0;
var incorrect = 0;
var unanswered = 0;

var timer = 60;

// questions
var questions = [

    {
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
    }
];

// timers
// setTimeout(sixtySeconds, 1000 * 60);




// global functions
function startgame() {

}




// Main Game Logic
// ======================================================================
$(document).ready(function () {
    $("#start").on("click", function () {
        $("#start").remove();
        console.log("You clicked start")
        console.log(questions);
        // create div to append into so that it only appears when the button is clicked
        $("#game").append("<div id='gameBody'></div>");
        // loop through questions with radio answers-break between questions and answers
        for (var i = 0; i < questions.length; i++) {
           $("#gameBody").append('<h3>'+questions[i].question+'<h3>'); 
           for (var j = 0; j < questions[i].answers.length; j++) {
               $("#gameBody").append("<input type='radio' name='question-"+i+"' value='"+questions[i].answers[j]+"'>"+questions[i].answers[j]+"<br>");
           }   
           $("#gameBody").append("<br>");
        }

    })

})