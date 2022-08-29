import Phaser from 'phaser'

let instance : any = null;

export default class EventsManager extends Phaser.Events.EventEmitter {
    constructor() {
        super();
    }

    static getInstance() {
        if (instance == null) {
            instance = new EventsManager();
        }
        return instance;
    }
}


