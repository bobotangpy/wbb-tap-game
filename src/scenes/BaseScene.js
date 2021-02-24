import Phaser from "phaser";
import bg from "../assets/bg.jpg";

class BaseScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  preload() {
    this.load.image("background", bg);
  }

  create() {
    const createBg = () => {
      const bg = this.add.image(0, 0, "background");
      bg.displayHeight = this.sys.game.config.height;
      bg.scaleX = bg.scaleY;

      bg.x = this.game.config.width / 2;
      bg.y = this.game.config.height / 2;

      bg.x = bg.displayWidth * 0.2;
      bg.y = bg.displayHeight * 0.5;
    };
    createBg();
  }
}

export default BaseScene;
