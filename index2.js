const cardsContainer = document.getElementById("cards");
const newGameButton = document.getElementById("newGame");
const popup = document.getElementById("popup");
const popup1 = document.getElementById("popup1");
const result = document.getElementById("result");
const closePopup = document.getElementById("closePopup");
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
const ranks = [
"2", "3", "4", "5", "6", "7",
"8", "9", "10",
"jack", "queen", "king", "ace"
];
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
const imagePath =
`./PNG-cards/${card.rank}_of_${card.suit}.png`;
// =========================
// HTML КАРТИ
// =========================
cardElement.innerHTML = `
<div class="card-inner">
<div class="card-back">
<img
src="./PNG-cards/card_back_red.png"
alt="Card back"
>
</div>
<div
class="card-front"
style="background-image: url('${imagePath}')"
>
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
const counts =
Object.values(rankCounts)
.sort((a, b) => b - a);
// Каре
if (counts[0] === 4) {
return "FOUR OF A KIND!";
}
// Фул-хаус
if (counts[0] === 3 && counts[1] === 2) {
return "FULL HOUSE!";
}
// Трійка
if (counts[0] === 3) {
return "THREE OF A KIND";
}
// Дві пари
if (counts[0] === 2 && counts[1] === 2) {
return "TWO PAIR";
}
// Пара
if (counts[0] === 2) {
return {
    
    "text": "PAIR",
    "popup": "popup-content"
};
}
// Нічого
return {
    
    "text": "HIGH CARD",
    "popup1": "popup-content1"
};
}

// =========================
// ПОКАЗУЄМО POPUP
// =========================
function showPopup(data) {
result.textContent = data.text;
popup.classList.remove("hidden");
popup1.classList.remove("hidden");

document
getElementById (data.popup);
getElementById (data.popup1);
popup.classList.remove ("hidden");
popup1.classList.remove ("hidden");
}
// =========================
// ЗАКРИВАЄМО POPUP
// =========================
closePopup.addEventListener("click", () => {
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