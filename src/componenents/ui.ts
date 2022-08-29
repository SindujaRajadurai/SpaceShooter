
/************************************************************************************************************
 * Handles UI properties
 * Score
 * Lifeline
***************************************************************************************************************/


export default class UI extends Phaser.GameObjects.Container {


   _scoreBoard !: Phaser.GameObjects.Image;
   _score !: any;
   _scoreText !: any;
   _boosterArr !: Array<any>;
   _yourScoreTxt !: any;
   _yourScore !: any
   _playBtn !: any;

   constructor(scene, x, y) {
      super(scene, x, y);
      this.scene = scene;
      this._score = 0;
      this._boosterArr = [];
      this._addScoreBoard();
      this._addLifeLines()
   }

   _addScoreBoard() {
      this._scoreBoard = this.scene.add.image(this.scene.cameras.main.width * .19, this.scene.cameras.main.height * .07, "scoreBar").setScale(1);
      this._addScoreText();
   }


   _addScoreText() {
      this._scoreText = this.scene.add.text(
         this.scene.cameras.main.width * .16,
         this.scene.cameras.main.height * .07,
         this._score)
         .setFontFamily("RussoOne")
         .setColor("#FFFFFF")
         .setFontSize(45)
         .setOrigin(0.5)
         .setWordWrapWidth(900)
   }

   _updateScoreText(score) {
      this._score = score + this._score;
      this._scoreText.setText(this._score)
   }


   _addLifeLines() {
      var xPos = 0.7;
      for (let i = 0; i < 3; i++) {
         var boosterImg = this.scene.add.image(this.scene.cameras.main.width * xPos, this.scene.cameras.main.height * .07, "booster").setScale(2.2)
         this._boosterArr.push(boosterImg);
         xPos += 0.1;
      }

   }


   _removeLifeLine() {
//@ts-ignore
      if(!this.scene._isGameOver) {
      var self = this;
      //@ts-ignore
      this.scene.tweens.add({
         targets: this._boosterArr[0],
         duration: 300,
         alpha: 0,
         ease: "Linear",
         onComplete: function () {
            self._boosterArr[0].destroy();
            self._boosterArr.splice(0, 1)
         }
      });
   }
   }


   _addLifeLine() {
      var boosterImg = this.scene.add.image(this._boosterArr[0].x, this._boosterArr[0].y, "booster").setScale(2.2)
      this._boosterArr.push(boosterImg);
   }


   _destroyUIElements() {
      this._scoreBoard.destroy();
      this._scoreText.destroy();
   }


   _addResultPanel() {

      var typeStr;
      //@ts-ignore
      if(this.scene._isHighScore)
         typeStr = "High Score";
      else
         typeStr  = "Your Score"
      this._yourScoreTxt = this.scene.add.text(
         this.scene.cameras.main.width * .5,
         this.scene.cameras.main.height * .5,
         typeStr)
         .setFontFamily("RussoOne")
         .setColor("#FFFFFF")
         .setFontSize(75)
         .setOrigin(0.5)
         .setWordWrapWidth(900)

      this._yourScore = this.scene.add.text(
         this.scene.cameras.main.width * .5,
         this.scene.cameras.main.height * .55,
         this._score + "")
         .setFontFamily("RussoOne")
         .setColor("#FFFFFF")
         .setFontSize(100)
         .setOrigin(0.5)
         .setWordWrapWidth(900)

         this._destroyUIElements();


         this._addPlayAgainBtn();
   }


   _addPlayAgainBtn() {
      var self = this;
      this._playBtn = this.scene.add.image(this.scene.cameras.main.width * .5,this.scene.cameras.main.height * .68,"startbutton").setScale(2).setInteractive().on('pointerdown', () => {
			self._destroyRestartPanel()
		});
   }


   _destroyRestartPanel() {
      this._playBtn.destroy();
      this._yourScoreTxt.destroy();
      this._yourScore.destroy();
      //@ts-ignore
      this.scene._isGameOver = false;
//@ts-ignore
      console.log("restart",this.scene)

      this._reloadUIPanel();

   }


   _reloadUIPanel(){
      this._score = 0;
      this._boosterArr = [];
      this._addScoreBoard();
      this._addLifeLines()
      //@ts-ignore
      this.scene._totalLives = 3;
      //@ts-ignore
      this.scene._isHighScore = false;
   }





}




