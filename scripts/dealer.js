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

export default Dealer;
