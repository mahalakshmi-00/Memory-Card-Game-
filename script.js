const emojis = ["🍕", "🎸", "🚀", "🎮", "🐶", "🍔", "🎲", "🏀"];
let cardsArray = [...emojis, ...emojis];
cardsArray = cardsArray.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById("gameBoard");
const attemptsDisplay = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");

let flippedCards = [];
let matchedCards = [];
let attempts = 0;

// Create the game board
function createBoard() {
    gameBoard.innerHTML = "";
    cardsArray.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip card logic
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped") && !matchedCards.includes(this)) {
        this.textContent = this.dataset.emoji;
        this.classList.add("flipped");
        flippedCards.push(this);
        
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 700);
        }
    }
}

// Check for a match
function checkMatch() {
    attempts++;
    attemptsDisplay.textContent = attempts;
    
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        matchedCards.push(card1, card2);
        card1.removeEventListener("click", flipCard);
        card2.removeEventListener("click", flipCard);
    } else {
        card1.textContent = "";
        card2.textContent = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
    }

    flippedCards = [];

    if (matchedCards.length === cardsArray.length) {
        setTimeout(() => alert("🎉 Congratulations! You won!"), 500);
    }
}

// Restart the game
restartBtn.addEventListener("click", () => {
    attempts = 0;
    attemptsDisplay.textContent = 0;
    flippedCards = [];
    matchedCards = [];
    cardsArray.sort(() => 0.5 - Math.random());
    createBoard();
});

// Initialize game
createBoard();
