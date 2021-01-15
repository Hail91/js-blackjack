class Dealer {
  constructor() {
    this.name = "dealer";
    this.hand = [];
  }
  handSum() {
    return this.hand
      .map((card) => {
        return card.cardValue;
      })
      .reduce((a, b) => a + b);
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

export default Dealer;
