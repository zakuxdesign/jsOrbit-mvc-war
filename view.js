import {
  Button,
  Header,
  Paragraph,
  Card,
  Section,
  ScoreBoard,
  CardDropArea
} from "./components.js";

export class View {
  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Start UI
  // ------------------------------------------------------
  //
  interface_StartGame() {
    section.render("body", "start-ui");
    //
    header.render(
      "start-ui",
      "start-title",
      "slide-in-right",
      "h1",
      "It's War!"
    );
    //
    paragraph.render(
      "start-ui",
      "start-paragraph",
      "The first to hold the entire deck wins."
    );
    //
    button.render("start-ui", "start-game-button", "Start Game");
  }

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Playing UI
  // ------------------------------------------------------
  //
  interface_PlayingGame(
    humanCardCount,
    cpu1CardCount,
    cpu2CardCount,
    cpu3CardCount
  ) {
    section.render("body", "playing-ui");
    //
    scoreBoard.render(
      "playing-ui",
      humanCardCount,
      cpu1CardCount,
      cpu2CardCount,
      cpu3CardCount
    );
    //
    paragraph.render(
      "playing-ui",
      "instructions-paragraph",
      "Draw a card to play against the machine."
    );
    //
    button.render("playing-ui", "draw-card-button", "Draw Card");
  }

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Round End UI
  // ------------------------------------------------------
  //
  interface_RoundEnd(
    roundWinner,
    humanCardCount,
    cpu1CardCount,
    cpu2CardCount,
    cpu3CardCount,
    playersDealtCards,
    standoff
  ) {
    section.render("body", "round-end-ui");
    //
    scoreBoard.render(
      "round-end-ui",
      humanCardCount,
      cpu1CardCount,
      cpu2CardCount,
      cpu3CardCount
    );
    //
    header.render(
      "round-end-ui",
      "round-end-header",
      "",
      "h2",
      roundWinner + " wins this round."
    );
    //
    cardDropArea.render("round-end-ui");
    //
    for (let player in playersDealtCards) {
      if (playersDealtCards[player].cardsDealt[standoff] != undefined) {
        card.render(
          "card-drop-area",
          player.toUpperCase(),
          "card-" + player,
          "card-" + player,
          playersDealtCards[player].cardsDealt[standoff].value
        );
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
  // Stand Off UI
  // ------------------------------------------------------
  //
  interface_StandOff(
    humanCardCount,
    cpu1CardCount,
    cpu2CardCount,
    cpu3CardCount,
    contenders,
    playersDealtCards,
    standOffWinner
  ) {
    console.log(contenders);
    console.log(standOffWinner);
    section.render("body", "stand-off-ui");
    //
    scoreBoard.render(
      "stand-off-ui",
      humanCardCount,
      cpu1CardCount,
      cpu2CardCount,
      cpu3CardCount
    );
    setTimeout(
      function(contenders) {
        console.log(contenders);
        //
        if (contenders.length == 3) {
          header.render(
            "stand-off-ui",
            "contenders-title",
            "slide-in-right",
            "h2",
            contenders[0] +
              ", " +
              contenders[1] +
              ", and " +
              contenders[2] +
              " still stand!"
          );
        } else {
          console.log(contenders);
          header.render(
            "stand-off-ui",
            "contenders-title",
            "slide-in-right",
            "h2",
            contenders[0] + " and " + contenders[1] + " still stand!"
          );
        }
      },
      300,
      contenders
    );
    setTimeout(function() {
      header.render(
        "stand-off-ui",
        "stand-off-title",
        "slide-in-right",
        "h2",
        "Stand Off!"
      );
    }, 400);
    setTimeout(function() {
      // ----------------------------------
      // render area for cards to go
      cardDropArea.render("stand-off-ui");
      // ----------------------------------
      // render the new cards for standoff
      console.log(playersDealtCards);
      //
      //  CARD COMPONENTS
      //
    }, 1200);
    setTimeout(function() {
      View.interface_Remove("contenders-title");
      View.interface_Remove("stand-off-title");
      View.interface_Remove("card-drop-area");
      //
      header.render(
        "stand-off-ui",
        "round-winner-header",
        "slide-in-right",
        "h2",
        roundWinner + " stands victorious this round."
      );
    }, 3800);
  }

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // End UI
  // ------------------------------------------------------
  //
  interface_EndGame() {}

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Remove
  // ------------------------------------------------------
  //
  static interface_Remove(viewToRemove) {
    let sectionToRemove = document.getElementById(viewToRemove);
    sectionToRemove.remove();
  }
}

let button = new Button();
let header = new Header();
let paragraph = new Paragraph();
let scoreBoard = new ScoreBoard();
let card = new Card();
let cardDropArea = new CardDropArea();
let section = new Section();
