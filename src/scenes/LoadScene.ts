import  config  from "../main"

export default class LoadScene extends Phaser.Scene
{

    _bg !: Phaser.GameObjects.Image;
	_logo !: Phaser.GameObjects.Image;
	_loadComplete !: boolean;
	

	constructor()
	{
        super({
			key: 'loader',
			pack: {
				files: [
					{
						type: 'image',
						key: "bg",
						url: "assets/uiBg.png"
					},
					{
						type: 'image',
						key: "logo",
						url: "assets/title.png"
					}
				]
			}
		});
	}

    preload() {	
		this._bg = this.add.image(this.cameras.main.width * .5,this.cameras.main.height * .5,"bg").setScale(2.5);	
		this._logo = this.add.image(this.cameras.main.width * .5,this.cameras.main.height * .2,"logo").setScale(0.5);
		this._loadImages();
		this._loadAnimations();
		this._loadProgressBar();
		this._loadAudios();
    }

	_loadImages() {
		//Welcome screen
		this.load.image("background", "assets/uiBg.png");
		this.load.image("logo","assets/logo.png")
		this.load.image("startbutton","assets/startbutton.png");

		//Game play elements  
		this.load.image("player","assets/player.png");
		this.load.image("bullet","assets/lightDrop.png")

		this.load.image("enemy1","assets/enemy1.png")
		this.load.image("enemy2","assets/enemy3.png")

		//special Enemy 
		this.load.image("splenemy","assets/enemy2.png")

		this.load.image("booster","assets/booster.png")



		this.load.image("gamePlayBg","assets/bg.jpg")

		this.load.image("explosionEffect","assets/explosionEffect.png")

		this.load.image("starDust","assets/stardustBG.png")


		//Foreground Elements 
			this.load.image("planet1","assets/planet1.png")
			this.load.image("planet2","assets/planet2.png")
			this.load.image("planet3","assets/planet3.png")
			this.load.image("planet4","assets/planet4.png")
			this.load.image("planet5","assets/planet5.png")

			this.load.image("meteorBg","assets/meteorBg.png");
			this.load.image("highlighter","assets/lightHIghlight.png");


		//PowerUps
			this.load.image("shieldPowerup","assets/booster.png");

			this.load.image("scoreBar","assets/scoreBar.png");
			this.load.image("lifelineBar","assets/boosterTab.png")


	}

    _loadProgressBar() {
     
		let progressBar = this.add.graphics();
		let progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.1);
		progressBox.fillRect(
			config.scale.width / 2 - 150,
			config.scale.height / 2 - 30,
			320,
			50
		)

		this.load.on("progress", function (value) {
			progressBar.clear();
			progressBar.fillStyle(0x48beff, 1);
			progressBar.fillRect(
				config.scale.width / 2 - 140,
				config.scale.height / 2 - 20,
				300 * value,
				30
			)
		});

		this.load.on("fileprogress", function (file) { });
		this._loadComplete = false;
		var self = this;
		this.load.on("complete", function () {
			 progressBar.destroy();
			 progressBox.destroy();
			 self._logo.destroy();
			 self._bg.destroy();
		});
	}

	_loadAnimations() {
		this.load.atlas('ship', 'assets/ship.png','assets/ship.json');
	}

	_loadAudios(){
		// this.load.audio('commercialBreakSFX', 'assets/soundfiles/commerical-break.ogg');
		// this.load.audio('correctAnswerSFX', 'assets/soundfiles/correct-answer.ogg');
		// this.load.audio('introMusicSFX', 'assets/lets-play.ogg');
		// this.load.audio('phoneafriendSFX', 'assets/soundfiles/phone-a-friend.ogg');
		// this.load.audio('wrongAnswerSFX', 'assets/soundfiles/wrong-answer.ogg');
		// this.load.audio("gameplaySfx","assets/soundfiles/gameplaySfx.ogg")
	}

    create() {
        this.scene.start("MainScene");
    }

	update(time: number, delta: number): void {
		console.log("update")
	}


}


