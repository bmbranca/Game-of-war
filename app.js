let deckId;
let computerScore = 0;
let myScore = 0;
const cardsContainer = document.getElementById("cards");
const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-cards");
const header = document.getElementById("header");
const remainingText = document.getElementById("remaining");
const computerScoreEl = document.getElementById("computer-score");
const myScoreEl = document.getElementById("my-score");

async function handleClick() {
  const response = await fetch(
    "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
  );
  const data = await response.json();
  remainingText.textContent = `Remaining cards: ${data.remaining}`;
  deckId = data.deck_id;
  console.log(deckId);
}

newDeckBtn.addEventListener("click", handleClick);

drawCardBtn.addEventListener("click", async () => {
  const response = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
  );
  const data = await response.json();
  remainingText.textContent = `Remaining cards: ${data.remaining}`;
  cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `;
  cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `;
  const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
  header.textContent = winnerText;

  if (data.remaining === 0) {
    drawCardBtn.disabled = true;
  }

  if (computerScore > myScore && data.remaining === 0) {
    header.textContent = "Computer is the winner";
  } else if (computerScore < myScore && data.remaining === 0) {
    header.textContent = "You are the winner!";
  }
});

function determineCardWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);

  if (card1ValueIndex > card2ValueIndex) {
    computerScore++;
    computerScoreEl.textContent = `Computer Score: ${computerScore}`;
    return "Card 1 wins!";
  } else if (card1ValueIndex < card2ValueIndex) {
    myScore++;
    myScoreEl.textContent = `Your Score: ${myScore}`;
    return "Card 2 wins!";
  } else {
    return "War!";
  }
}
