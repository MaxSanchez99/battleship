
import Ship from "./ship.js";

test('Create ship with correct length', () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
})

test('Ship hits lead to sink', () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
})

test('Ship does not sink if not enough hits', () => {
    const ship = new Ship(2);

    expect(ship.isSunk()).toBe(false);
})