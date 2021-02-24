import Phaser from "phaser";
import broStack from "../assets/3bros.png";
import playBtn from "../assets/play_btn.png";
import replayBtn from "../assets/replay_btn.png";
import gameBg from "../assets/bg.jpg";
import introBg from "../assets/cave_bg.jpg";
import grizz from "../assets/head-grizz.png";
import pan from "../assets/head-pan.png";
import ice from "../assets/head-ice.png";
import { AlignGrid } from "../../util/alignGrid";

class LoadingScene extends Phaser.Scene {
  constructor() {
    super({
      key: "LoadingScene",
      files: [
        { type: "image", key: "broStack", url: "/assets/3bros.png" },
        { type: "image", key: "playBtn", url: "/assets/play_btn.png" },
        { type: "image", key: "replayBtn", url: "/assets/replay_btn.png" },
        { type: "image", key: "gameBg", url: "/assets/bg.jpg" },
        { type: "image", key: "introBg", url: "/assets/cave_bg.jpg" },
        { type: "image", key: "grizz", url: "/assets/head-grizz.png" },
        { type: "image", key: "pan", url: "/assets/head-pan.png" },
        { type: "image", key: "ice", url: "/assets/head-ice.png" },
      ],
    });
    // Use scaleRatio to resize the assets in different devices
    this.scaleRatio = window.devicePixelRatio / 3 >= 1 ? 2 : 1.5;
  }

  preload() {
    this.load.image("broStack", broStack);
    this.load.image("playBtn", playBtn);
    this.load.image("replayBtn", replayBtn);
    this.load.image("gameBg", gameBg);
    this.load.image("introBg", introBg);
    this.load.image("grizz", grizz);
    this.load.image("pan", pan);
    this.load.image("ice", ice);

    let x = this.game.config.width / 2;
    let y = this.game.config.height / 2;
    this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
    // this.aGrid.showNumbers();

    let progressBar = this.add
      .graphics()
      .setScale(this.scaleRatio * 0.6, this.scaleRatio * 0.6);
    let progressBox = this.add
      .graphics()
      .setScale(this.scaleRatio * 0.6, this.scaleRatio * 0.6);
    this.aGrid.placeAtIndex(47, progressBar);
    this.aGrid.placeAtIndex(47, progressBox);

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(0, 0, 350, 50);

    let loadingText = this.make.text({
      //   x: x,
      //   y: y,
      text: "Loading...",
      style: {
        font: "25px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.4, 1.5).setScale(this.scaleRatio, this.scaleRatio);
    this.aGrid.placeAtIndex(49, loadingText);

    var percentText = this.add.text({
      x: x,
      y: y,
      text: "0%",
      style: {
        font: "22px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 2).setScale(this.scaleRatio, this.scaleRatio);
    this.aGrid.placeAtIndex(60, percentText);

    // Check device orientation
    const checkOrientation = (orientation) => {
      if (orientation === Phaser.Scale.PORTRAIT) {
        console.log("portrait");
      } else if (orientation === Phaser.Scale.LANDSCAPE) {
        console.log("landscape");
      }
    };
    checkOrientation(this.scale.orientation);
    this.scale.on("orientationchange", checkOrientation, this);

    const updateProgress = (percent) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(10, 10, 330 * percent, 30);
      percentText.setText(parseInt(percent * 100) + "%");
    };

    const complete = () => {
      setTimeout(() => {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        this.scene.start("IntroScene", this.scaleRatio);
      }, 1000);
    };

    this.load.on("progress", updateProgress, {
      progressBar: this.progressBar,
      percentText: this.percentText,
    });
    this.load.once("progress", complete, this);
  }
}
export default LoadingScene;
