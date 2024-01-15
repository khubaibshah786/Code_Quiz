// Get the element with the id clear, in this case the button
const clearScores = document.getElementById("clear")

// Retrieve data from local storage
const savedData = JSON.parse(localStorage.getItem("highscores")) || [];

// Access the highscores list element
const highscoresList = document.getElementById("highscores");

// Clear the existing content
highscoresList.innerHTML = "";

// Iterate over the saved data and append to the list
savedData.forEach(({ initials, userScore }) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${initials}: ${userScore} points`;
    highscoresList.appendChild(listItem);
});
//  Remove the LocalStorage once clear highscores button is clicked
clearScores.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
})