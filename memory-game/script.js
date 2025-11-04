// Патеките до 6 слики
const images = [
  "images/rapunzel.jpg",
  "images/cinderella.jpg",
  "images/mulan.jpg",
  "images/elsa.jpg",
  "images/tiana.jpg",
  "images/belle.jpg"
];

const boardEl = document.getElementById("board");
const attemptsEl = document.getElementById("attempts");
const foundEl = document.getElementById("found");
const messageEl = document.getElementById("message");
const restartBtn = document.getElementById("restart");

let deck = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;
let found = 0;

function init() {
  // Две карти за секоја слика
  deck = images.concat(images).map((img, i) => ({
    id: i,
    src: img,
    matched: false,
  }));

  shuffle(deck);
  renderBoard();
  attempts = 0;
  found = 0;
  attemptsEl.textContent = attempts;
  foundEl.textContent = found;
  messageEl.textContent = "";
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function renderBoard() {
  boardEl.innerHTML = "";
  deck.forEach((cardObj, idx) => {
    const card = document.createElement("button");
    card.className = "card";
    card.dataset.index = idx;
    card.dataset.src = cardObj.src;

    const front = document.createElement("div");
    front.className = "card-face front";
    front.textContent = "❓";

    const back = document.createElement("div");
    back.className = "card-face back";

    const img = document.createElement("img");
    img.src = cardObj.src;
    back.appendChild(img);

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener("click", onCardClick);

    if (cardObj.matched) {
      card.classList.add("locked", "flip");
    }

    boardEl.appendChild(card);
  });
}

function onCardClick(e) {
  if (lockBoard) return;
  const clicked = e.currentTarget;
  const idx = Number(clicked.dataset.index);
  const cardObj = deck[idx];

  if (cardObj.matched || clicked === firstCard) return;

  clicked.classList.add("flip");

  if (!firstCard) {
    firstCard = clicked;
    return;
  }

  secondCard = clicked;
  attempts++;
  attemptsEl.textContent = attempts;

  const img1 = firstCard.dataset.src;
  const img2 = secondCard.dataset.src;

  if (img1 === img2) {
    const i1 = Number(firstCard.dataset.index);
    const i2 = Number(secondCard.dataset.index);
    deck[i1].matched = true;
    deck[i2].matched = true;
    firstCard.classList.add("locked");
    secondCard.classList.add("locked");
    found++;
    foundEl.textContent = found;
    resetSelection();
    checkWin();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetSelection();
      lockBoard = false;
    }, 1000);
  }
}

function resetSelection() {
  firstCard = null;
  secondCard = null;
}

function checkWin() {
  if (found === images.length) {
    messageEl.textContent = `Браво! Ги најде сите парови за ${attempts} обиди.`;
  }
}

restartBtn.addEventListener("click", init);

// Почеток
init();
