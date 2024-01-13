const startButton = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const questionsContainer = document.getElementById("questions");
const questionsTitle = document.getElementById("question-title");

let currentQuestionIndex = 0; // Keep track of the current question index

let timer;
let timeLeft = 50;
questionsTitle.innerHTML = 'Answer the question below';

// Function to update the timer display
function updateTimer() {
    document.getElementById("time").textContent = timeLeft;
}
// Function to start the timer
function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        updateTimer();

        // Check if all questions are answered
        const allQuestionsAnswered = currentQuestionIndex === questions.length;

        if (timeLeft <= 0 || allQuestionsAnswered) {
            clearInterval(timer); // Stop the timer
            endQuiz(); // Call the function to end the quiz when time is up or all questions are answered
        }
    }, 1000); // Update every 1000ms (1 second)
}


// Removes the start-screen when the start quiz button is clicked and shows questions
function startQuiz() {
    startScreen.classList.add("hide");
    questionsContainer.classList.remove("hide");

    startTimer();

    // Display the first question
    displayQuestion(0);
}

// Function to display a specific question and its choices
function displayQuestion(index) {
    // Clear existing content in the questionsContainer
    questionsContainer.innerHTML = "";

    // Create a new div for the question
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    // Set the question title
    questionDiv.innerHTML = `<h2>${questions[index].question}</h2>`;

    // Append the question div to the questions container
    questionsContainer.appendChild(questionDiv);

    // Create a div for choices
    const choicesDiv = document.createElement("div");
    choicesDiv.classList.add("choices");

    // Loop through the choices array for the current question
    for (let choice = 0; choice < questions[index].choices.length; choice++) {
        const choiceButton = document.createElement("button");
        choiceButton.setAttribute("type", "button");
        choiceButton.setAttribute("name", `question-${index}`);
        choiceButton.setAttribute("value", questions[index].choices[choice]);
        choiceButton.innerHTML = questions[index].choices[choice];

        // Add event listener to each choice button
        choiceButton.addEventListener("click", function () {
            saveAnswerToLocalStorage(`question ${index}`, this.value);
            // Move to the next question after the user answers
            currentQuestionIndex++;
            // Display the next question if available
            if (currentQuestionIndex < questions.length) {
                displayQuestion(currentQuestionIndex);
            } else {
                // End of the quiz
                questionsContainer.innerHTML = "<h2>End of the quiz.</h2>";
                // clearInterval(0); // Stop the timer
            }
        });

        choicesDiv.appendChild(choiceButton);
    }

    // Append choices to the question div
    questionDiv.appendChild(choicesDiv);
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timer); // Stop the timer
    questionsContainer.innerHTML = "<h2>End of the quiz.</h2>";
    // Additional logic to handle the end of the quiz
}


function saveAnswerToLocalStorage(questionKey, answer) {
    // Save the selected answer to localStorage
    localStorage.setItem(questionKey, answer);
}
startButton.addEventListener("click", startQuiz);
