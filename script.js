//initializing variable

var quizQuestions = document.getElementById("quiz-questions");
var timer = document.getElementById("timer");
var btnStart = document.getElementById("btn-start");
var timecounter = document.getElementById("timecounter");
var titleitem = document.getElementById("title-item");
var nextQuestions
var questionanswers = document.getElementById("question-answers");
var myScore = document.getElementById("score");
var btnScore = document.getElementById("btnScore");
var currentindex = 0;
var score = 0;
var count = 75;
var alerts = document.getElementById("alerts");
var info = document.getElementById("info");
var timeinterval;
// var addscore = document.getElementById("addscore");
// var submitresult = document.getElementById("submitresult");
var allScores = [];
var storedScores = JSON.parse(localStorage.getItem("userData"));

//Storing all the questions in local file
var questions = [{
        title: "Commonly used data type Do Not include:---",
        choices: ["strings", "boolean", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if/else statement is enclosed within:---",
        choices: ["quotes", "Curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store:---",
        choices: ["numbers and strings", "others Arrays", "boolean", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within --- when being assigned to variables ",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:---",
        choices: ["JavaScript", "terminal/bash", "alerts", "console.log"],
        answer: "console.log"
    },
]
btnStart.addEventListener("click", startQuiz);


//Calling question and timer at same time to start the quiz
function startQuiz() {
    if (storedScores !== null) {
        allScores = storedScores;
    }
    info.classList.add("d-none")
    btnStart.classList.add("d-none")
    timecounter.classList.remove("d-none")
    quizQuestions.classList.remove("d-none")
    nextQuestions = questions[currentindex]
    console.log(nextQuestions.title)

    displayQuestion(nextQuestions)

    gametime()
}
btnScore.addEventListener("click", function() {
    let name = document.getElementById("inputScore").value
    scorePage(name, score)
});


//setting game timer
function gametime() {

    timeinterval = setInterval(function() {
        console.log(count);
        if (count <= 0) {
            endgame();

        }
        timer.innerText = count
        count--;
    }, 1000);

}

//Storing scores in score html to retreive later
function scorePage(a, b) {

    var userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "score.html";
}

//Reading all the question from the filw and disply in UI
function displayQuestion(question) {
    titleitem.innerText = question.title
    question.choices.forEach(element => {
        var button = document.createElement("button")
        button.className = "btn-primary btn-block text-left"
        button.innerText = element
            // questionanswers.innerHTML=""
        questionanswers.appendChild(button)
        button.addEventListener("click", displaynextQuestion)
    });
}

//B ased on user response moving to next question
function displaynextQuestion(e) {
    currentindex++
    if (currentindex < questions.length) {
        correction(e.target.innerText == nextQuestions.answer)
        questionanswers.innerHTML = ""
        if (currentindex < questions.length) {
            nextQuestions = questions[currentindex]
            displayQuestion(nextQuestions)
        } else {
            currentindex = 0
            displayQuestion(nextQuestions)
        }

    } else {
        console.log("endgame")
        endgame()
    }
}

//This will identify the answer correct or worong
function correction(response) {

    if (response) {
        alerts.innerText = "Correct!"
        console.log("Correct!")
    } else {
        alerts.innerText = "Wrong!"
        count = count - 15
        timer.innerHTML = count
        console.log("Wrong!")

    }
    setTimeout(function() {
        alerts.innerText = ""

    }, 1000);

}


//Calling this function to abort the game and setting the score to alert, also removing all the conntents
function endgame() {
    score = count;
    myScore.innaText = count
    addscore.classList.remove("d-none");
    timecounter.classList.add("d-none");
    quizQuestions.classList.add("d-none");
    addscore.classList.remove("d-none");
    clearInterval(timeinterval);
    alert(`Game over: you scored ${score}`)
}