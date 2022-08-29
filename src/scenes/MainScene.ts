
/************************************************************************************************************
 * Main scene -- Phaser scene
***************************************************************************************************************/


import Phaser, { Time } from 'phaser';
import EventsManager from "../utilities/EventsManager"

import Player from "../componenents/Player"
import Enemy from '~/componenents/Enemy';
import Background from '~/componenents/Background';
import ForeGround from '~/componenents/Foreground';
import PowerUp from '~/componenents/PowerUp';
import UI from "../componenents/ui"



export default class MainScene extends Phaser.Scene
{

	public _emitter : any;
	_backGround !: Phaser.GameObjects.Image;
	_title !: Phaser.GameObjects.Image;
	_playBtn !: Phaser.GameObjects.Image;
	_playerObj !: any;
	_enemyObj !: any;
	_backGroundObj !: any;
	_foreGroundObj !: any;
	_powerUpObj !: any;
	_uiObj !: any;
	_isGameOver !: Boolean;

	_isGameStarted : Boolean;

	_bestScore : any;

	_totalLives : number;

	_isHighScore : Boolean;

	 
	constructor()
	{
		super('MainScene')
		this._emitter = EventsManager.getInstance();
		this._isGameStarted = false;
		this._totalLives = 3;
		this._isGameOver = false;
		this._isHighScore = false;
		
	}

	create() {
		var self = this;
		this._backGround = this.add.image(this.cameras.main.width * .54,this.cameras.main.height* .45,"background").setScale(2.5);
		this._title = this.add.image(this.cameras.main.width * .5,this.cameras.main.height * .25,"logo").setScale(2.3);
		this._playBtn = this.add.image(this.cameras.main.width * .5,this.cameras.main.height * .6,"startbutton").setScale(2).setInteractive().on('pointerdown', () => {
			self._destroyWelcomeScreen();
		});
		this._playBtnIdle();

         this._bestScore = 0;
	
	}

	_destroyWelcomeScreen() {
		var self = this;
		this.tweens.add({
			targets: [this._backGround,this._playBtn,this._title],
			duration: 300,
			alpha: 0,
			ease: "Linear",
			onComplete: function () {
				self._loadGamePlay();
			}
		});
	}

	_playBtnIdle() {
		this.tweens.add({
			targets: this._playBtn,
			duration: 1000,
			scale: 2.4,
			yoyo: true,
			repeat: -1,
			ease: "Linear",
			onComplete: function () {
			 
			}
		});
	}

	_loadGamePlay() {
		this._backGroundObj = new Background(this,0,0) 
		this._foreGroundObj = new ForeGround(this,0,0)
	 	this._playerObj =	new Player(this,0,0)
		this._enemyObj  = new Enemy(this,0,0)	
		this._powerUpObj = new PowerUp(this,0,0)

		this._uiObj = new UI(this,0,0);

	}


	update(time: number, delta: number) {

		var _self = this;

		if(!this._isGameOver) {

		if(this._isGameStarted) {



		if (this._playerObj._bulletGroup.getChildren().length != 0) {
			this._playerObj._bulletGroup.children.iterate(function (child) {
				if (child != undefined) {
					if (child.y > _self.cameras.main.height * 1.5)
						child.destroy();
				}
			})
		}


		
		if (this._enemyObj._enemyGroup.getChildren().length != 0) {
			this._enemyObj._enemyGroup.children.iterate(function (child) {
				if (child != undefined) {
					if (child.y < -_self.cameras.main.height * 4.5)
						child.destroy();
				}
			})
		}


		// if (this._enemyObj._splEnemyGrp.getChildren().length != 0) {
		// 	this._enemyObj._splEnemyGrp.children.iterate(function (child) {
		// 		if (child != undefined) {
		// 			if (child.y < -_self.cameras.main.height * 4.5)
		// 				child.destroy();
		// 		}
		// 	})
		// }


		// if (this._powerUpObj._powerUpGrp.getChildren().length != 0) {
		// 	this._powerUpObj._powerUpGrp.children.iterate(function (child) {
		// 		if (child != undefined) {
		// 			if (child.y < -_self.cameras.main.height * 4.5)
		// 				child.destroy();
		// 		}
		// 	})
		// }

		this._backGroundObj._gamePlayBg.tilePositionY -= 0.5


		

		}
	}


    }



	_setColliderGroups() {

		if(!this._isGameOver) {
		if(this._isGameStarted) {
			//@ts-ignore
		this.physics.add.collider(this._enemyObj._enemyGroup,this._playerObj._bulletGroup,this._playExplosion,null,this);
		//@ts-ignore
		this.physics.add.collider(this._enemyObj._enemyGroup,this._playerObj._player,this._deductLives,null,this);

		}
	}
	}


	_setSplEnemyCollider() {
		if(!this._isGameOver){
		//@ts-ignore
		this.physics.add.collider(this._enemyObj._splEnemyGrp,this._playerObj._bulletGroup,this._playDoubleExplosion,null,this);
		//@ts-ignore
		this.physics.add.collider(this._enemyObj._splEnemyGrp,this._playerObj._player,this._deductLives,null,this);
		}


	}


	_setPowerUpCollider() {
		if(!this._isGameOver) {
			//@ts-ignore
		this.physics.add.collider(this._powerUpObj._powerUpGrp,this._playerObj._player,this._powerUpActivated,null,this);
		}
	}


	_playExplosion(enemy,bullet) {

		if(!this._isGameOver) {
		this._uiObj._updateScoreText(1);
		bullet.destroy();

		this.tweens.add({
			targets: enemy,
			duration: 200,
			scale: 0,
			ease: "Linear",
			onComplete: function () {
				enemy.destroy();
			}
		});

		var explosionPng = this.add.image(enemy.x,enemy.y,"explosionEffect").setScale(0);

		this.tweens.add({
			targets: explosionPng,
			duration: 200,
			scale: 3,
			rotate: 180,
			ease: "Linear",
			onComplete: function () {
				explosionPng.destroy();
			}
		});
	}
	}

	_playDoubleExplosion(enemy,bullet) {
		bullet.destroy();
		this._uiObj._updateScoreText(10);

		this.tweens.add({
			targets: enemy,
			duration: 200,
			scale: 0,
			ease: "Linear",
			onComplete: function () {
				enemy.destroy();
			}
		});

		var explosionPng = this.add.image(enemy.x,enemy.y,"explosionEffect").setScale(0);

		this.tweens.add({
			targets: explosionPng,
			duration: 200,
			scale: 5,
			rotate: 180,
			ease: "Linear",
			onComplete: function () {
				explosionPng.destroy();
			}
		});
	}

	_deductLives(player,enemy) {
		console.log("deductLives")
		this.cameras.main.shake(400, 0.02, true);
		this._totalLives--;
		
		var explosionPng = this.add.image(enemy.x,enemy.y,"explosionEffect").setScale(0);
		enemy.destroy();

		this.tweens.add({
			targets: explosionPng,
			duration: 200,
			scale: 1.25,
			rotate: 180,
			ease: "Linear",
			onComplete: function () {
				explosionPng.destroy();
			}
		});

		if(!this._isGameOver) {
		if(this._totalLives == 0) {
			this._uiObj._removeLifeLine();
			this._endGame();
		} else 
			this._uiObj._removeLifeLine();
		}

	}

	_powerUpActivated(player,powerUp) {
		if(!this._isGameOver) {
			powerUp.destroy();
			this._totalLives++;
			this._uiObj._addLifeLine();
		}
	}


	_endGame() {
		this._isGameOver = true;
		console.log("gameOver")
		

		
        if (this._uiObj._score > this._bestScore) {
        	this._bestScore = this._uiObj._score;
			this._isHighScore = true;
        }


		this._uiObj._addResultPanel();


		
	}


}




