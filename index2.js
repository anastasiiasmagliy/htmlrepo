const cardsContainer = document.getElementById("cards");
const newGameButton = document.getElementById("newGame");
const popup = document.getElementById("popup");
const popup1 = document.getElementById("popup1");
const result = document.getElementById("result");
const closePopup = document.getElementById("closePopup");
const closePopup1 = document.getElementById("closePopup1");
// =========================
// МАСТІ
// =========================
const suits = [
"hearts",
"diamonds",
"clubs",
"spades"
];
// =========================
// ЗНАЧЕННЯ КАРТ
// =========================
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
let selectedCards = [];
// =========================
// СТВОРЮЄМО КОЛОДУ
// =========================
function createDeck() {
const deck = [];
for (let suit of suits) {
for (let rank of ranks) {
deck.push({
suit: suit,
rank: rank
});
}
}
return deck;
}
// =========================
// ПЕРЕМІШУЄМО КОЛОДУ
// =========================
function shuffle(deck) {
return deck.sort(() => Math.random() - 0.5);
}
// =========================
// СТВОРЮЄМО ГРУ
// =========================
function startGame() {
cardsContainer.innerHTML = "";
selectedCards = [];
const deck = shuffle(createDeck());

// Беремо перші 5 карт

const fiveCards = deck.slice(0, 5);
fiveCards.forEach((card) => {
// Створюємо карту
const cardElement = document.createElement("div");
cardElement.classList.add("card");

// =========================
// ШЛЯХ ДО КАРТИНКИ
// =========================

const imagePath = `./PNG-cards/${card.rank}_of_${card.suit}.png`;

// =========================
// HTML КАРТИ
// =========================

cardElement.innerHTML = `
<div class="card-inner">
<div class="card-back">
<img src="./PNG-cards/card_back_red.png" alt="Card back">
</div>
<div class="card-front" style="background-image: url('${imagePath}')">
</div>
</div>
`;
// =========================
// НАТИСКАННЯ НА КАРТУ
// =========================
cardElement.addEventListener("click", () => {
// Не дозволяємо натискати повторно
if (cardElement.classList.contains("flipped")) {
return;
}
// Перевертаємо карту
cardElement.classList.add("flipped");
// Додаємо карту до вибраних
selectedCards.push(card);
console.log("Відкрита карта:", card);
console.log("Всі вибрані карти:", selectedCards);
// =========================
// ЯКЩО ВІДКРИТО 5 КАРТ
// =========================
if (selectedCards.length === 5) {
setTimeout(() => {

const combination = checkCombination(selectedCards);
showPopup(combination);
}, 700);
}
});

cardsContainer.appendChild(cardElement);
});
}

// =========================
// ВИЗНАЧАЄМО КОМБІНАЦІЮ
// =========================
function checkCombination(cards) {
const rankCounts = {};
cards.forEach(card => {
rankCounts[card.rank] =
(rankCounts[card.rank] || 0) + 1;
});
const counts = Object.values(rankCounts)
.sort((a, b) => b - a);

// Каре

if (counts[0] === 4) {
return {
    text: "four of a kind",
     "popup1": "popup-content1"
};}
// Фул-хаус
if (counts[0] === 3 && counts[1] === 2) {
return {
    text: "Full house",
     "popup1": "popup-content1"
};}
// Трійка
if (counts[0] === 3) {
return {
    text: "Three of a kind",
     "popup1": "popup-content1"
};}
// Дві пари
if (counts[0] === 2 && counts[1] === 2) {
return {
    
     text: "TWO PAIRS",
     "popup1": "popup-content1"

};
}

// Пара
if (counts[0] === 2) {
return {
    
    text: "PAIR",
    "popup1": "popup-content1"
};
}
// Нічого
return {
    
    text: "HIGH CARD",
    "popup": "popup-content"
};
}

// =========================
// ПОКАЗУЄМО POPUP
// =========================
function showPopup(data) { 
    result.textContent = data.text;

// Спочатку ховаємо все
popup.classList.add("hidden");
popup1.classList.add("hidden");

document.querySelectorAll(".popup-content, .popup-content1")
    .forEach(element => {
        element.classList.add("hidden");
    });

// Показуємо потрібний popup

if (selectedPopup) {
    selectedPopup.classList.remove("hidden");
}

// Показуємо потрібний overlay
if (data.popup === "popup-content") {
    popup.classList.remove("hidden");
}

if (data.popup === "popup-content1") {
    popup1.classList.remove("hidden");
}
}


// =========================
// ЗАКРИВАЄМО POPUP
// =========================

closePopup.addEventListener("click", () => {
popup.classList.add("hidden");
popup1.classList.add("hidden");

});

closePopup1.addEventListener("click", () => {
popup.classList.add("hidden");
popup1.classList.add("hidden");
});

// =========================
// НОВА ГРА
// =========================

newGameButton.addEventListener("click", () => {
popup.classList.add("hidden");
popup1.classList.add("hidden");

startGame();
});
// =========================
// ЗАПУСК ГРИ
// =========================
startGame();