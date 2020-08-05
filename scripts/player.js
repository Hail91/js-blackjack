// Player logic here
("use strict");

class Player {
  constructor(name) {
    this.name = name;
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
