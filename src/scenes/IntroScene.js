import Phaser from "phaser";
import { AlignGrid } from "../../util/alignGrid";

class IntroScene extends Phaser.Scene {
  constructor() {
    super("IntroScene");
  }

  preload() {}

  create(scaleRatio) {
    const bg = this.add.image(0, 0, "introBg");
    bg.displayHeight = this.sys.game.config.height;
    bg.scaleX = bg.scaleY;
    bg.x = this.game.config.width / 2;
    bg.y = this.game.config.height / 2;
    bg.x = bg.displayWidth * 0.4;
    // bg.y = bg.displayHeight * 0.5;

    this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
    // this.aGrid.showNumbers();

    const title = this.add
      .text(0, 0, "We Bare Bears \nTap Game", {
        fontSize: 35,
        fontStyle: "bold",
        color: "#313131",
        align: "center",
      })
      .setScale(scaleRatio, scaleRatio);
    const stack = this.add
      .image(0, 0, "broStack")
      .setScale(scaleRatio * 0.15, scaleRatio * 0.15);
    const playBtn = this.add
      .image(0, 0, "playBtn")
      .setScale(scaleRatio * 0.5, scaleRatio * 0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        playBtn.setY(playBtn.y + 10);

        setTimeout(() => {
          playBtn.setY(playBtn.y - 10);
          this.cameras.main.fadeOut(1000, 0, 0, 0);
        }, 200);
      });
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam, effect) => {
        this.scene.start("GameScene", scaleRatio);
      }
    );

    this.aGrid.placeAtIndex(35, title);
    this.aGrid.placeAtIndex(69, stack);
    this.aGrid.placeAtIndex(72, playBtn);
  }
}

export default IntroScene;
