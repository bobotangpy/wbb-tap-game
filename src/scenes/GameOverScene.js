import Phaser from "phaser";
import { AlignGrid } from "../../util/alignGrid";

class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  preload() {}

  create(score, scaleRatio) {
    const bg = this.add.image(0, 0, "gameBg");
    bg.displayHeight = this.sys.game.config.height;
    bg.scaleX = bg.scaleY;

    bg.x = this.game.config.width / 2;
    bg.y = this.game.config.height / 2;

    bg.x = bg.displayWidth * 0.2;
    bg.y = bg.displayHeight * 0.5;

    this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
    // this.aGrid.showNumbers();

    let x = this.game.config.width / 2;
    let y = this.game.config.height / 2;

    let finalScore;
    typeof score == "number" ? (finalScore = score) : (finalScore = 0);

    const scoreText = this.add
      .text(x, y, `Final Score: ${finalScore}`, {
        fontSize: "40px",
        fontStyle: "bold",
        fill: "darkblue",
      })
      .setScale(scaleRatio, scaleRatio);
    this.aGrid.placeAtIndex(47, scoreText);

    let replayBtn = this.add
      .image(0, 0, "replayBtn")
      .setScale(scaleRatio, scaleRatio)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("GameScene");
      });
    this.aGrid.placeAtIndex(60, replayBtn);
  }
}

export default GameOverScene;
