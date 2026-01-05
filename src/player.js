import Gameboard from "./gameboard";

export default class Player {
    constructor (type) {
        this.isPlayer = type;
        this.gameboard = new Gameboard();
    }
}