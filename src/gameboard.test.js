import Gameboard from "./gameboard";

test("Placement of a ship horizontally", () => {
    const gameboard = new Gameboard();
    
    gameboard.placeShip(3, [0, 0], 'right');

    const coord = [[0, 0], [0, 1], [0, 2]];

    coord.forEach(([x, y]) => {
        expect(gameboard.board[x][y]).not.toBeNull();
    })
});

test("Placement of a ship vertically", () => {
    const gameboard = new Gameboard();
    
    gameboard.placeShip(2, [0, 0], 'down');

    const coord = [[0, 0], [1, 0]];

    coord.forEach(([x, y]) => {
        expect(gameboard.board[x][y]).not.toBeNull();
    })
});

test("Ship not placed if overlap occurs", () => {
    const gameboard = new Gameboard();
    
    
    gameboard.placeShip(3, [0, 0], 'right');
    let placed = gameboard.placeShip(2, [0, 0], 'down');

    expect(placed).toBe(false);

});

test("Ship gets attacked", () => {
    const gameboard = new Gameboard();

    gameboard.placeShip(3, [0, 0], 'right');
    gameboard.receiveAttack([0, 0]);
    
    const ship = gameboard.board[0][0];
    expect(ship.hits).toBe(1);
});

test("Missed shot", () => {
    const gameboard = new Gameboard();

    gameboard.placeShip(3, [0, 0], 'right');
    gameboard.receiveAttack([1, 0]);
    
    const ship = gameboard.board[0][0];
    expect(ship.hits).toBe(0);
    expect(gameboard.missedShots.length).toBe(1)
});

test("Checks if all ships have sunk", () => {
    const gameboard = new Gameboard();
    
    gameboard.placeShip(2, [0, 0], 'right');
    gameboard.placeShip(1, [9, 9], 'down');
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([9, 9]);

    expect(gameboard.allSunk()).toBe(true);
});