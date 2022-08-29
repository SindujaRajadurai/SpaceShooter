

/*************************************************************************************************************
 * Class handles the Enemy components 
 * Deciding random enemy and its movement 
 * RUnning  a time interval
***************************************************************************************************************/

import EventsManager from "../utilities/EventsManager"

export default class Enemy  extends Phaser.GameObjects.Container {


  _enemyGroup !: any;
  _splEnemyGrp !: any;
  _enemyArr !: Array<any>

  constructor(scene,x,y) {
    super(scene);

    this._enemyGroup = this.scene.physics.add.group({
			bounceX:1,
			bounceY:1
		});

    this._enemyArr = ["enemy1","enemy2"];

   // this._createEnemy();
    this._startSpawnTimer();
    this._startSpecialEnemyTimer();

  }


  _createEnemy() {

    var randomNumber =  Math.floor(Math.random() * this._enemyArr.length);

    // if(this._enemyGroup.getChildren().length == 0) {
			this._enemyGroup = this.scene.physics.add.group({
				key:this._enemyArr[randomNumber],
				frameQuantity: 2,
				collideWorldBounds: false,
        angularVelocity: 2
			});
			var _self  = this;
			this._enemyGroup.children.iterate(function(child) {
	

        var scale = _self._generateRandomFloat(0.15,0.25)
				var xx = Math.floor(Math.random() * _self.scene.cameras.main.displayWidth);
        //@ts-ignore
				var yy = _self._generateRandomInteger(-20,-10)
				var velocityX = Math.floor(Math.random() * 2) -1;
				var velocityY = Math.floor(Math.random() * 10) -1;

	
				if(velocityY ==0 || velocityX == 0) {
					velocityY = 60,
          velocityX = 0;
				}

        child.setScale(scale);


        var overrollSpeed = _self._generateRandomInteger(300,800)

				child.setVelocity(10,overrollSpeed);

				child.x = xx;
				child.y = yy;

        _self.scene.tweens.add({
          targets: child,
          duration: 1500,
          angle: 160,
          yoyo: true,
          repeat: -1,
          ease: "Linear",
          onComplete: function () {
           
          }
        });

			});
      //@ts-ignore
      _self.scene._setColliderGroups();

  }

  _generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max - min + 1))
  }


  _generateRandomFloat(min,max) {
    return (min + Math.random()*(max - min + 1))
  }


  _startSpawnTimer() {
    var self = this;
      var _enemyTimer = this.scene.time.addEvent({
        delay: 1300,
        callback: function () {
          //@ts-ignore
          if(!self.scene._isGameOver) {
          self._createEnemy();
          }
        },
        callbackScope: this,
        loop: true
      });
  }

  _startSpecialEnemyTimer() {
    var self = this;
    var _spclEnemyTimer = this.scene.time.addEvent({
      delay: 7000,
      callback: function () {
          //@ts-ignore
          if(!self.scene._isGameOver) {
        self._createSplEnemy();
          }
      },
      callbackScope: this,
      loop: true
    });
  }

  _createSplEnemy() {

			this._splEnemyGrp = this.scene.physics.add.group({
				key:'splenemy',
				frameQuantity: 2,
				collideWorldBounds: false,
        angularVelocity: 2
			});
			var _self  = this;
			this._splEnemyGrp.children.iterate(function(child) {
	

				var xx = Math.floor(Math.random() * _self.scene.cameras.main.displayWidth);
        //@ts-ignore
				var yy = _self._generateRandomInteger(-20,-10)
				var velocityX = Math.floor(Math.random() * 2) -1;
				var velocityY = Math.floor(Math.random() * 10) -1;

	
				if(velocityY ==0 || velocityX == 0) {
					velocityY = 60,
          velocityX = 0;
				}

        child.setScale(1.5);


        var overrollSpeed = _self._generateRandomInteger(300,800)

				child.setVelocity(10,overrollSpeed);

				child.x = xx;
				child.y = yy;
        //@ts-ignore
        _self.scene._setSplEnemyCollider();

			});
  }


}

