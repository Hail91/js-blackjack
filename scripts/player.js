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
  updateBet() {}
}

export default Player;
