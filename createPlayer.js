import {createElement} from "./createElement";

export function createPlayer(playerObj) {
    const player = createElement('div', 'player' + playerObj.player);
    const player_progressbar = createElement('div', 'progressbar');
    const player_character = createElement('div', 'character');
    const player_live = createElement('div', 'life');
    const player_name = createElement('div', playerObj.name);
    const player_img = createElement('img', playerObj.name);

    player_img.setAttribute('src', playerObj.img);

    player_progressbar.appendChild(player_live);
    player_progressbar.appendChild(player_name);

    player_character.appendChild(player_img);

    player.appendChild(player_progressbar);
    player.appendChild(player_character);

    return player;

}
