"use strict";
// Need to bring in Player and Dealer.
class Dealer {
  constructor() {
    this.name = "dealer";
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
    this.wins = 0;
    this.losses = 0;
    this.pushes = 0;
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
    // Now need to loop over all cards for each suit and push to the deck.
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
// Initialize Player and Dealer
const dealer = new Dealer();
const player = new Player("player");
// Create Button to reset and deal new hand
let nextHandBtn = document.createElement("button");
nextHandBtn.setAttribute("id", "next-hand");
nextHandBtn.setAttribute("class", "next-hand-btn");
nextHandBtn.innerHTML = "Next Hand";
nextHandBtn.addEventListener("click", InitializeHand);
let playerCont = document.getElementsByClassName("player-container")[0];
playerCont.appendChild(nextHandBtn);

// Shorthands to access Statistcs elements
const statLosses = document.getElementById("stats-losses");
const statWins = document.getElementById("stats-wins");
const statPushes = document.getElementById("stats-pushes");
// Shorts for hit and stay buttons
const hitBtn = document.getElementById("hit-btn");
const stayBtn = document.getElementById("stay-btn");

// Function to stay
function stay() {
  // Flip first dealer card after player chooses to stay.
  dealer.hand.map((card, index) => {
    if (index === 0) {
      let cardClass = `${card.cardType.toLowerCase()}${card.cardSuit[0]}`;
      document.getElementById(
        "dealer-cards"
      ).firstChild.className = `pcard-${cardClass}`;
    }
  });
  // If player decides to stay, remove the hit/stay buttons.
  document.getElementById("hit-btn").className = "hide-btn";
  document.getElementById("stay-btn").className = "hide-btn";
  // Set card counts
  let dealerCount = dealer.handSum();
  let playerCount = player.handSum();
  // Deal will draw cards until dealer either has 17/18/19/20/21, or busts. (hand > 21)
  while (dealerCount < 17) {
    Hit("dealer");
    dealerCount = dealer.handSum();
  }
  if (dealerCount > playerCount && dealerCount <= 21) {
    statLosses.innerHTML = player.losses += 1;
    alert("Dealer Wins!");
  } else if (playerCount > dealerCount && playerCount <= 21) {
    statWins.innerHTML = player.wins += 1;
    alert("Player Wins!");
  } else if (
    playerCount === dealerCount &&
    playerCount <= 21 &&
    dealerCount <= 21
  ) {
    statPushes.innerHTML = player.pushes += 1;
    alert("Push!");
  }
}

// Function to allow Dealer to take a card.
function Hit(target) {
  // Conditional check for target
  if (target === "dealer") {
    target = dealer;
  } else {
    target = player;
  }
  let handTotal = target.handSum();
  let nextCard = newDeck.deal();

  target.hand.push(nextCard);
  handTotal += nextCard.cardValue;

  if (handTotal > 21 || target.hand.every((el) => el.cardType === "A")) {
    target.hand.map((card) => {
      if (card.cardType === "A") {
        card.cardValue = 1;
      }
    });
    handTotal = target.handSum();
  }
  target.hand.map((card, index) => {
    let cardClass = `${card.cardType.toLowerCase()}${card.cardSuit[0]}`;
    let container = document.createElement("div");
    container.classList.add(`pcard-${cardClass}`);
    if (index === target.hand.length - 1) {
      document.getElementById(`${target.name}-cards`).appendChild(container);
    }
  });
  // Conditional logic to take a card (this function will be called if user presses the 'hit' button on the UI)
  if (handTotal > 21) {
    if (handTotal > 21 && target.name === "player") {
      statLosses.innerHTML = player.losses += 1;
    } else if (handTotal > 21 && target.name === "dealer") {
      statWins.innerHTML = player.wins += 1;
    }
    document.getElementById(`${target.name}-message`).innerHTML = `Bust!`;
    document.getElementById(
      `${target.name}-count`
    ).innerHTML = `${target.name} card count is now ${handTotal}`;
    document.getElementById("hit-btn").className = "hide-btn";
    document.getElementById("stay-btn").className = "hide-btn";
  } else {
    document.getElementById(
      `${target.name}-count`
    ).innerHTML = `${target.name} card count is now ${handTotal}`;
  }
}

// Reset function if hand has a conclusion
function InitializeHand() {
  let cardClass;
  let secondClass;
  hitBtn.classList.remove("hide-btn");
  stayBtn.classList.remove("hide-btn");
  // Re-enable buttons after adding back to DOM
  hitBtn.removeAttribute("disabled");
  stayBtn.removeAttribute("disabled");
  document.getElementById("dealer-message").innerHTML = "";

  // Initialize session stats
  statWins.innerHTML = player.wins;
  statLosses.innerHTML = player.losses;
  statPushes.innerHTML = player.pushes;

  // Reset player/dealer hands
  player.hand.length = 0;
  dealer.hand.length = 0;
  // Draw two new cards for both
  while (player.hand.length < 2 && dealer.hand.length < 2) {
    if (player.hand.length < 2) {
      player.hand.push(newDeck.deal());
      document.getElementById("player-cards").innerHTML = player.hand
        .map((card) => {
          let cardClass = `${card.cardType.toLowerCase()}${card.cardSuit[0]}`;
          return `<div class='pcard-${cardClass}'>` + "" + `</div>`;
        })
        .join("");
    }
    if (dealer.hand.length < 2) {
      dealer.hand.push(newDeck.deal());
      document.getElementById("dealer-cards").innerHTML = dealer.hand
        .map((card, index) => {
          if (index === 0) {
            cardClass = `${card.cardType.toLowerCase()}${card.cardSuit[0]}`;
            return `<div class='pcard-back'>` + "" + `</div>`;
          } else {
            secondClass = `${card.cardType.toLowerCase()}${card.cardSuit[0]}`;
            return `<div class='pcard-${secondClass}'>` + "" + `</div>`;
          }
        })
        .join("");
    }
  }

  if (player.hand.every((el) => el.cardType === "A")) {
    player.hand.map((card) => {
      if (card.cardType === "A") {
        card.cardValue = 1;
      }
    });
  }
  if (dealer.hand.every((el) => el.cardType === "A")) {
    dealer.hand.map((card) => {
      if (card.cardType === "A") {
        card.cardValue = 1;
      }
    });
  }
  // Get hand count for both and render
  let dealerCount = dealer.handSum();
  let playerCount = player.handSum();

  document.getElementById("dealer-count").innerHTML = "";

  document.getElementById(
    "player-count"
  ).innerHTML = `Your card count is currently ${playerCount}`;
  document.getElementById("player-message").innerHTML = "";
  // Check if User has blackjack
  if (playerCount === 21 && dealerCount !== 21) {
    statWins.innerHTML = player.wins += 1;
    document.getElementById("player-message").innerHTML =
      "Blackjack! Player wins!";
    hitBtn.className = "hide-btn";
    stayBtn.className = "hide-btn";
  }
  // Repeat for dealer blackjack
  if (dealerCount === 21 && playerCount !== 21) {
    statLosses.innerHTML = player.losses += 1;
    document.getElementById(
      "dealer-cards"
    ).firstChild.className = `pcard-${cardClass}`;
    document.getElementById("dealer-message").innerHTML =
      "Blackjack! Dealer wins!";
    hitBtn.className = "hide-btn";
    stayBtn.className = "hide-btn";
  }
  // UI updates if both have blackjack
  if (playerCount === 21 && dealerCount === 21) {
    statPushes.innerHTML = player.pushes += 1;
    document.getElementById("player-message").innerHTML = "Push!";
    document.getElementById("dealer-message").innerHTML = "Push!";
    hitBtn.className = "hide-btn";
    stayBtn.className = "hide-btn";
  }
  document.getElementsByClassName("game-start-btn")[0].style.display = "none";
}
