const game = document.getElementById("game");
const popup = document.getElementById("popup"); const result = document.getElementById("result"); const description = document.getElementById("description");
const playAgain = document.getElementById("playAgain");
/* Колода */
const suits = [ { symbol: "♠", name: "spades" }, { symbol: "♥", name: "hearts" }, { symbol: "♦", name: "diamonds" }, { symbol: "♣", name: "clubs" } ];
const ranks = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A" ];
/* Створюємо всю колоду */
function createDeck() {

const deck = [];

for (const suit of suits) {

    for (let i = 0; i < ranks.length; i++) {

        deck.push({
            rank: ranks[i],
            value: i + 2,
            suit: suit.symbol
        });

    }
}

return deck;
}
/* Перемішування */
function shuffle(deck) {

for (let i = deck.length - 1; i > 0; i--) {

    const random = Math.floor(Math.random() * (i + 1));

    [deck[i], deck[random]] =
        [deck[random], deck[i]];
}

return deck;
}
/* Створюємо 5 карт */
function startGame() {

game.innerHTML = "";

popup.classList.add("hidden");

let deck = createDeck();

deck = shuffle(deck);

const cards = deck.slice(0, 5);

cards.forEach(card => {

    const cardElement = document.createElement("div");

    cardElement.classList.add("card");

    cardElement.innerHTML = `
        <div class="card-inner">

            <div class="card-front">
            </div>

            <div class="card-back">

                <div class="card-value">
                    ${card.rank}
                </div>

                <div class="card-suit">
                    ${card.suit}
                </div>

            </div>

        </div>
    `;

    cardElement.addEventListener("click", () => {

        cardElement.classList.toggle("flipped");

        checkAllCards();

    });

    game.appendChild(cardElement);

});
}
/* Перевіряємо, чи всі карти відкриті */
function checkAllCards() {

const cards = document.querySelectorAll(".card");

const flippedCards =
    document.querySelectorAll(".card.flipped");

if (flippedCards.length === cards.length) {

    setTimeout(() => {

        showResult();

    }, 700);

}
}
/* Визначаємо комбінацію */
function showResult() {

const cards =
    [...document.querySelectorAll(".card-back")];

const values = cards.map(card => {

    return parseInt(
        card.querySelector(".card-value").textContent
    );

});


/* Однакові значення */

const counts = {};

values.forEach(value => {

    counts[value] = (counts[value] || 0) + 1;

});


const numbers = Object.values(counts);


let combination = "Старша карта";


if (numbers.includes(4)) {

    combination = "Каре";

} else if (numbers.includes(3) && numbers.includes(2)) {

    combination = "Фул-хаус";

} else if (numbers.includes(3)) {

    combination = "Трійка";

} else if (numbers.filter(n => n === 2).length === 2) {

    combination = "Дві пари";

} else if (numbers.includes(2)) {

    combination = "Пара";

}


/* Показуємо попап */

result.textContent = combination;

description.textContent =
    "Вітаємо! Твоя покерна комбінація готова.";

popup.classList.remove("hidden");
}
/* Нова гра */
playAgain.addEventListener("click", () => {

startGame();
});
/* Запускаємо гру */
startGame();