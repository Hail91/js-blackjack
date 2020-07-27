"use strict";
// Need to bring in Player and Dealer.
const Dealer = require("./dealer");
const Player = require("./player");
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
  let handTotal = currentPlayer.hand.reduce((a, b) => a + b);

  currentPlayer.hand.push(nextCard);
  handTotal += nextCard.cardValue;

  // Conditional logic to take a card (this function will be called if user presses the 'hit' button on the UI)
  if (handTotal > 21) {
    console.log("Bust!");
    // Some kind of reset function to get ready for next hand
  } else {
    console.log("What is your next move?");
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
  const player = new Player("Aaron");

  // Set current player to a variable
  let currentPlayer = player;

  // Deal cards to dealer and player (Player gets 1, then dealer, then player until both have 2 cards)
  while (player.hand.length < 2 && dealer.hand.length < 2) {
    if (player.hand.length < 2) {
      player.hand.push(newDeck.deal());
    }
    if (dealer.hand.length < 2) {
      dealer.hand.push(newDeck.deal());
    }
  }
}

module.exports = Deck;
