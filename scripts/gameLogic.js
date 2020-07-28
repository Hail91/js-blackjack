"use strict";
// Need to bring in Player and Dealer.
class Dealer {
  constructor() {
    this.name = "Dealer";
    this.hand = [];
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
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
          });
        }
      });
      numDecks += 1;
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

// Function to allow user to hit, taking another card.
function hit(card, player) {
  let nextCard = card;
  let currentPlayer = player;
  let handTotal =
    currentPlayer.hand[0].cardValue + currentPlayer.hand[1].cardValue;

  currentPlayer.hand.push(nextCard);
  handTotal += nextCard.cardValue;

  // Conditional logic to take a card (this function will be called if user presses the 'hit' button on the UI)
  if (handTotal > 21) {
    console.log("Bust!");
    // Some kind of reset function to get ready for next hand
  } else {
    console.log(handTotal);
  }
}

// Function to initialize game
function gameStart() {
  // Create Deck
  const newDeck = new Deck();
  // Shuffle Deck
  newDeck.shuffle();
  // Initialize Player and Dealer
  const dealer = new Dealer();
  const player = new Player("Player");

  // Set Dealer and Player names on screen
  document.getElementById("dealer-name").innerHTML = dealer.name;
  document.getElementById("player-name").innerHTML = player.name;

  // Deal cards to dealer and player (Player gets 1, then dealer, then player until both have 2 cards)
  while (player.hand.length < 2 && dealer.hand.length < 2) {
    if (player.hand.length < 2) {
      player.hand.push(newDeck.deal());
      document.getElementById("player-cards").innerHTML = player.hand
        .map((card) => {
          return "<div>" + card.cardType + "</div>";
        })
        .join("");
    }
    if (dealer.hand.length < 2) {
      dealer.hand.push(newDeck.deal());
      document.getElementById("dealer-cards").innerHTML = dealer.hand
        .map((card) => {
          return "<div>" + card.cardType + "</div>";
        })
        .join("");
    }
  }
  // Get starting hand count for dealer & player.
  let dealerCount = dealer.hand.reduce((a, b) => a.cardValue + b.cardValue);
  let playerCount = player.hand.reduce((a, b) => a.cardValue + b.cardValue);

  document.getElementById(
    "dealer-count"
  ).innerHTML = `Dealer count is ${dealerCount}`;
  document.getElementById(
    "player-count"
  ).innerHTML = `Your card count is currently ${playerCount}`;
}
