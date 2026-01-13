import Gamecontroller from "./gamecontroller";
import Player from "./player";

const Domcontroller = (() => {
    
    const playerGrid = document.getElementById('grid1');
    const computerGrid = document.getElementById('grid2');
    const turnIndicator = document.getElementById('current-player');
    const gameOverModal = document.getElementById('modal-dialog');
    const winnerText = document.getElementById('winner');
    const modalCloseBtn = document.getElementById('close-btn');

    modalCloseBtn.addEventListener('click', () => {
        gameOverModal.close();
        Gamecontroller.startGame();
    })


    const render = (player1, player2) => {

        while (playerGrid.firstChild) {
            playerGrid.removeChild(playerGrid.firstChild);
        }

        while (computerGrid.firstChild) {
            computerGrid.removeChild(computerGrid.firstChild);
        }

        player1.gameboard.board.forEach((row, rowIdx) => {
            row.forEach((obj, col) => {
                const div = document.createElement("div");
                div.classList.add('cell');

                if (obj.ship === null && obj.hit === false){
                    div.classList.add('empty');
                }
                else if (obj.ship === null && obj.hit === true){
                    div.classList.add('empty');
                    div.textContent = 'O';
                }
                else if (obj.ship !== null && obj.hit === false){
                    div.classList.add('ship');
                    
                }
                else {
                    div.classList.add('ship');
                    div.textContent = "X"
                }

                div.addEventListener('click', () => {
                    Gamecontroller.movePlayed([rowIdx, col], player2);
                })
                playerGrid.appendChild(div);
            })
        });

        player2.gameboard.board.forEach((row, rowIdx) => {
            row.forEach((obj, col) => {
                const div = document.createElement("div");
                div.classList.add('cell');

                if (obj.ship === null && obj.hit === false){
                    div.classList.add('empty');
                }
                else if (obj.ship === null && obj.hit === true){
                    div.classList.add('empty');
                    div.textContent = 'O';
                }
                else if (obj.ship !== null && obj.hit === false){
                    div.classList.add('ship');
                    
                }
                else {
                    div.classList.add('ship');
                    div.textContent = "X"
                }

                div.addEventListener('click', () => {
                    Gamecontroller.movePlayed([rowIdx, col], player1);
                })
                computerGrid.appendChild(div);
            })
        });
    }

    const showTurn = (isPlayer1) => {
        if (isPlayer1){
            playerGrid.classList.add('hide');
            computerGrid.classList.remove('hide');
            turnIndicator.textContent = 'Player'
        }
        else {
            playerGrid.classList.remove('hide');
            computerGrid.classList.add('hide');
            turnIndicator.textContent = 'Computer'
        }
    }

    const gameOver = (winner) => {
        if (winner.isPlayer){
            winnerText.textContent = 'Player';
        }
        else {
            winnerText.textContent = 'Computer'
        }

        gameOverModal.showModal();
    }

    return { render, showTurn, gameOver }

})();

export default Domcontroller;