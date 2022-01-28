// quiz sections
const section1 = document.getElementById("section1");
const section2 = document.getElementById("section2");
const section3 = document.getElementById("section3");

// start button
const startButton = document.getElementById("button1");

// timer
const timerEl = document.getElementById("timer");

// answer results
const resultEl = document.getElementById("result");

// final score
const scoreEl = document.getElementById("score");

// quiz 
const questionEl = document.getElementById("question")
const choiceButton1 = document.getElementById("choice1");
const choiceButton2 = document.getElementById("choice2");
const choiceButton3 = document.getElementById("choice3");
const choiceButton4 = document.getElementById("choice4");
const questions = [
  {
    question: "Commonly used data types DO NOT include:", // modifies questionElement
    choice1: "strings", // modifies choiceButton1
    choice2: "booleans", // modifies choiceButton2
    choice3: "alerts", // modifies choiceButton3
    choice4: "numbers", // modifies choiceButton4
    correct: "choice3", // referenced in checkAnswer()
  },
  {
    question: "The condition in an if/else statement is enclosed within _____",
    choice1: "quotes",
    choice2: "curly brackets",
    choice3: "parentheses",
    choice4: "square brackets",
    correct: "choice3",
  },
  {
    question: "Arrays in JavaScript can be used to store _____",
    choice1: "numbers and strings",
    choice2: "other arrays",
    choice3: "booleans",
    choice4: "all of the above",
    correct: "choice4",
  },
  {
    question: "String values must be enclosed within _____ when being assigned to variables",
    choice1: "commas",
    choice2: "curly brackets",
    choice3: "quotes",
    choice4: "parentheses",
    correct: "choice3",
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choice1: "Javascript",
    choice2: "terminal/bash",
    choice3: "for loops",
    choice4: "console.log",
    correct: "choice4",
  }
];

// render quiz in the html
let questionIndex = 0; 
let currentQuestion = questions[questionIndex];
function renderQuestion() {
  let currentQuestion = questions[questionIndex];
  questionEl.innerHTML = currentQuestion.question;
  choiceButton1.innerHTML = currentQuestion.choice1;
  choiceButton2.innerHTML = currentQuestion.choice2;
  choiceButton3.innerHTML = currentQuestion.choice3;
  choiceButton4.innerHTML = currentQuestion.choice4;
}

// section1 functionality 
let timeLeft;
function startQuiz() {
  timeLeft = 60;
  console.log("clicked");
  startTimer();
  section1.hidden = true;
  section2.hidden = false;
}

// timer functionality
let quizTimer;
function startTimer() {
  quizTimer = setInterval(function(){
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      stopTimer();
    }
  }, 1000);
}
// stop the timer
function stopTimer() {
  clearInterval(quizTimer);
}

// check answer 
let userScore;
function checkAnswer(answer) {
  currentQuestion = questions[questionIndex];
  console.log("clicked");
  if (answer === currentQuestion.correct) {
    console.log("Correct");
    resultEl.textContent = "Correct";
  } else {
    console.log("Incorrect");
    resultEl.textContent = "Incorrect"; 
    timeLeft -= 10;
  }
  nextQuestion();
}
//render next question or finish quiz
function nextQuestion() {
  if (questionIndex < questions.length-1) { 
    console.log("next question")
    questionIndex++;
    renderQuestion();
  } else { // stop timer, log score, and proceed to score submission
    console.log("no more questions")
    userScore = timeLeft;
    scoreEl.textContent = userScore;
    stopTimer();
    timerEl.parentElement.hidden = true;
    section2.hidden = true;
    section3.hidden = false;
  } 
}

// submit initials and save score
let savedScore;
let loggedScore = [];
function saveScore () {
  savedScore = {
    score: userScore,
    initials: document.getElementById("initials").value,
  } 
  loggedScore.push(savedScore);
  logScore();
}
// allows multiple scores to be saved in localStorage
function logScore() {
  let pulledScores = JSON.parse(localStorage.getItem("loggedScore"));
  if (pulledScores == null) {
    localStorage.setItem("loggedScore", JSON.stringify(loggedScore));
  } else {
    let newLoggedScore = pulledScores.concat(loggedScore);
    localStorage.setItem("loggedScore", JSON.stringify(newLoggedScore));
  }
}

// load score page
function loadScorePage(event) {
  saveScore();
  event.preventDefault();
  window.location.href = "score-page.html";
}

renderQuestion();
// start quiz 
startButton.addEventListener("click", startQuiz);