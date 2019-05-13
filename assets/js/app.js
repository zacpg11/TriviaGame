
$(document).ready(function () {
    // ----------------------------TRIVIA GAME----------------------------

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var timeRemaining = 16;
    var intervalID;
    var indexQandA = 0; //index to load a different question each round without the game reset or screen refresh
    var answered = false; //variable to stop the timer if user has clicked an answer
    var correct;
    var triviaGame = [{
        question: "What House at Hogwarts does Harry belong to?",
        answer: ["Slytherin", "Hufflepuff", "Ravenclaw", "Gryffindor"],
        correct: "3",
        image: ("assets/images/gryf.jpg")
    }, {
        question: "What position does Harry play on his Quidditch team?",
        answer: ["Keeper", "Seeker", "Beater", "Chaser"],
        correct: "1",
        image: ("assets//images/seeker.png")
    }, {
        question: "How did Harry get the scar on his forehead?",
        answer: ["Voldemort", "Fell out of Tree", "Fighting Malfoy", "Playing Quidditch"],
        correct: "0",
        image: ("assets//images/voldemort.jpg")
    }, {
        question: "What does the Sorcerer's Stone do?",
        answer: ["Poisons Enemies", "Bring Back People From the Dead", "Produce Elixir of Life", "Make You Invisible "],
        correct: "2",
        image: ("assets//images/stone.jpg")
    }, {
        question: "Who is Fluffy?",
        answer: ["A Three Headed Dog", "An Owl", "A Wizard", "A Dragon"],
        correct: "0",
        image: ("assets/images/fluffy.jpg")
    }, {
        question: "What power do the Dementors have over people?",
        answer: ["Mind Control", "Taking all Happiness Away", "Turning People Against Harry", "Making them Fall Asleep"],
        correct: "1",
        image: ("assets//images/dementor.jpg")
    }, {
        question: " What does the Imperius Curse do?",
        answer: ["Mind control Over Person Cast on", "Death", "Erases Memory", "Inflicts Pain"],
        correct: "0",
        image: ("assets//images/imperius.jpg")
    }, {
        question: "Who kills Professor Dumbledore?",
        answer: ["Malfoy", "Voldemort", "Snape", "Harry Potter"],
        correct: "2",
        image: ("assets//images/snape.jpg")
    }];

    // ------------- FUNCTIONS ----------------------------


    function startGame() {
        console.log("game has begun");
        $('.start-button').remove();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        loadQandA();
    }

    function loadQandA() {
        answered = false; // will allow timeRemaining to be pushed back to <h5> after round reset....else statement in function timer()
        timeRemaining = 16;
        intervalID = setInterval(timer, 1000);
        if (answered === false) {
            timer();
        }
        correct = triviaGame[indexQandA].correct;
        var question = triviaGame[indexQandA].question;
        $('.question').html(question);
        for (var i = 0; i < 4; i++) {
            var answer = triviaGame[indexQandA].answer[i];
            $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
        }

        $("h4").click(function () {
            var id = $(this).attr('id');
            if (id === correct) {
                answered = true; // stops the timer
                $('.question').text("THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                correctAnswer();
            } else {
                answered = true; //stops the timer
                $('.question').text("YOU CHOSE: " + triviaGame[indexQandA].answer[id] + ".....HOWEVER THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                incorrectAnswer();
            }
        });
    }

    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            $('.question').text("THE CORRECT ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
            unAnswered();
        } else if (answered === true) {
            clearInterval(intervalID);
        } else {
            timeRemaining--;
            $('.timeRemaining').text('YOU HAVE ' + timeRemaining + ' SECONDS TO CHOOSE');
        }
    }

    function correctAnswer() {
        correctAnswers++;
        $('.timeRemaining').text("YOU HAVE ANSWERED CORRECTLY!").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function incorrectAnswer() {
        incorrectAnswers++;
        $('.timeRemaining').text("YOU HAVE ANSWERED INCORRECTLY!").css({
            'color': '#3D414F'
        });
        resetRound();

    }

    function unAnswered() {
        unansweredQuestions++;
        $('.timeRemaining').text("YOU FAILED TO CHOOSE AN ANSWER").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function resetRound() {
        $('.answersAll').remove();
        $('.answers').append('<img class=answerImage width="150" height="150" src="' + triviaGame[indexQandA].image + ' ">'); // adds answer image
        indexQandA++; // increments index which will load next question when loadQandA() is called again
        if (indexQandA < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
                $('.answerImage').remove();
            }, 5000); // removes answer image from previous round
        } else {
            setTimeout(function () {
                $('.question').remove();
                $('.timeRemaining').remove();
                $('.answerImage').remove();
                $('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
                setTimeout(function () {
                    location.reload();
                }, 7000);
            }, 5000);
        }
    };

    $('.startButton').on("click", function () {
        $('.startButton');
        startGame();

    });

});