// Dealer logic here
"use strict";

class Dealer {
  constructor() {
    this.name = "Dealer";
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
