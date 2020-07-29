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
      title: "CITIZEN <K>ANE",
      menuKey: "K"
    }, {
      key: "beautravail",
      title: "<B>EAU TRAVAIL",
      menuKey: "B"
    }, {
      key: "auhasardbalthazar",
      title: "<A>U HASARD BALTHAZAR",
      menuKey: "A"
    }, {
      key: "lavventura",
      title: "<L>'AVVENTURA",
      menuKey: "L"
    }, {
      key: "rashomon",
      title: "<R>ASHOMON",
      menuKey: "R"
    }, {
      key: "somelikeithot",
      title: "<S>OME LIKE IT HOT",
      menuKey: "S"
    }, {
      key: "taxidriver",
      title: "<T>AXI DRIVER",
      menuKey: "T"
    }, {
      key: "theconversation",
      title: "THE <C>ONVERSATION",
      menuKey: "C"
    }, {
      key: "thegodfather",
      title: "THE <G>ODFATHER",
      menuKey: "G"
    }, {
      key: "twothousandandoneaspaceodyssey",
      title: "<2>001: A SPACE ODYSSEY",
      menuKey: "TWO"
    }, ]


    this.gameStrings = "\n";
    for (let i = 0; i < this.games.length; i++) {
      let game = this.games[i];
      this.gameStrings += game.title + "\n";
      this.input.keyboard.on(`keydown-${game.menuKey}`, (e) => {
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