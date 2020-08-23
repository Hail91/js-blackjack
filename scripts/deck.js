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

export default Deck;
