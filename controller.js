import { View } from "./view.js";
import { Model } from "./model.js";

class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }
  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Start Game
  // ------------------------------------------------------
  //
  game_Start() {
    // ----------------------------------
    // call start view
    view.interface_StartGame();
    // ----------------------------------
    // start eventListener
    let startButton = document.getElementById("start-game-button");
    startButton.addEventListener("click", () => {
      // ----------------------------------
      // call create deck
      model.data_CreateDeck();
      model.data_PassOutCards();
      // ----------------------------------
      // call game playing
      controller.game_Playing();
    });
  }

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Playing Game
  // ------------------------------------------------------
  //
  game_Playing() {
    // ----------------------------------
    // call remove UI
    // call playing
    // and draw card eventListener
    if (document.getElementById("start-ui") != undefined) {
      View.interface_Remove("start-ui");
    } else if (document.getElementById("round-end-ui") != undefined) {
      View.interface_Remove("round-end-ui");
    } else if (document.getElementById("stand-off-ui") != undefined) {
      View.interface_Remove("stand-off-ui");
    }
    view.interface_PlayingGame(
      model.playerDecks.human.length,
      model.playerDecks.cpu1.length,
      model.playerDecks.cpu2.length,
      model.playerDecks.cpu3.length
    );
    let drawButton = document.getElementById("draw-card-button");
    drawButton.addEventListener("click", () => {
      // ----------------------------------
      // resets the standoff number to 0
      // remove top card of player's deck and put into discard pile
      // determine the winner
      model.data_ResetStandOff();
      model.data_DrawAndDiscard();
      model.data_DetermineRoundWinner(model.standoff);
      // ----------------------------------
      // if any player has 52 cards call game_end
      if (
        model.humanScore == 52 ||
        model.cpu1Score == 52 ||
        model.cpu2Score == 52 ||
        model.cpu3Score == 52
      ) {
        controller.game_End();
      } else {
        // ----------------------------------
        // push any this.round.player.winner == true
        // into the array
        let winners = [];
        for (let player in model.round) {
          if (model.round[player].winner == true) {
            winners.push(player);
          }
        }
        if (winners.length == 1) {
          // ----------------------------------
          // increase the stand off number
          controller.game_RoundEnd(winners[0]);
          model.data_ResetCardsDealt();
          // ----------------------------------
          // reset winners array
          winners.length = 0;
        } else {
          //
          model.data_IncreaseStandOff();
          controller.game_StandOff(winners);
          winners.length = 0;
        }
      }
    });
  }

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Round End
  // ------------------------------------------------------
  //
  game_RoundEnd(winner) {
    View.interface_Remove("playing-ui");
    view.interface_RoundEnd(
      winner,
      model.playerDecks.human.length,
      model.playerDecks.cpu1.length,
      model.playerDecks.cpu2.length,
      model.playerDecks.cpu3.length,
      model.round,
      model.standoff
    );
    model.data_AppendToBottomOfWinnerDeck(winner);
    setTimeout(function() {
      controller.game_Playing(
        model.playerDecks.human.length,
        model.playerDecks.cpu1.length,
        model.playerDecks.cpu2.length,
        model.playerDecks.cpu3.length
      );
      model.data_ResetRoundWinner();
    }, 3000);
  }

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // Stand Off
  // ------------------------------------------------------
  //
  game_StandOff(contenders) {
    // ----------------------------------
    // remove old UI
    // draw and put in the discard pile
    // set who is the winner of the round
    View.interface_Remove("playing-ui");
    model.data_DrawAndDiscard(contenders);
    console.log(model.standoff);
    model.data_DetermineRoundWinner(model.standoff);
    // ----------------------------------
    // set winner in the round
    // append cards to winners deck
    // render UI to show stand off
    const setAsWinner = standOffWinner => {
      model.round[standOffWinner].winner = true;
      model.data_AppendToBottomOfWinnerDeck(standOffWinner);
      view.interface_StandOff(
        model.playerDecks.human.length,
        model.playerDecks.cpu1.length,
        model.playerDecks.cpu2.length,
        model.playerDecks.cpu3.length,
        contenders,
        model.round,
        standOffWinner,
        model.standoff
      );
    };
    // ----------------------------------
    // check who won
    if (model.round[contenders[0]].winner == true) {
      setAsWinner(contenders[0]);
    } else if (model.round[contenders[1]].winner == true) {
      setAsWinner(contenders[1]);
    } else if (model.round[contenders[2]].winner == true) {
      setAsWinner(contenders[2]);
    }

    setTimeout(function() {
      //
      model.data_ResetCardsDealt();
      controller.game_Playing(
        model.playerDecks.human.length,
        model.playerDecks.cpu1.length,
        model.playerDecks.cpu2.length,
        model.playerDecks.cpu3.length
      );
      model.data_ResetRoundWinner();
    }, 8000);
  }

  //
  //
  //
  //
  //
  //
  // ------------------------------------------------------
  // End Game
  // ------------------------------------------------------
  //
  game_End() {
    for (let player in this.playerDecks) {
      if (this.playerDecks[player].length == 52) {
        View.interface_Remove("playing-ui");
        view.interface_EndGame(player.toUpperCase());
      }
    }
    let backToMainMenuButton = document.getElementById("main-menu-button");
    backToMainMenuButton.addEventListener("click", function() {
      model.data_ResetGame();
      Controller.game_Start();
    });
  }
}

let view = new View();
let model = new Model();
let controller = new Controller();
controller.game_Start(view);

// CONTROLLER-method: gameEnd(gameWinner)
//////// VIEW-method: call remove_UI('playing_UI')
//////// VIEW-method: call end_UI
//////// click eventListener ---> 'Okay' button
//////////// MODEL-method: call removeCardsFromPlayers
//////////// CONTROLLER-method: call gameStart
