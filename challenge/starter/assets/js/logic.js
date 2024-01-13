const startButton = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const questionsContainer = document.getElementById("questions");
const questionsTitle = document.getElementById("question-title");
const feedbackContainer = document.getElementById("feedback");

let currentQuestionIndex = 0; // Keep track of the current question index
let timer;
let timeLeft = 40;
let userScore = 0; // Initialize user's score

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
    questionDiv.innerHTML = `<h2>${questions[index].question}</h2><hr><br>`;

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
            localStorage.setItem(`question ${index}`, questions[index].choices[choice]);
            var userAnswer = questions[index].choices[choice];
            var actualAnswer = questions[index].answer;
            feedbackContainer.classList.remove("hide");
            
            // Short-hand if statement
            feedbackContainer.innerHTML = userAnswer === actualAnswer ? "<h2>Correct!</h2>" : "<h2>Incorrect!</h2>";

            // Update the user's score based on the correctness of the answer
            if (userAnswer === actualAnswer) {
                userScore += 5; // Each correct answer is worth 5 points
            }

            // Hide the message after 1 second
            setTimeout(function () {
                feedbackContainer.classList.add("hide");
            }, 1000);

            // Move to the next question after the user answers
            currentQuestionIndex++;

            // Display the next question if available
            if (currentQuestionIndex < questions.length) {
                displayQuestion(currentQuestionIndex);
            } else {
                // End of the quiz
                endQuiz();
            }
        });

        choicesDiv.appendChild(choiceButton);
    }

    // Append choices to the question div
    questionDiv.appendChild(choicesDiv);
}

// Function to display the end screen with the user's score
function displayEndScreen() {
    questionsContainer.innerHTML = `<h2>Your all done!</h2><p>Your final score is: ${userScore} points</p>`;
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timer); // Stop the timer
    localStorage.setItem("userScore", userScore); // Save the user's score in localStorage
    displayEndScreen();
}

startButton.addEventListener("click", startQuiz);
