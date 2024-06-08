// script.js
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        choices: ["Harper Lee", "Jane Austen", "Mark Twain", "J.K. Rowling"],
        answer: "Harper Lee"
    },
    {
        question: "What is the smallest prime number?",
        choices: ["0", "1", "2", "3"],
        answer: "2"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const timerElement = document.getElementById('timer');
const timeLeftElement = document.getElementById('time-left');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const reviewButton = document.getElementById('review-button');
const restartButton = document.getElementById('restart-button');

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

reviewButton.addEventListener('click', () => {
    showReview();
});

restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    showQuestion();
});

function showQuestion() {
    clearInterval(timer);
    resetState();
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    question.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice');
        button.addEventListener('click', () => selectAnswer(button, question.answer));
        choicesElement.appendChild(button);
    });
    startTimer();
}

function resetState() {
    nextButton.classList.add('hide');
    while (choicesElement.firstChild) {
        choicesElement.removeChild(choicesElement.firstChild);
    }
}

function selectAnswer(button, correctAnswer) {
    const selectedAnswer = button.textContent;
    if (selectedAnswer === correctAnswer) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('incorrect');
    }
    Array.from(choicesElement.children).forEach(choice => {
        choice.disabled = true;
        if (choice.textContent === correctAnswer) {
            choice.classList.add('correct');
        }
    });
    nextButton.classList.remove('hide');
    clearInterval(timer);
}

function startTimer() {
    let timeLeft = 10;
    timeLeftElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            selectAnswer({textContent: ""}, questions[currentQuestionIndex].answer);
        }
    }, 1000);
}

function showResults() {
    quizContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreElement.textContent = `You scored ${score} out of ${questions.length}`;
}

function showReview() {
    // Show a review of the quiz answers (this can be further implemented as needed)
}

showQuestion();
