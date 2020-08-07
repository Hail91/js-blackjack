"use strict";
// Need to bring in Player and Dealer.
class Dealer {
  constructor() {
    this.name = "Dealer";
    this.hand = [];
  }
  // Get total value of current hand
  handSum() {
    return this.hand
      .map((card) => {
        return card.cardValue;
      })
      .reduce((a, b) => a + b);
  }
}
class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }
  handSum() {
    return this.hand
      .map((card) => {
        return card.cardValue;
      })
      .reduce((a, b) => a + b);
  }
}
// Should initialize the deck as an array and populate with cards. (Gonna roll with Object Oriented Paradigm for this)
class Deck {
  constructor() {
    this.deck = [];
    // Suits Array
    const suits = ["spades", "clubs", "diamonds", "hearts"];
    // Values Array
    const values = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    let numDecks = 0;
    let color = "red";
    // Now need to loop over all cards for each suit and push to the deck initialized on line 6.
    while (numDecks < 6) {
      suits.forEach((suit) => {
        for (let v = 0; v < values.length; v++) {
          let cardNumValue = parseInt(values[v]);
          if (values[v] === "J" || values[v] === "Q" || values[v] === "K") {
            cardNumValue = 10;
          } else if (values[v] === "A") {
            cardNumValue = 11;
          }
          this.deck.push({
            cardSuit: suit,
            cardType: values[v],
            cardValue: cardNumValue,
            cardColor: color,
          });
        }
      });
      numDecks += 1;
      if (numDecks > 2) {
        color = "black";
      } else {
        continue;
      }
    }
  }
  // Add methods to Deck class here
  shuffle() {
    // Same as const deck = this.deck
    const { deck } = this;
    // Original position
    let original = deck.length;
    // New position
    let randomized;
    // Need a loop that counts down from original deck length to zero and performs a shuffle on each card.
    while (original) {
      randomized = Math.floor(Math.random() * original--);
      // Perform swap
      [deck[original], deck[randomized]] = [deck[randomized], deck[original]];
    }
    // Return reference to deck
    return this;
  }
  // Deal method
  deal() {
    return this.deck.pop();
  }
}

// Create Deck
const newDeck = new Deck();
// Shuffle Deck
newDeck.shuffle();
console.log(newDeck.deck);
// Initialize Player and Dealer
const dealer = new Dealer();
const player = new Player("Player");
// Create Button to reset and deal new hand
let nextHandBtn = document.createElement("button");
nextHandBtn.setAttribute("id", "next-hand");
nextHandBtn.innerHTML = "Next Hand";
nextHandBtn.addEventListener("click", reset);
let playerCont = document.getElementsByClassName("player-container")[0];
playerCont.appendChild(nextHandBtn);

// Function to stay
function stay() {
  // If player decides to stay, disable the hit/stay buttons
  document.getElementById("hit-btn").setAttribute("disabled", true);
  document.getElementById("stay-btn").setAttribute("disabled", true);
  // Then dealer should start drawing cards
  let dealerCount = dealer.handSum();
  let playerCount = player.handSum();
  // Deal will draw cards until dealer either has 17/18/19/20/21, or busts. (hand > 21)
  while (dealerCount < 17) {
    dealerHit();
    dealerCount = dealer.handSum();
  }
  if (dealerCount > playerCount && dealerCount <= 21) {
    alert("Dealer Wins!");
  } else if (playerCount > dealerCount && playerCount <= 21) {
    alert("Player Wins!");
  } else if (
    playerCount === dealerCount &&
    playerCount <= 21 &&
    dealerCount <= 21
  ) {
    alert("Push!");
  }
}

// Function to allow Dealer to take a card.
function dealerHit() {
  let handTotal = dealer.handSum();
  let nextCard = newDeck.deal();
  dealer.hand.push(nextCard);
  console.log(newDeck.deck.length);
  handTotal += nextCard.cardValue;
  // Re-render new hand
  document.getElementById("dealer-cards").innerHTML = dealer.hand
    .map((card) => {
      return "<div>" + card.cardType + "</div>";
    })
    .join("");
  // Conditional logic to take a card (this function will be called if user presses the 'hit' button on the UI)
  if (handTotal > 21) {
    document.getElementById("dealer-message").innerHTML = "Bust! Player wins!";
    document.getElementById(
      "dealer-count"
    ).innerHTML = `Dealer card count is now ${handTotal}`;
  } else {
    document.getElementById(
      "dealer-count"
    ).innerHTML = `Dealer card count is now ${handTotal}`;
  }
}

// Function to allow user to hit, taking another card.
function playerHit() {
  let handTotal = player.handSum();
  let nextCard = newDeck.deal();
  player.hand.push(nextCard);
  console.log(newDeck.deck.length);
  handTotal += nextCard.cardValue;
  // Re-render new hand
  document.getElementById("player-cards").innerHTML = player.hand
    .map((card) => {
      let color = card.cardColor;
      return `<div style='color: ${color}'>` + card.cardType + `</div>`;
    })
    .join("");
  // Conditional logic to take a card (this function will be called if user presses the 'hit' button on the UI)
  if (handTotal > 21) {
    document.getElementById("player-message").innerHTML = "Bust! Dealer wins!";
    document.getElementById(
      "player-count"
    ).innerHTML = `Your card count is now ${handTotal}`;
  } else {
    document.getElementById("player-message").innerHTML = "Make your next move";
    document.getElementById(
      "player-count"
    ).innerHTML = `Your card count is now ${handTotal}`;
  }
}

// Reset function if hand has a conclusion
function reset() {
  document.getElementById("hit-btn").removeAttribute("disabled");
  document.getElementById("stay-btn").removeAttribute("disabled");
  document.getElementById("dealer-message").innerHTML = "";

  // Reset player/dealer hands
  player.hand.length = 0;
  dealer.hand.length = 0;
  // Draw two new cards for both
  while (player.hand.length < 2 && dealer.hand.length < 2) {
    if (player.hand.length < 2) {
      player.hand.push(newDeck.deal());
      document.getElementById("player-cards").innerHTML = player.hand
        .map((card) => {
          let color = card.cardColor;
          return `<div style='color: ${color}'>` + card.cardType + `</div>`;
        })
        .join("");
    }
    if (dealer.hand.length < 2) {
      dealer.hand.push(newDeck.deal());
      document.getElementById("dealer-cards").innerHTML = dealer.hand
        .map((card) => {
          let color = card.cardColor;
          return `<div style='color: ${color}'>` + card.cardType + `</div>`;
        })
        .join("");
    }
  }
  // Get hand count for both and render
  let dealerCount = dealer.handSum();
  let playerCount = player.handSum();

  document.getElementById(
    "dealer-count"
  ).innerHTML = `Dealer count is ${dealerCount}`;
  document.getElementById(
    "player-count"
  ).innerHTML = `Your card count is currently ${playerCount}`;
  document.getElementById("player-message").innerHTML = "";
  // Check if User has blackjack
  if (playerCount === 21) {
    document.getElementById("player-message").innerHTML =
      "Blackjack! Player wins!";
  }
  if (dealerCount === 21) {
    document.getElementById("dealer-message").innerHTML =
      "Blackjack! Dealer wins!";
  }
}

// Function to initialize game
function gameStart() {
  // Set Dealer and Player names on screen
  document.getElementById("dealer-name").innerHTML = dealer.name;
  document.getElementById("player-name").innerHTML = player.name;

  // Deal cards to dealer and player (Player gets 1, then dealer, then player until both have 2 cards)
  while (player.hand.length < 2 && dealer.hand.length < 2) {
    if (player.hand.length < 2) {
      player.hand.push(newDeck.deal());
      document.getElementById("player-cards").innerHTML = player.hand
        .map((card, i) => {
          let color = card.cardColor;
          return `<div style='color: ${color}'>` + card.cardType + `</div>`;
        })
        .join("");
    }
    if (dealer.hand.length < 2) {
      dealer.hand.push(newDeck.deal());
      document.getElementById("dealer-cards").innerHTML = dealer.hand
        .map((card) => {
          let color = card.cardColor;
          return `<div style='color: ${color}'>` + card.cardType + `</div>`;
        })
        .join("");
    }
  }
  // Get starting hand count for dealer & player.
  let dealerCount = dealer.handSum();
  let playerCount = player.handSum();

  document.getElementById(
    "dealer-count"
  ).innerHTML = `Dealer count is ${dealerCount}`;
  document.getElementById(
    "player-count"
  ).innerHTML = `Your card count is currently ${playerCount}`;
  // Check if Dealer has blackjack
  if (dealerCount === 21 && playerCount !== 21) {
    document.getElementById("dealer-message").innerHTML =
      "Blackjack! Dealer wins!";
    document.getElementById("hit-btn").setAttribute("disabled", true);
    document.getElementById("stay-btn").setAttribute("disabled", true);
  }
  // Check if User has blackjack
  if (playerCount === 21 && dealerCount !== 21) {
    document.getElementById("player-message").innerHTML =
      "Blackjack! Player wins!";
    document.getElementById("hit-btn").setAttribute("disabled", true);
    document.getElementById("stay-btn").setAttribute("disabled", true);
  }
}
