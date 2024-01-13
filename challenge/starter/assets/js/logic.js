const startButton = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const questionsContainer = document.getElementById("questions");
const questionsTitle = document.getElementById("question-title");
const choicesDiv = document.getElementById("choices");

//removes the start-screen when the start quiz button is clicked and shows questions
function startQuiz() {
    startScreen.classList.add("hide");
    questionsContainer.classList.remove("hide");
    for (let i = 0; i < questions.length; i++) {
        // Create a new div for each question
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        // Set the question title
        questionDiv.innerHTML = `${questions[i].question}`;

        // Append the question div to the questions container
        questionsContainer.appendChild(questionDiv);

        for (let choice = 0; choice < questions[i].choices.length; choice++) {
            const choiceButton = document.createElement("button");
            choiceButton.setAttribute("type", "button");
            choiceButton.setAttribute("name", `question-${i}`);
            choiceButton.setAttribute("value", questions[i].choices[choice]);
            choiceButton.innerHTML = questions[i].choices[choice];

            // Add event listener to each choice button
            choiceButton.addEventListener("click", function () {
                saveAnswerToLocalStorage(`question-${i}`, this.value);
            });

            questionDiv.appendChild(choiceButton);
        }
    }
}

function saveAnswerToLocalStorage(questionKey, answer) {
    // Save the selected answer to localStorage
    localStorage.setItem(questionKey, answer);
}
startButton.addEventListener("click", startQuiz);

questionsTitle.innerHTML += 'Questions';
