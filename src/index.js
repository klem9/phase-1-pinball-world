games = [];

document.addEventListener("DOMContentLoaded",(e)=>{
    fetch("http://localhost:3000/games")
    .then(resp => resp.json())
    .then(data => {
        games = data;
        //load first one 
        populateGames(games)
        createGameCard(games[0])
        highscoreFormSetup()
    })
})

function populateGames(games){
    gameListContainer = document.querySelector(".game-list")
    games.forEach((game) => {
        let title = document.createElement("h4")
        title.textContent = `${game.name} (${game.manufacturer_name})`
        gameListContainer.appendChild(title)
// Understand why this belongs here (later)
        title.addEventListener("click",()=>{
            createGameCard(game)
        })
    });
    
}
function createGameCard(game){
    currentGame = game; 

    imageSlot = document.querySelector("#detail-image")
    nameSlot = document.querySelector("h2")
    highScore = document.querySelector("h3")

    imageSlot.src = game.image
    nameSlot.textContent = game.name
    highScore.textContent = `High Score: ${game.high_score}`

}

function highscoreFormSetup(){
    highscoreForm = document.querySelector("#high-score-form")
    highscoreFormInput = document.querySelector("#score-input")
    highscoreForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        newScore = highscoreFormInput.value
        currentGame.high_score = newScore
        highScore.textContent = `High Score: ${currentGame.high_score}`
        e.target.reset()
    })
}