const startButton = document.getElementById('startButton');
const welcomeScreen = document.getElementById('welcomeScreen');
const memoryGame = document.querySelector('.memory-game');
const restartButton = document.getElementById('restartButton');

startButton.addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    memoryGame.style.display = 'flex'; // Show the memory game
    restartButton.style.display = 'inline-block'; // Show the restart button
});


const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
    if (this === firstCard) return;

  this.classList.toggle("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  secondCard = this;

  checkMatch();
}

function checkMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    firstCard.classList.add('matched'); // Add matched class
    secondCard.classList.add('matched'); // Add matched class
    incrementMatchedPairs(); // Increment matched pairs
    resetBoard();
  }
  
  

function unFlipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

let matchedPairs = 0;
const totalPairs = cards.length / 2;

function checkWin() {
  if (matchedPairs === totalPairs) {
    alert("Congratulations! You've won the game!");
    showScore(); // Show the score screen when the game is won
  }
}

function incrementMatchedPairs() {
  matchedPairs++;
  document.getElementById('score').textContent = matchedPairs; // Update the score
  checkWin();
}

function showScore() {
  const welcomeScreen = document.getElementById('welcomeScreen');
  const scoreScreen = document.getElementById('scoreScreen');

  welcomeScreen.style.display = 'none';
  scoreScreen.style.display = 'block';
}



restartButton.addEventListener('click', () => {
  // Reset all cards to initial state
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  // Reset matched pairs
  matchedPairs = 0;

  // Shuffle cards
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * totalPairs) + 1;
    card.style.order = randomPos;
  });
});


(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));

