export class Button {
  constructor(button) {
    this.button = button;
  }
  //
  render(renderLocation, buttonId, buttonContent) {
    let button = document.createElement("button");
    button.setAttribute("id", buttonId);
    button.innerHTML = buttonContent;
    document.getElementById(renderLocation).appendChild(button);
  }
}

export class Header {
  constructor(header) {
    this.header = header;
  }
  //
  render(renderLocation, headerId, headerClass, headerType, headerContent) {
    let header = document.createElement(headerType);
    header.setAttribute("class", headerClass);
    header.setAttribute("id", headerId);
    header.innerHTML = headerContent;
    document.getElementById(renderLocation).appendChild(header);
  }
}

export class Paragraph {
  constructor(paragraph) {
    this.paragraph = paragraph;
  }
  //
  render(renderLocation, paragraphId, paragraphContent) {
    let paragraph = document.createElement("p");
    paragraph.setAttribute("id", paragraphId);
    paragraph.innerHTML = paragraphContent;
    document.getElementById(renderLocation).appendChild(paragraph);
  }
}

export class Card {
  constructor(card) {
    this.card = card;
  }
  //
  render(renderLocation, player, cardId, cardClass, cardContent) {
    let card = document.createElement("div");
    card.setAttribute("class", cardClass);
    card.setAttribute("id", cardId);
    document.getElementById(renderLocation).appendChild(card);
    //
    let paragraph = new Paragraph();
    paragraph.render(cardId, cardId + "-paragraph", player);
    //
    let header = new Header();
    if (cardContent == 1) {
      header.render(cardId, cardId + "-header", "", "h3", "A");
    } else if (cardContent == 11) {
      header.render(cardId, cardId + "-header", "", "h3", "J");
    } else if (cardContent == 12) {
      header.render(cardId, cardId + "-header", "", "h3", "Q");
    } else if (cardContent == 13) {
      header.render(cardId, cardId + "-header", "", "h3", "K");
    } else {
      header.render(cardId, cardId + "-header", "", "h3", cardContent);
    }
  }
}

export class ScoreBoard {
  constructor(scoreBoard) {
    this.scoreBoard = scoreBoard;
  }
  //
  render(renderLocation, humanScore, cpu1Score, cpu2Score, cpu3Score) {
    let scoreBoard = document.createElement("div");
    scoreBoard.setAttribute("id", "scoreboard");
    document.getElementById(renderLocation).appendChild(scoreBoard);
    //
    let topOfScoreBoard = document.createElement("div");
    topOfScoreBoard.setAttribute("id", "top-of-scoreboard");
    document.getElementById("scoreboard").appendChild(topOfScoreBoard);
    //
    let paragraph = new Paragraph();
    paragraph.render(
      "top-of-scoreboard",
      "number-of-cards-owned",
      "Card Totals for Each Player"
    );
    //
    let bottomOfScoreBoard = document.createElement("div");
    bottomOfScoreBoard.setAttribute("id", "bottom-of-scoreboard");
    document.getElementById("scoreboard").appendChild(bottomOfScoreBoard);
    //
    paragraph.render(
      "bottom-of-scoreboard",
      "humanscore",
      "Human - " + humanScore
    );
    paragraph.render(
      "bottom-of-scoreboard",
      "computer1score",
      "CPU 1 - " + cpu1Score
    );
    paragraph.render(
      "bottom-of-scoreboard",
      "computer2score",
      "CPU 2 - " + cpu2Score
    );
    paragraph.render(
      "bottom-of-scoreboard",
      "computer3score",
      "CPU 3 - " + cpu3Score
    );
  }
}

export class CardDropArea {
  constructor(cardDropArea) {
    this.cardDropArea = cardDropArea;
  }
  //
  render(renderLocation) {
    let cardDropArea = document.createElement("div");
    cardDropArea.setAttribute("id", "card-drop-area");
    document.getElementById(renderLocation).appendChild(cardDropArea);
  }
}

export class Section {
  constructor(section) {
    this.section = section;
  }
  //
  render(renderLocation, sectionId) {
    let section = document.createElement("div");
    section.setAttribute("class", "section");
    section.setAttribute("id", sectionId);
    document.getElementById(renderLocation).appendChild(section);
  }
}
