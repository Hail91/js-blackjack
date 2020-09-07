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
      // Reduce current bankroll accordingly
      this.bankroll -= amount;
    }
  }
  // Will add a reset bet function as well to keep that functionality contained with the class
  resetBet() {
    this.bet = 0;
  }
}

export default Player;
