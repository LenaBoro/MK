import {createElement} from "./utils/createElement.js";
import {generateLogs} from "./logs.js";

const chat = document.querySelector('.chat');

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

    elHP = () => {
        let class_player = '.player' + this.player;
        return document.querySelector(class_player + ' .life');
    };

    renderHP = () => {
        return this.elHP().style.width = this.hp + '%';


    };
    changeHP = (value) => {
        if (this.hp >= 0) {
            this.hp -= value;
        } else {
            this.hp = 0;
        }
    };

    chHp({hit: hit, defence: defence, player1, player2}) {
        (async () => {
            const rawResponse = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
                method: 'POST',
                body: JSON.stringify({
                    hit: hit,
                    defence: defence,
                })
            });

            const content = await rawResponse.json();
            if (content.player1.hit !== content.player2.defence) {
                player1.changeHP(content.player1.value);
                generateLogs('hit', player1, player2, chat);
            }
            if (content.player1.defence !== content.player2.hit) {
                player2.changeHP(content.player1.value);
                generateLogs('defence', player1, player2, chat);
            }

        })();
    }


}
