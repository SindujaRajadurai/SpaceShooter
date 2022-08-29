
/*************************************************************************************************************
 * Handles Foreground properties and random sky element motions
***************************************************************************************************************/


export default class ForeGround extends Phaser.GameObjects.Container {

    _planets: Array<any>;

    constructor(scene, x, y) {
        super(scene);
        this._planets = ["planet1", "planet2", "planet3", "planet4", "planet5","meteorBg"];

        this._startForeGroundTimer();
        this._addHighlighter();
    }


    _startForeGroundTimer() {
        var self = this;
        var _enemyTimer = this.scene.time.addEvent({
          delay: 7000,
          callback: function () {
            self._addForeGroundElements();
          },
          callbackScope: this,
          loop: true
        });
    }


    _addForeGroundElements() {
        var randomNumber =  Math.floor(Math.random() * this._planets.length);
        var currentPlanet = this.scene.add.image(this.scene.cameras.main.width * 1.25,this.scene.cameras.main.height * .25, this._planets[randomNumber]).setScale(2.5).setAlpha(0.45);

        this.scene.tweens.add({
            targets: currentPlanet,
            duration: 10000,
            x: -this.scene.cameras.main.width * 1.25,
            y: this.scene.cameras.main.height * 1.2,
            ease: "Linear",
            onComplete: function () {
             currentPlanet.destroy()
            }
          });
  

    }


    _addHighlighter(){
        var highlighter = this.scene.add.image(this.scene.cameras.main.width * .5,this.scene.cameras.main.height * .95, "highlighter").setScale(1.8).setAlpha(0.6);
    }

}

