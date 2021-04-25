import {enemyAttack, playerAttack} from './attack.js';
import {createReloadButton} from './createReloadBtn.js';
import {getRandomInt} from './utils/generateRandomInt.js';
import {Player} from "./players.js";
import {generateLogs} from "./logs.js";
import {playerWin} from "./infoGameEnd.js";

const arena = document.querySelector('.arenas');
const btn_submit = document.querySelector('.btn-submit');
const chat = document.querySelector('.chat');

let player1 = new Player({
    name: 'SUB-ZERO',
    player: 1,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: [1, 2, 3],
    rootSelector: '.arenas'
});
let player2 = new Player({
    name: 'SCORPION',
    player: 2,
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: [1, 2, 3],
    rootSelector: '.arenas'
});

const {name: name1, hp: hp1} = player1;
const {name: name2, hp: hp2} = player2;

export class Game {

    start() {
        player1.createPlayer();
        player2.createPlayer();

        this.handleClick();
        generateLogs('start', player1, player2, chat);

    };


    gameFinished = () => {
        btn_submit.disabled = true;

        if (player1.hp > player2.hp) {
            arena.appendChild(playerWin(name1));

            generateLogs('end', player2, player1, chat);

        } else if (player1.hp < player2.hp) {
            arena.appendChild(playerWin(name2));

            generateLogs('end', player1, player2, chat);

        } else {
            arena.appendChild(playerWin());

            generateLogs('draw', player1, player2, chat);
        }
        arena.appendChild(createReloadButton());
    };

    handleClick = () => {
        btn_submit.addEventListener('click', (e) => {
            e.preventDefault();

            let enemy_attack = enemyAttack(getRandomInt(1, 3) - 1);
            let player_attack = playerAttack();


            if (player_attack.defence !== enemy_attack.hit) {
                player1.changeHP(getRandomInt(1, 20));
                player1.renderHP();
                generateLogs('hit', player2, player1, chat)

            }

            if (player_attack.hit !== enemy_attack.defence) {
                player2.changeHP(getRandomInt(1, 20));
                player2.renderHP();
                generateLogs('defence', player1, player2, chat)
            }
            if (player1.hp <= 0 || player2.hp <= 0) {
                this.gameFinished();
            }
        });
    }


}