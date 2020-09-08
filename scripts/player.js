// Player logic here
("use strict");
class Player {
  constructor(name) {
    this.name = name;
    this.wins = 0;
    this.losses = 0;
    this.pushes = 0;
    this.hand = [];
    this.bankroll = 500;
    this.bet = 0;
  }
  handSum() {
    return this.hand
      .map((card) => {
        return card.cardValue;
      })
      .reduce((a, b) => a + b);
  }
  // Update bet amount, will be triggered onClick of bet buttons in UI
  updateBet(amount) {
    if (this.bankroll >= amount && !(this.bankroll - amount < 0)) {
      // Update player bet so we can track on UI
      this.bet += amount;
      this.bankroll -= amount;
      // Reduce current bankroll accordingly
    }
  }
  // Will add a reset bet function as well to keep that functionality contained with the class
  resetBet() {
    this.bankroll += this.bet;
    this.bet = 0;
  }
  // Method to increment player bankroll if player wins
  win() {
    this.bankroll += this.bet * 2;
    this.wins += 1;
    this.bet = 0;
  }
  // Method for player push
  push() {
    this.bankroll += this.bet;
    this.pushes += 1;
    this.bet = 0;
  }
  lose() {
    // Need to decrement from bankroll here, but need to figure out how to wait to deal cards until AFTER a bet is made.
    this.losses += 1;
    this.bet = 0;
  }
  blackjack() {
    this.bankroll += this.bet * 2.5;
    this.wins += 1;
    this.bet = 0;
  }
}

export default Player;
