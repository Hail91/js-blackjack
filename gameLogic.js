"use strict";
import Deck from "./scripts/deck.js";
import Dealer from "./scripts/dealer.js";
import Player from "./scripts/player.js";

// Initialize Deck
const newDeck = new Deck();
newDeck.shuffle();

// Initialize Player and Dealer
const dealer = new Dealer();
const player = new Player("player");

// Selectors to access Statistics elements
const statLosses = document.getElementById("stats-losses");
const statWins = document.getElementById("stats-wins");
const statPushes = document.getElementById("stats-pushes");

// Selectors for hit and stay buttons
const hitBtn = document.getElementById("hit-btn");
const stayBtn = document.getElementById("stay-btn");

// Player Selectors
const playerBet = document.getElementById("player-bet");
const playerBankroll = document.getElementById("player-bankroll");

// ** Bet logic functions **
export function makeBet(amount) {
  player.updateBet(amount);
  playerBet.innerHTML = `Bet: $${player.bet}`;
  playerBankroll.innerHTML = `Bankroll:  $${player.bankroll}`;
}

export function reset() {
  player.resetBet();
  document.getElementById("player-bet").innerHTML = `Bet: $${player.bet}`;
  document.getElementById(
    "player-bankroll"
  ).innerHTML = `Bankroll:  $${player.bankroll}`;
}

// ** CORE CARD GAME LOGIC **
export function stay() {
  // Flip first dealer card after player chooses to stay.
  dealer.hand.map((card, index) => {
    if (index === 0) {
      let cardClass = `${card.cardType.toLowerCase()}${card.cardSuit[0]}`;
      document
        .getElementById("dealer-cards")
        .firstChild.classList.add(`pcard-${cardClass}`, "card-flip");
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
    player.lose();
    statLosses.innerHTML = player.losses;
    alert("Dealer Wins!");
  } else if (playerCount > dealerCount && playerCount <= 21) {
    player.win();
    statWins.innerHTML = player.wins;
    alert("Player Wins!");
  } else if (
    playerCount === dealerCount &&
    playerCount <= 21 &&
    dealerCount <= 21
  ) {
    player.push();
    statPushes.innerHTML = player.pushes;
    alert("Push!");
  }
}

// Function to allow Dealer to take a card.
export function Hit(target) {
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
      player.lose();
      statLosses.innerHTML = player.losses;
    } else if (handTotal > 21 && target.name === "dealer") {
      player.win();
      statWins.innerHTML = player.wins;
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
export function InitializeHand() {
  let cardClass;
  let secondClass;
  hitBtn.classList.remove("hide-btn");
  stayBtn.classList.remove("hide-btn");
  // Re-enable buttons after adding back to DOM
  hitBtn.removeAttribute("disabled");
  stayBtn.removeAttribute("disabled");
  document.getElementById("dealer-message").innerHTML = "";

  // Populate player bankroll on game start
  document.getElementById(
    "player-bankroll"
  ).innerHTML = `Bankroll:  $${player.bankroll}`;

  // Populate current bet amount on game start
  document.getElementById(
    "player-bet"
  ).innerHTML = `Current Bet: $${player.bet}`;

  // Reveal bet options once game starts
  document.getElementById("bet-container").style.visibility = "visible";

  // Initialize session stats
  statWins.innerHTML = player.wins;
  statLosses.innerHTML = player.losses;
  statPushes.innerHTML = player.pushes;

  // Reset player/dealer hands
  player.hand.length = 0;
  dealer.hand.length = 0;
  // Draw two new cards for both
  if (player.bet > 0) {
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
  } else {
    document.getElementById("player-message").innerHTML = "";
    document.getElementById("dealer-message").innerHTML = "";
    document.getElementById("dealer-count").innerHTML = "";
    document.getElementById("player-count").innerHTML = "";
    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("player-cards").innerHTML = "Please make a bet";
  }
  // Handle cases where two aces are dealt right off the bat
  player.checkAces(player.hand);
  // repeat for dealer hand
  dealer.checkAces(dealer.hand);
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
    player.blackjack();
    statWins.innerHTML = player.wins;
    document.getElementById(
      "player-bankroll"
    ).innerHTML = `Bankroll: $${player.bankroll}`;
    document.getElementById("player-message").innerHTML =
      "Blackjack! Player wins!";
    hitBtn.className = "hide-btn";
    stayBtn.className = "hide-btn";
  }
  // Repeat for dealer blackjack
  if (dealerCount === 21 && playerCount !== 21) {
    player.lose();
    statLosses.innerHTML = player.losses;
    document.getElementById(
      "dealer-cards"
    ).firstChild.className = `pcard-${cardClass}`;
    document.getElementById(
      "player-bankroll"
    ).innerHTML = `Bankroll: $${player.bankroll}`;
    document.getElementById("dealer-message").innerHTML =
      "Blackjack! Dealer wins!";
    hitBtn.className = "hide-btn";
    stayBtn.className = "hide-btn";
  }
  // UI updates if both have blackjack
  if (playerCount === 21 && dealerCount === 21) {
    player.push();
    statPushes.innerHTML = player.pushes;
    document.getElementById(
      "player-bankroll"
    ).innerHTML = `Bankroll: $${player.bankroll}`;
    document.getElementById("player-message").innerHTML = "Push!";
    document.getElementById("dealer-message").innerHTML = "Push!";
    hitBtn.className = "hide-btn";
    stayBtn.className = "hide-btn";
  }
}
