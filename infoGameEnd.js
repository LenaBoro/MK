import {createElement} from "./utils/createElement.js";

export function playerLose(name) {
    const lose_block = createElement('div', 'loseTitle');
    lose_block.innerHTML = name + ' lose!';

    return lose_block;
}

export function playerWin(name) {
    const win_block = createElement('div', 'winTitle');
    if (name) {
        win_block.innerHTML = name + ' wins!';
    } else {
        win_block.innerHTML = 'draws';
    }
    return win_block;
}
