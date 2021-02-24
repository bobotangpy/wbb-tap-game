import Phaser from "phaser";
import themeAudio from "../assets/theme.mp3";
import rhythm from "../rhythm.json";
import { AlignGrid } from "../../util/alignGrid";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.score = 0;
    this.counter = 0;
  }

  preload() {
    let x = this.game.config.width / 2;
    let y = this.game.config.height / 2;
    this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
    // this.aGrid.showNumbers();

    ///////////////////////////////////////////////////////////////////////////////////////////
    this.load.audio("theme", themeAudio);

    let cache = this.cache.audio;
    let data = cache.get("theme");
  }

  create(scaleRatio) {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    const audio = this.sound.add("theme");
    // const bg = this.add.image(650, 300, "background");

    const bg = this.add.image(0, 0, "gameBg");
    bg.displayHeight = this.sys.game.config.height;
    bg.scaleX = bg.scaleY;
    bg.x = this.game.config.width / 2;
    bg.y = this.game.config.height / 2;
    bg.x = bg.displayWidth * 0.2;
    bg.y = bg.displayHeight * 0.5;

    const scoreText = this.add
      .text(16, 16, `Score: ${this.score}`, {
        fontSize: "32px",
        fill: "#000",
      })
      .setScale(scaleRatio, scaleRatio);

    // audio.play();
    //////////////////////////////////////////////////////////////////////////////
    // Reset counter when replay game //
    if (this.counter !== 0) this.counter = 0;

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE,
      (cam, effect) => {
        // Create heads related functions //
        const scaleToGameW = (obj, per) => {
          obj.displayWidth = this.game.config.width * per;
          obj.scaleY = obj.scaleX;
        };

        const createHead = (qty, key) => {
          const heads = this.add.group();

          let newObj = heads.createMultiple({
            key: key,
            quantity: qty,
            visible: false,
          });

          newObj.forEach((item) => {
            item
              // .setX(
              //   Phaser.Math.RND.between(
              //     this.game.config.width * 0.25,
              //     this.game.config.width * 0.75
              //   )
              // )
              // .setY(
              //   Phaser.Math.RND.between(
              //     this.game.config.width * 0.25,
              //     this.game.config.width * 0.75
              //   )
              // )
              .setScale(0)
              .setInteractive({ cursor: "pointer" });

            this.aGrid.placeAtIndex(Phaser.Math.RND.between(12, 97), item);

            item.visible = true;

            this.tweens.add({
              targets: item,
              alpha: 1,
              duration: 1500,
              ease: "Power2",
              // Scale up sprite
              onStart: () => {
                this.tweens.add({
                  targets: item,
                  scaleX: 0.3 * scaleRatio,
                  scaleY: 0.3 * scaleRatio,
                  duration: 2000,
                  ease: "Power2",
                });
              },
              // Fade Out
              onComplete: () => {
                scaleToGameW(item, 0.3);
                this.tweens.add({
                  targets: item,
                  alpha: 0,
                  duration: 1000,
                  ease: "Power2",
                });
              },
            });

            if (item.alpha < 1) {
              this.input.disable(item);
              item.disableBody(true, true);
            }
          });
        };

        const getRandomInt = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1) + min);
        };

        const headCount = () => {
          let data = Object.keys(rhythm);

          if (this.counter <= data.length) {
            this.counter += 1;

            if (this.counter > data.length) {
              this.scene.start("GameOverScene", this.score, scaleRatio);
            }

            let qty = Object.values(rhythm)[this.counter];
            let randomNum = getRandomInt(1, 3);
            switch (randomNum) {
              case 1:
                createHead(qty, "grizz");
                break;
              case 2:
                createHead(qty, "pan");
                break;
              case 3:
                createHead(qty, "ice");
                break;
              default:
                break;
            }

            setTimeout(() => {
              headCount();
            }, 2000);
          }
        };

        headCount();
      }
    );

    //////////////////////////////////////////////////////////////////////////////
    // Head onClick actions //
    const headClicked = (pointer, head) => {
      this.tweens.add({
        targets: head,
        scaleX: 0.4 * scaleRatio,
        scaleY: 0.4 * scaleRatio,
        duration: 500,
        ease: "Power2",
        onComplete: () => {
          head.visible = false;
        },
      });
      // console.log("clicked");

      this.score += 100;
      scoreText.setText(`Score: ${this.score}`);
    };

    this.input.on("gameobjectdown", headClicked.bind(this));
    //////////////////////////////////////////////////////////////////////////////
  }
}

export default GameScene;
