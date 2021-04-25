import {createElement} from "./utils/createElement.js";

export const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

export class Player {
    constructor(props) {
        this.name = props.name;
        this.player = props.player;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;
        this.rootSelector = props.rootSelector
    }

    createPlayer = () => {
        const player = createElement('div', 'player' + this.player);
        const player_progressbar = createElement('div', 'progressbar');
        const player_character = createElement('div', 'character');
        const player_live = createElement('div', 'life');
        const player_name = createElement('div', this.name);
        const player_img = createElement('img', this.name);

        player_img.setAttribute('src', this.img);

        player_progressbar.appendChild(player_live);
        player_progressbar.appendChild(player_name);

        player_character.appendChild(player_img);

        player.appendChild(player_progressbar);
        player.appendChild(player_character);

        const root = document.querySelector(this.rootSelector);
        root.appendChild(player);

        return player;
    };

    attack = () => {
        console.log(`${this.name} + ‘Fight...`)
    };

    changeHP = (randomInt) => {
        if (this.hp >= 0) {
            this.hp -= randomInt;
        } else {
            this.hp = 0;
        }
    };

    elHP = () => {
        let class_player = '.player' + this.player;
        return document.querySelector(class_player + ' .life');
    };

    renderHP = () => {
        return this.elHP().style.width = this.hp + '%';
    };


}