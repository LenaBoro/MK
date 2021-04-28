import {playerAttack} from './attack.js';
import {createReloadButton} from './createReloadBtn.js';
import {generateLogs} from "./logs.js";
import {playerWin} from "./infoGameEnd.js";

const arena = document.querySelector('.arenas');
const btn_submit = document.querySelector('.btn-submit');
const chat = document.querySelector('.chat');


export class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    start() {
        this.player1.createPlayer();
        this.player2.createPlayer();

        this.handleClick();
        generateLogs('start', this.player1, this.player2, chat);

    };


    gameFinished = () => {
        const {name: name1, hp: hp1} = this.player1;
        const {name: name2, hp: hp2} = this.player2;

        btn_submit.disabled = true;

        if (this.player1.hp > this.player2.hp) {
            arena.appendChild(playerWin(name1));

            generateLogs('end', this.player2, this.player1, chat);

        } else if (this.player1.hp < this.player2.hp) {
            arena.appendChild(playerWin(name2));

            generateLogs('end', this.player1, this.player2, chat);

        } else {
            arena.appendChild(playerWin());

            generateLogs('draw', this.player1, this.player2, chat);
        }
        arena.appendChild(createReloadButton());
    };

    handleClick = () => {
        btn_submit.addEventListener('click', (e) => {
            e.preventDefault();

            let player_attack = playerAttack();
            this.player1.chHp({
                hit: player_attack.hit,
                defence: player_attack.defence,
                player1: this.player1,
                player2: this.player2
            });
            this.player1.renderHP();
            this.player2.renderHP();

            if (this.player1.hp <= 0 || this.player2.hp <= 0) {
                this.gameFinished();
            }
        });
    }


}