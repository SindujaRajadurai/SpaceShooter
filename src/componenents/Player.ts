
/************************************************************************************************************
 * Handles player movements and handles touch properties
***************************************************************************************************************/

import EventsManager from "../utilities/EventsManager"

export default  class Player extends Phaser.GameObjects.Container {

    _player !: any;
    _bulletGroup !: any;
    _mousePressed !: Boolean;

    _bulletCreation !: Boolean;

    constructor(scene,x,y) {
        super(scene,x,y);
        this._addPlayer();
        this._bulletCreation = false;
    }


    _addPlayer() {

        this._player = this.scene.physics.add.sprite(this.scene.cameras.main.width * .5,this.scene.cameras.main.height* .9,"ship").setScale(1.75).setInteractive();
		this.scene.anims.create({
			key: 'idle',
			frames: [{ key: 'ship', frame: 'player01.png' },
			{ key: 'ship', frame: 'player02.png' },
			{ key: 'ship', frame: 'player03.png' },
			{ key: 'ship', frame: 'player05.png' },
			{ key: 'ship', frame: 'player06.png' },
			{ key: 'ship', frame: 'player08.png' },
			{ key: 'ship', frame: 'player04.png' },
			{ key: 'ship', frame: 'player07.png' }
			],
			frameRate: 10,
			repeat: -1
		});

        this._player.setCollideWorldBounds(true);
        this._player.play("idle")

        this._addTouchEvents();


		this._bulletGroup = this.scene.physics.add.group({
			bounceX:0,
			bounceY:0
		});
    }

    _addTouchEvents() {

        //Desktop
        var self = this;
        var leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

		leftKey.on('down', function (key, event) {
            self._player.setVelocityX(-200);
		});

        leftKey.on('up', function (key, event) {
            self._player.setVelocityX(0);
		});

		var rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		rightKey.on('down', function (key, event) {
				self._player.setVelocityX(200);
		});

        rightKey.on('up', function (key, event) {
            self._player.setVelocityX(0);
		});


        //Mobile
        this._player.on('pointermove', (pointer) => {
            this._player.x = pointer.x;
            
        });
//@ts-ignore
        this.scene.input.on('pointerdown', (pointer) => {
            //@ts-ignore
            if(!this.scene._isGameOver)
            this._createBullets();
        });

        console.log(this._player.input.activePointer);


    }


    _createBullets() {
        var self = this;

          //@ts-ignore
       if(!self.scene._isGameOver) {
        //@ts-ignore
        this.scene._isGameStarted = true;

            this._generateBullets();
          }
    }

    _resetBulletVariable() {
        this._bulletCreation = false;
    }


    _generateBullets() {
        this._bulletCreation = true;
        var dirObject = this._getDirFromAngle(this._player.angle);
        var childY = 0;

        if(this._bulletGroup.children.size != 0) 
                childY = this._bulletGroup.children.entries[this._bulletGroup.children.entries.length -1].y;

		var bullets = this.scene.physics.add.sprite(this._player.x, this._player.y + dirObject.ty * 120 ,"bullet").setScale(0.5);
		this._bulletGroup.add(bullets);
		bullets.angle = this._player.angle;
        bullets.body.setVelocityY(-900)
  
    }

    _destroyPlayer() {
        this._player.destroy();
    }


    _getDirFromAngle(angle) {
		var angleInrad = angle * (Math.PI / 180);
		var tx = Math.cos(angleInrad);
		var ty = Math.sin(angleInrad);
		return {
			tx,
			ty
		}
	}

}

