import {generateLogs} from './logs.js';
import {player1, player2} from './players.js';
import {enemyAttack, playerAttack} from './attack.js';
import {createReloadButton} from './createReloadBtn.js';
import {playerWin} from './infoGameEnd.js';
import {getRandomInt} from './generateRandomInt.js';
import {createPlayer} from "./createPlayer.js";

document.addEventListener("DOMContentLoaded", function () {

    const arena = document.querySelector('.arenas');
    const btn_submit = document.querySelector('.btn-submit');
    // const btn_restart = document.querySelector('.button-restart');
    const chat = document.querySelector('.chat');
    let {name: name1, hp: hp1} = player1;
    let {name: name2, hp: hp2} = player2;


    // btn_random.addEventListener('click', function () {
    //     player1.changeHP(getRandomInt(1, 20));
    //     player2.changeHP(getRandomInt(1, 20));
    //     player1.renderHP(player1.elHP());
    //     player2.renderHP(player2.elHP());
    //
    //     if (player1.hp <= 0 || player2.hp <= 0) {
    //         // btn_random.disabled = true;
    //
    //         if (player1.hp > player2.hp) {
    //             arena.appendChild(playerWin(player1.name))
    //         } else if (player1.hp < player2.hp) {
    //             arena.appendChild(playerWin(player2.name))
    //         } else {
    //             arena.appendChild(playerWin())
    //         }
    //    //     arena.appendChild(createReloadButton());
    //     }
    //
    // });


    btn_submit.addEventListener('click', function (e) {
        e.preventDefault();

        let enemy_attack = enemyAttack(getRandomInt(1, 3) - 1);
        let player_attack = playerAttack();


        if (player_attack.defence !== enemy_attack.hit) {
            player1.changeHP(getRandomInt(1, 20));
            player1.renderHP(player1.elHP());
            generateLogs('hit', player2, player1, chat)

        }

        if (player_attack.hit !== enemy_attack.defence) {
            player2.changeHP(getRandomInt(1, 20));
            player2.renderHP(player2.elHP());
            generateLogs('defence', player1, player2, chat)
        }
        if (player1.hp <= 0 || player2.hp <= 0) {
            gameFinished();
        }

    });

    function gameFinished() {
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
    }

    function initGame() {
        arena.appendChild(createPlayer(player1));
        arena.appendChild(createPlayer(player2));
        generateLogs('start', player1, player2, chat);
    }

    initGame();
});