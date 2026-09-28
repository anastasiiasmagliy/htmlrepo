const cardsContainer = document.getElementById("cards");
const newGameButton = document.getElementById("newGame");

const popup = document.getElementById("popup");
const result = document.getElementById("result");
const closePopup = document.getElementById("closePopup");


const suits = ["♥", "♦", "♣", "♠"];

const ranks = [
    "2", "3", "4", "5", "6", "7",
    "8", "9", "10", "J", "Q", "K", "A"
];


let selectedCards = [];

const cards = [

"./PNG-cards/2_of_clubs.png",
"./PNG-cards/2_of_diamonds.png",
"./PNG-cards/2_of_hearts.png",
"./PNG-cards/2_of_spades.png",
"./PNG-cards/3_of_clubs.png", 
"./PNG-cards/3_of_diamonds.png",
"./PNG-cards/3_of_hearts.png",
"./PNG-cards/3_of_spades.png",
"./PNG-cards/4_of_clubs.png",
"./PNG-cards/4_of_diamonds.png",
"./PNG-cards/4_of_hearts.png",
"./PNG-cards/4_of_spades.png",
"./PNG-cards/5_of_clubs.png",
"./PNG-cards/5_of_diamonds.png",
"./PNG-cards/5_of_hearts.png",
"./PNG-cards/5_of_spades.png",
"./PNG-cards/6_of_clubs.png",
"./PNG-cards/6_of_diamonds.png",
"./PNG-cards/6_of_hearts.png",
"./PNG-cards/6_of_spades.png",
"./PNG-cards/7_of_clubs.png",
"./PNG-cards/7_of_diamonds.png",
"./PNG-cards/7_of_hearts.png",
"./PNG-cards/7_of_spades.png",
"./PNG-cards/8_of_clubs.png",
"./PNG-cards/8_of_diamonds.png",
"./PNG-cards/8_of_hearts.png",
"./PNG-cards/8_of_spades.png",
"./PNG-cards/9_of_clubs.png",
"./PNG-cards/9_of_diamonds.png",
"./PNG-cards/9_of_hearts.png",
"./PNG-cards/9_of_spades.png",
"./PNG-cards/10_of_clubs.png",
"./PNG-cards/10_of_diamonds.png",
"./PNG-cards/10_of_hearts.png",
"./PNG-cards/10_of_spades.png",
"./PNG-cards/ace_of_clubs.png",
"./PNG-cards/ace_of_diamonds.png",
"./PNG-cards/ace_of_hearts.png",
"./PNG-cards/ace_of_spades.png",
"./PNG-cards/jack_of_clubs.png",
"./PNG-cards/jack_of_diamonds.png",
"./PNG-cards/jack_of_hearts.png",
"./PNG-cards/jack_of_spades.png",
"./PNG-cards/king_of_clubs.png",
"./PNG-cards/king_of_diamonds.png",
"./PNG-cards/king_of_hearts.png",
"./PNG-cards/king_of_spades.png",
"./PNG-cards/queen_of_clubs.png",
"./PNG-cards/queen_of_diamonds.png",
"./PNG-cards/queen_of_hearts.png",
"./PNG-cards/queen_of_spades.png"
];

const cardFronts = document.querySelectorAll(".card-front");

cardFronts.forEach((card, index) => { card.style.backgroundImage = url("${cards[index]}"); });


// Створюємо колоду
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


// Перемішуємо колоду
function shuffle(deck) {

    return deck.sort(() => Math.random() - 0.5);

}


// Створюємо гру
function startGame() {

    cardsContainer.innerHTML = "";

    selectedCards = [];

    const deck = shuffle(createDeck());

    // Беремо перші 5 карт
    const fiveCards = deck.slice(0, 5);

    fiveCards.forEach((card, index) => {

        const cardElement = document.createElement("div");

        cardElement.classList.add("card");

        cardElement.innerHTML = `
            <div class="card-inner">

                <div class="card-back">
                <img src="./PNG-cards/card_back_red.png" alt="вапрорп">
                </div>

                <div class="card-front">
                                <img src="./PNG-cards/king_of_hearts.png" alt="вапрорп">
                    ${card.rank}${card.suit}
                </div>

            </div>
        `;

        cardElement.addEventListener("click", () => {

            // Не дозволяємо натиснути повторно
            if (cardElement.classList.contains("flipped")) {
                return;
            }

            cardElement.classList.add("flipped");

            selectedCards.push(card);

            // Коли відкриті всі карти
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


// Визначаємо комбінацію
function checkCombination(cards) {

    const rankCounts = {};

    cards.forEach(card => {

        rankCounts[card.rank] =
            (rankCounts[card.rank] || 0) + 1;

    });


    const counts = Object.values(rankCounts).sort((a, b) => b - a);


    // Каре
    if (counts[0] === 4) {
        return "🔥 FOUR OF A KIND!";
    }


    // Фул-хаус
    if (counts[0] === 3 && counts[1] === 2) {
        return "🎉 FULL HOUSE!";
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
        return "PAIR";
    }


    return "HIGH CARD";
}


// Показуємо popup
function showPopup(message) {

    result.textContent = message;

    popup.classList.remove("hidden");

}


// Закриваємо popup
closePopup.addEventListener("click", () => {

    popup.classList.add("hidden");

});


// Нова гра
newGameButton.addEventListener("click", () => {

    popup.classList.add("hidden");

    startGame();

});


// Запускаємо гру при відкритті сторінки
startGame();