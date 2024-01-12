const startButton = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
startButton.addEventListener("click", startQuiz);

function startQuiz() {
    startScreen.classList.add("hide");
    // questionsContainer.classList.remove("hide");
  }
