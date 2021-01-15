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
  updateBet(amount) {
    if (this.bankroll >= amount) {
      this.bet += amount;
      this.bankroll -= amount;
    } else alert("Not enough money!");
  }
  resetBet() {
    this.bankroll += this.bet;
    this.bet = 0;
  }
  win() {
    this.bankroll += this.bet * 2;
    this.wins += 1;
    this.bet = 0;
  }
  push() {
    this.bankroll += this.bet;
    this.pushes += 1;
    this.bet = 0;
  }
  lose() {
    this.losses += 1;
    this.bet = 0;
  }
  blackjack() {
    this.bankroll += this.bet * 2.5;
    this.wins += 1;
    this.bet = 0;
  }
  checkAces(hand) {
    if (hand.every((el) => el.cardType === "A")) {
      hand.map((card) => {
        if (card.cardType === "A") {
          card.cardValue = 1;
        }
      });
    }
  }
}

export default Player;
