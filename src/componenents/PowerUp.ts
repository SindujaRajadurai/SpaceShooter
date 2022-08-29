
export default class PowerUp extends Phaser.GameObjects.Container{

    _powerUpGrp !: any;

    constructor(scene,x,y) {
        super(scene);

        this._splPowerTimer();

    }


    _splPowerTimer() {
    var self = this;
    var _powerUpTimer = this.scene.time.addEvent({
      delay: 12000,
      callback: function () {
        //@ts-ignore
        if(!self.scene._isGameOver) {
        self._powerUpTimer();
        }
      },
      callbackScope: this,
      loop: true
    });
    }


    _powerUpTimer() {
        this._powerUpGrp = this.scene.physics.add.group({
            key:'booster',
            frameQuantity: 1,
            collideWorldBounds: false,
            angularVelocity: 2
        });
        var _self  = this;
        this._powerUpGrp.children.iterate(function(child) {


            var xx = Math.floor(Math.random() * _self.scene.cameras.main.displayWidth);
    //@ts-ignore
            var yy = _self._generateRandomInteger(-20,-10)
            var velocityX = Math.floor(Math.random() * 2) -1;
            var velocityY = Math.floor(Math.random() * 10) -1;


            if(velocityY ==0 || velocityX == 0) {
                velocityY = 60,
      velocityX = 0;
            }

    child.setScale(2.5);


    var overrollSpeed = _self._generateRandomInteger(300,800)

            child.setVelocity(10,overrollSpeed);

            child.x = xx;
            child.y = yy;
    //@ts-ignore
    _self.scene._setPowerUpCollider();

        });
    }

    _generateRandomInteger(min, max) {
        return Math.floor(min + Math.random()*(max - min + 1))
      }
    
}
    
