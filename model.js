export class Model {
  constructor(masterDeck) {
    this.suites = ["spades", "clubs", "diamonds", "hearts"];
    this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.masterDeck = masterDeck;
    this.playerDecks = {
      human: [],
      cpu1: [],
      cpu2: [],
      cpu3: []
    };
    this.round = {
      human: {
        cardsDealt: [],
        winner: false
      },
      cpu1: {
        cardsDealt: [],
        winner: false
      },
      cpu2: {
        cardsDealt: [],
        winner: false
      },
      cpu3: {
        cardsDealt: [],
        winner: false
      }
    };
    this.standoff = 0;
  }
  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Create Deck
  //
  // MODEL-method: createDeck
  //////// loop through each suite (4) loop through 13 cards to create deck
  //////// shuffle deck
  // ------------------------------------------------------
  //
  data_CreateDeck() {
    let masterDeck = [];
    // ----------------------------------
    // for each suite
    for (let suite of this.suites) {
      for (let value of this.values) {
        // ----------------------------------
        // push to the master deck
        let card = new Object({
          suite: suite,
          value: value
        });
        //
        masterDeck.push(card);
      }
    }
    // ----------------------------------
    // shuffle the deck
    let currentIndex = masterDeck.length;
    let temporaryValue, randomIndex;
    //
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      //
      temporaryValue = masterDeck[currentIndex];
      masterDeck[currentIndex] = masterDeck[randomIndex];
      masterDeck[randomIndex] = temporaryValue;
    }
    //
    this.masterDeck = masterDeck;
  }

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Pass Out Cards
  //
  // MODEL-method: passOutCards
  //////// loop through each player append the top card to playerDeck
  // ------------------------------------------------------
  //
  data_PassOutCards() {
    // ----------------------------------
    // hand out cards
    while (this.masterDeck.length != 0) {
      // ----------------------------------
      // append first card of master deck to playerDeck
      // remove the first card of master deck --> repeat
      for (let deck in this.playerDecks) {
        this.playerDecks[deck].push(this.masterDeck[0]);
        this.masterDeck.splice(0, 1);
      }
    }
  }

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Remove Top Card from each play deck
  // ------------------------------------------------------
  //
  data_DrawAndDiscard(contenders) {
    // ----------------------------------
    // loop through the players decks and
    // remove the top card and put into
    // card dealt pile for the round
    if (contenders == undefined) {
      for (let deck in this.playerDecks) {
        if (deck == "human" && this.playerDecks.human.length != 0) {
          this.round.human.cardsDealt.push(this.playerDecks[deck][0]);
          this.playerDecks[deck].splice(0, 1);
        } else if (deck == "cpu1" && this.playerDecks.cpu1.length != 0) {
          this.round.cpu1.cardsDealt.push(this.playerDecks[deck][0]);
          this.playerDecks[deck].splice(0, 1);
        } else if (deck == "cpu2" && this.playerDecks.cpu2.length != 0) {
          this.round.cpu2.cardsDealt.push(this.playerDecks[deck][0]);
          this.playerDecks[deck].splice(0, 1);
        } else if (deck == "cpu3" && this.playerDecks.cpu3.length != 0) {
          this.round.cpu3.cardsDealt.push(this.playerDecks[deck][0]);
          this.playerDecks[deck].splice(0, 1);
        }
      }
    } else {
      for (let contender of contenders) {
        for (let deck in this.playerDecks) {
          if (deck == contender) {
            this.round[deck].cardsDealt.push(this.playerDecks[deck][0]);
            this.playerDecks[deck].splice(0, 1);
          }
        }
      }
    }
  }

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Determine round winner
  // ------------------------------------------------------
  //
  data_DetermineRoundWinner(currentStandOff) {
    // ----------------------------------
    // check which card is the highest value
    let standoffConstents = [];
    for (let player in this.round) {
      if (this.round[player].cardsDealt[currentStandOff] != undefined) {
        standoffConstents.push(this.round[player].cardsDealt[currentStandOff]);
      }
    }
    //
    //
    const checkWhoHasValue = highestCardValue => {
      // ----------------------------------
      // check who has that value
      for (let player in this.round) {
        if (this.round[player].cardsDealt[currentStandOff] != undefined) {
          if (
            this.round[player].cardsDealt[currentStandOff].value ==
            highestCardValue
          ) {
            this.round[player].winner = true;
          } else {
            this.round[player].winner = false;
          }
        }
      }
    };
    //
    if (
      standoffConstents[2] == undefined ||
      standoffConstents[3] == undefined
    ) {
      let highestCardValue = Math.max(
        standoffConstents[0].value,
        standoffConstents[1].value
      );
      checkWhoHasValue(highestCardValue);
    } else {
      let highestCardValue = Math.max(
        standoffConstents[0].value,
        standoffConstents[1].value,
        standoffConstents[2].value,
        standoffConstents[3].value
      );
      checkWhoHasValue(highestCardValue);
    }
  }

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Increase stand off
  // ------------------------------------------------------
  //
  data_IncreaseStandOff() {
    this.standoff += 1;
  }

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Reset stand off
  // ------------------------------------------------------
  //
  data_ResetStandOff() {
    this.standoff = 0;
  }

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Reset Round Winner
  // ------------------------------------------------------
  //
  data_ResetRoundWinner() {
    for (let player in this.round) {
      this.round[player].winner = false;
    }
  }

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Reset Cards Dealt
  // ------------------------------------------------------
  //
  data_ResetCardsDealt() {
    for (let player in this.round) {
      this.round[player].cardsDealt = [];
    }
  }

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Append the 3 cards to the roundWinner's deck
  // ------------------------------------------------------
  //
  data_AppendToBottomOfWinnerDeck(roundWinner) {
    //
    //
    for (let player in this.round) {
      for (let card of this.round[player].cardsDealt) {
        if (roundWinner == "human") {
          this.playerDecks.human.push(card);
        } else if (roundWinner == "cpu1") {
          this.playerDecks.cpu1.push(card);
        } else if (roundWinner == "cpu2") {
          this.playerDecks.cpu2.push(card);
        } else {
          this.playerDecks.cpu3.push(card);
        }
      }
    }
  }

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Remove cards from players
  // ------------------------------------------------------
  //
  data_ResetGame() {
    this.masterDeck = masterDeck;
    this.playerDecks = {
      human: [],
      cpu1: [],
      cpu2: [],
      cpu3: []
    };
    this.round = {
      human: {
        cardsDealt: [],
        winner: false
      },
      cpu1: {
        cardsDealt: [],
        winner: false
      },
      cpu2: {
        cardsDealt: [],
        winner: false
      },
      cpu3: {
        cardsDealt: [],
        winner: false
      }
    };
    this.standoff = 0;
  }
}

// MODEL-method: appendToBottomOfWinnerDeck(roundWinner)
//////// append the 3 cards to the bottom of roundWinner deck

// MODEL-method: removeCardsFromPlayers
//////// remove all cards in all arrays
