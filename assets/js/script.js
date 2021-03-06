const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

// score tracker
function incrementScore() {
  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = ++oldScore;
}

function incrementWrongAnswer() {
  let oldScore = parseInt(document.getElementById("incorrect").innerText);
  document.getElementById("incorrect").innerText = ++oldScore;
}

const modal = document.getElementById("myModal");

 const howToButton = document.getElementById("howToButton");

 const closeHowTo = document.getElementById("closeHowTo");

 howToButton.onclick = function () {
   modal.style.display = "block";
 };

 closeHowTo.onclick = function () {
   modal.style.display = "none";
 };

 window.onclick = function (event) {
   if (event.target === modal) {
     modal.style.display = "none";
   }
 };

 function welcome() {
  document.getElementById("greeting").classList.remove("hide");
  // update the welcome to the entered name, or default to Player 1
  if (document.getElementById("fname").value.length > 0) {
    document.getElementById("username").innerHTML = document.getElementById(
      "fname"
    ).value;
  } else {
    document.getElementById("username").innerHTML = "Player 1";
  }
  // hide name entry
  document.getElementById("nameCollector").classList.add("hide");
  // Show the quiz
  document.getElementById("quiz-interaction").classList.remove("hide");
}


// Checks if answer is correct and adds to score
function checkAnswer(isCorrect) {
  if (isCorrect) {
    incrementScore();
  } else {
    incrementWrongAnswer();
  }
}