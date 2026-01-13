import Ship from "./ship.js";

export default class Gameboard {
    constructor () {
        this.board = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ({
            ship: null,
            hit: false
        })));
        this.missedShots = [];
        this.ships = [];
    }

    placeShip (length, start, direction) {

        const ship = new Ship(length);

        const coordinates = [start];

        if (direction === "right"){
            let col = start[1];
            for (let i = col; i < col + length; i++){
                coordinates.push([start[0], i]);
            }
        }
        else {
            let row = start[0];
            for (let i = row; i < row + length; i++){
                coordinates.push([i, start[1]]);
            }
        }

        // verify coordinates with helper function
        if (!(this.verifyShipCoordinates(coordinates))){
            return false;
        }

        coordinates.forEach(([x, y]) => {
            this.board[x][y].ship = ship;
        });

        this.ships.push(ship);
        return true;
    }

    verifyShipCoordinates (coordinates) {
        for (const coord of coordinates){
            if (this.board[coord[0]][coord[1]].ship != null){
                return false;
            }
        }
        return true;
    }

    receiveAttack(coordinate){
        const [x, y] = coordinate
        if (this.board[x][y].ship instanceof Ship) {
            const ship = this.board[x][y].ship;
            ship.hit();
        }
        else {
            this.missedShots.push(coordinate);
        }

        this.board[x][y].hit = true;
    }

    allSunk () {
        return this.ships.every(ship => ship.isSunk() === true);
    }
}