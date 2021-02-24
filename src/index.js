import Phaser from "phaser";
import IntroScene from "./scenes/IntroScene";
import LoadingScene from "./scenes/LoadingScene";
import GameScene from "./scenes/GameScene";
import GameOverScene from "./scenes/GameOverScene";

window.onload = function () {
  var isMobile = navigator.userAgent.indexOf("Mobile");
  if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
  }
  var w = 480;
  var h = 640;
  if (isMobile != -1) {
    w = window.innerWidth;
    h = window.innerHeight;
  }

  const config = {
    type: Phaser.AUTO,
    // width: 800,
    // height: 600,
    // width: window.innerWidth * window.devicePixelRatio,
    // height: window.innerHeight * window.devicePixelRatio,
    width: w,
    height: h,
    parent: "phaser-game",
    // physics: {
    //   default: "arcade",
    //   arcade: {
    //     gravity: { y: 300 },
    //     debug: false,
    //   },
    // },
    scene: [LoadingScene, IntroScene, GameScene, GameOverScene],
  };

  const game = new Phaser.Game(config);
};

// Scale the canvas in diff devices:
// https://phasergames.com/downloads/utility-template/
// https://www.youtube.com/watch?v=ZWIZeGAXuSA&ab_channel=WClarkson

// Scale

// Fade In & Out Scene:
// https://blog.ourcade.co/posts/2020/phaser-3-fade-out-scene-transition/

// PreLoad Scene:
// https://github.com/johwiese/Phaser3-Loading-screen-asset-organization/blob/master/src/scenes/preload.js
