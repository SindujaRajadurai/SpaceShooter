
/*************************************************************************************************************
 * Class handles the background sprites
***************************************************************************************************************/


export default class Background extends Phaser.GameObjects.Container{


    _gamePlayBg !: any;

    constructor(scene,x,y) {
        super(scene);
        this._addBg()
    }

    _addBg() {
        this._gamePlayBg = this.scene.add.tileSprite(this.scene.cameras.main.width * .5,this.scene.cameras.main.height * .5,this.scene.cameras.main.width * .5,this.scene.cameras.main.height * .3, "gamePlayBg").setScale(3.5);
        var starBg = this.scene.add.image(this.scene.cameras.main.width * .5,this.scene.cameras.main.height * .5, "starDust").setScale(1.25).setAlpha(0.2)
    }
    
}
    
    