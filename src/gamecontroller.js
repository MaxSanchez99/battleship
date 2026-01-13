import Gameboard from "./gameboard";
import Player from "./player";
import Domcontroller from "./domcontroller";

const Gamecontroller = (() => {
    let player;
    let computer;
    let currentPlayer;

    const startGame = () => {
        player = new Player(true);
        computer = new Player(false);

        // Temporary place ship
        player.gameboard.placeShip(5, [0, 0], 'right');
        player.gameboard.placeShip(4, [0, 8], 'down');
        player.gameboard.placeShip(3, [7, 4], 'right');
        player.gameboard.placeShip(3, [3, 2], 'down');
        player.gameboard.placeShip(2, [9, 3], 'right');

        // Temporary place ship
        computer.gameboard.placeShip(5, [0, 0], 'right');
        computer.gameboard.placeShip(4, [0, 8], 'down');
        computer.gameboard.placeShip(3, [7, 4], 'right');
        computer.gameboard.placeShip(3, [3, 2], 'down');
        computer.gameboard.placeShip(2, [9, 3], 'right');


        currentPlayer = player;
        Domcontroller.render(player, computer);
        Domcontroller.showTurn(true);

    }

    const movePlayed = (coordinates, attacker) => {
        console.log(`Attacker: ${attacker.isPlayer}`)
        const [row, col] = coordinates;

        const enemy = currentPlayer === player? computer : player;
        const board = enemy.gameboard.board

        if (board[row][col].hit !== false){
            return;   
        }
        enemy.gameboard.receiveAttack(coordinates);
        Domcontroller.render(player, computer);

        // Check if move caused all sunk
        if (enemy.gameboard.allSunk()){
            Domcontroller.gameOver(attacker);
        }


        currentPlayer = enemy;
        if (currentPlayer === player){
            Domcontroller.showTurn(true);
        }
        else{
            Domcontroller.showTurn(false);

            setTimeout(() => {
                computerMove();
            }, 500);
            
        }
    }

    const computerMove = () => {
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);

        while (player.gameboard.board[row][col].hit === true){
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10); 
        } 

        movePlayed([row, col], computer);
    }
    
    return { startGame, movePlayed, computerMove };

})();

export default Gamecontroller;