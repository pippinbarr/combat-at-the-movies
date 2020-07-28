class Menu extends Phaser.Scene {

  constructor(config) {
    super({
      key: "menu"
    });
  }

  create() {
    // bgColor = 0xBEC86D,
    // tileColor = 0xF1B275,
    // playerColor = 0xC04141

    this.cameras.main.setBackgroundColor(0x000000);

    this.titleText = this.add.text(this.game.canvas.width / 2, this.game.canvas.height + 100, "COMBAT AT THE MOVIES", {
      fontFamily: "Square",
      fontSize: "24px",
      color: "#F1B275"
    });
    this.titleText.setOrigin(0.5, 0.5);

    this.games = [{
      key: "citizenkane",
      title: "CITIZEN KANE"
    }, {
      key: "beautravail",
      title: "BEAU TRAVAIL"
    }, {
      key: "auhasardbalthazar",
      title: "AU HASARD BALTHAZAR"
    }, {
      key: "lavventura",
      title: "L'AVVENTURA"
    }, {
      key: "rashomon",
      title: "RASHOMON"
    }, {
      key: "somelikeithot",
      title: "SOME LIKE IT HOT"
    }, {
      key: "taxidriver",
      title: "TAXI DRIVER"
    }, {
      key: "theconversation",
      title: "THE CONVERSATION"
    }, {
      key: "thegodfather",
      title: "THE GODFATHER"
    }, {
      key: "twothousandandoneaspaceodyssey",
      title: "2001: A SPACE ODYSSEY"
    }, ]

    this.numberCodes = [
      "ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"
    ];

    this.gameStrings = "\n";
    for (let i = 0; i < this.games.length; i++) {
      let game = this.games[i];
      this.gameStrings += i + " - " + game.title + "\n";
      this.input.keyboard.on(`keydown-${this.numberCodes[i]}`, (e) => {
        console.log("???")
        this.scene.start(game.key);
      });
    }

    this.gamesText = this.add.text(this.game.canvas.width / 2, this.game.canvas.height + 100, this.gameStrings, {
      fontFamily: "Square",
      fontSize: "22px",
      color: "#BEC86D",
      lineSpacing: 10
    });
    this.gamesText.setOrigin(0.5, 0);

    this.tweenIn = this.add.tween({
      targets: [this.titleText, this.gamesText],
      y: this.game.canvas.height / 8,
      duration: 1000,
      repeat: 0,
    });
  }

  update(time, delta) {
    this.handleInput();
  }

  handleInput() {

  }
}