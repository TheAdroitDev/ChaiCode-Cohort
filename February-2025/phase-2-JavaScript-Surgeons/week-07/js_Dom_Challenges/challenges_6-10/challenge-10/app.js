
const gameContainer = document.querySelector(".game-container");
const moves = document.querySelector("#moves");
const time = document.querySelector("#time")

let firstCard = null;
let secondCard = null;
let boardFilled = false;
let numberOfMoves = 0;
let winnerMoves = 0;

let totalCards = new Array(16).fill(0);
const cardValues = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
const cardValuesCopy = [...cardValues, ...cardValues];
shuffleCards();
generateCards();

function shuffleCards() {
  cardValuesCopy.sort(() => Math.random() - 0.5);  // yeh 50-50 chance dega usko swap krne ke liye

}

function generateCards() {
  for (let card of cardValuesCopy) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    const cardFrontELement = document.createElement("div");
    const cardBackELement = document.createElement("div");

    cardFrontELement.innerText = "?";
    cardFrontELement.classList.add("card-front")
    cardBackELement.innerText = card;
    cardBackELement.classList.add("card-back")


    cardElement.appendChild(cardFrontELement);
    cardElement.appendChild(cardBackELement);
    gameContainer.appendChild(cardElement)

    cardElement.addEventListener("click", flipCard)

  }

}


function flipCard() {
  // start timer
  startTimer();
  if (boardFilled) return;
  if (this === firstCard) return;
  this.classList.add("flipped");
  if (!firstCard) {
    firstCard = this;
    //console.log(firstCard)
    return;
  }
  secondCard = this;
  //console.log(secondCard)
  numberOfMoves++;
  moves.innerText = numberOfMoves;
  boardFilled = true;
  checkForMatch();


}
let interval;

function startTimer() {
  if (interval !== undefined) return;
  let seconds = 0;
  let minutes = 0;
  interval = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    time.innerText = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`
  }, 1000)

}

function checkForMatch() {
  if (firstCard.children[1].innerText !== secondCard.children[1].innerText) {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 500)
  } else {
    winnerMoves++;
    if (winnerMoves === 8) {
      setTimeout(() => {
        alert(`Congratulations🔥 You won the game with ${moves.innerText} moves and ${time.innerText} taken`);
        restartGame();
      }, 300);
    }
    resetBoard();
  }
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  boardFilled = false;
}

function restartGame() {
  clearInterval(interval);
  interval = undefined;
  time.innerText = "00:00";
  moves.innerText = "0";
  numberOfMoves = 0;
  boardFilled = false;
  firstCard = null;
  secondCard = null;
  gameContainer.innerHTML = "";
  shuffleCards();
  generateCards();
}