// Get references to various elements in the HTML document
const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain');
const goHomeBtn = document.querySelector('.goHome-btn');

// Define a variable to keep track of the timer
let timer;
function startTimer() {
    let timeLeft = 20; // Set the initial time


    updateTimer(timeLeft);

    // Create an interval to update the timer every second
    timer = setInterval(function () {
        timeLeft--;

        // Display the updated time
        updateTimer(timeLeft);

        
        if (timeLeft === 0) {
            clearInterval(timer);

            // Handle time up when the timer runs out
            handleTimeUp();
        }
    }, 1000); // Update every 1 second
}

// Function to update the timer display
function updateTimer(timeLeft) {
    const timerElement = document.querySelector('.timer');
    timerElement.textContent = `Time Left: ${timeLeft} seconds`;
}

// Function to handle time up
function handleTimeUp() {
    nextBtn.click();
}

// Event handler for the "Start the Quiz" button
startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');

    // Start the timer when the quiz starts
    startTimer();
}

// Event handler for the "Exit Quiz" button in the information popup
exitBtn.onclick = () => {
    // Clear the timer if it's running
    clearInterval(timer);

    // Close the information popup and make the main content inactive
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}


exitBtn.onclick = () => {
    // Close the information popup and make the main content inactive
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

// Event handler for the "Continue" button in the information popup
continueBtn.onclick = () => {
    // Show the quiz section, hide the information popup, and make the main content inactive
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    // Initialize the quiz with the first question
    showQuestions(0);
    questionCounter(1);
    headerScore();
}

// Event handler for the "Try Again" button in the result box
tryAgainBtn.onclick = () => {
    // Reset the quiz, show the quiz box, and hide the result box
    quizBox.classList.add('active');
    resultBox.classList.remove('active');

    // Reset quiz-related variables and show the first question
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}

// Event handler for the "Homescreen" button in the result box
goHomeBtn.onclick = () => {
    // Return to the homescreen, reset quiz-related variables, and show the first question
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
}

// Initialize variables to keep track of the current question, question number, and user score
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

// Get a reference to the "Next" button
const nextBtn = document.querySelector('.next-btn');

// Event handler for the "Next" button
nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        // If there are more questions, move to the next one
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        // If all questions are answered, show the result box
        showResultBox();
    }
}

// Get a reference to the option list
const optionList = document.querySelector('.option-list');

// Function to display questions and answer options
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        // Set an "onclick" event for each answer option
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

// Function to handle the user's answer selection
function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        // If the user's answer is correct, mark it as correct and update the score
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        // If the answer is incorrect, mark it as incorrect and highlight the correct answer
        answer.classList.add('incorrect');

        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    // Disable all answer options to prevent further selection
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    // Make the "Next" button active
    nextBtn.classList.add('active');
}

// Function to display the current question number
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

// Function to update the displayed user score
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

// Function to display the result box and calculate the user's score
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `You scored ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;

        if (progressStartValue <= progressEndValue) {
            progressValue.textContent = `${progressStartValue}%`;
            circularProgress.style.background = `conic-gradient(#1abc9c ${progressStartValue * 3.6}deg, #2d3748 0deg)`;
        } else {
            clearInterval(progress);

            // Check if the user has answered all questions correctly
            if (userScore === questions.length) {
                // User answered all questions correctly, update the progress value to 100%
                progressValue.textContent = '100%';
                circularProgress.style.background = 'conic-gradient(#1abc9c 360deg, #2d3748 0deg)';
            }
        }
    }, speed);
}