document.addEventListener("DOMContentLoaded", function () {
    const arena = document.querySelector('.arenas');
    const btn_submit = document.querySelector('.btn-submit');
    const btn_restart = document.querySelector('.button-restart');

    const HIT = {
        head: 30,
        body: 25,
        foot: 20,
    };
    const ATTACK = ['head', 'body', 'foot'];

    let player1 = {
        player: 1,
        name: 'SCORPION',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        weapon: ['1', '2', '3', '4'],
        attack,
        changeHP,
        elHP,
        renderHP,
    };
    let player2 = {
        player: 2,
        name: 'SUB-ZERO',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
        weapon: ['1', '2', '3', '4'],
        attack,
        changeHP,
        elHP,
        renderHP,
    };

    function attack() {
        console.log(`${this.name} + ‘Fight...`)
    }

    //changeHP
    function changeHP(randomInt) {
        if (this.hp >= 0) {
            this.hp -= randomInt;
        } else {
            this.hp = 0;
        }
    }

    //elHP
    function elHP() {
        let class_player = '.player' + this.player;
        return document.querySelector(class_player + ' .life');
    }

    //renderHP
    function renderHP(el) {
        return el.style.width = this.hp + '%';
    }

//enemyAttack

    function enemyAttack(randomInit) {
        let hit = ATTACK[randomInit];
        let defence = ATTACK[randomInit];
        return {
            value: HIT[randomInit],
            hit: hit,
            defence: defence,
        }
    }

    function createElement(tag, classNameTag) {
        const element = document.createElement(tag);
        if (classNameTag) {
            element.classList.add(classNameTag);
        }
        return element;
    }

    function createReloadButton() {
        const btn_block = createElement('div', 'reloadWrap');
        const btn = createElement('button', 'button-restart');

        btn.innerText = 'Restart';
        btn.setAttribute('onclick', 'window.location.reload()');
        btn_block.appendChild(btn);

        return btn_block;
    }

    function createPlayer(playerObj) {

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

    function getRandomInt(min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    function playerLose(name) {
        const lose_block = createElement('div', 'loseTitle');
        lose_block.innerHTML = name + ' lose!';

        return lose_block;
    }

    function playerWin(name) {
        const win_block = createElement('div', 'winTitle');
        if (name) {
            win_block.innerHTML = name + ' wins!';
        } else {
            win_block.innerHTML = 'draws';
        }

        return win_block;
    }

    arena.appendChild(createPlayer(player1));
    arena.appendChild(createPlayer(player2));

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

        let radio_hit = document.querySelectorAll('input[name="hit"]');
        let radio_defence = document.querySelectorAll('input[name="defence"]');

        let choose_hit = '';
        let choose_defence = '';

        for (let i = 0; i < radio_hit.length; i++) {
            if (radio_hit[i].checked) {
                choose_hit = radio_hit[i].value;
            }

            if (radio_defence[i].checked) {
                choose_defence = radio_hit[i].value;
            }
        }

        if (choose_hit === enemyAttack(getRandomInt(1, 3) - 1).defence ||
            choose_defence === enemyAttack(getRandomInt(1, 3) - 1).hit) {
            return false;
        } else {
            player1.changeHP(getRandomInt(1, 20));
            player2.changeHP(getRandomInt(1, 20));
            player1.renderHP(player1.elHP());
            player2.renderHP(player2.elHP());

        }
        if (player1.hp <= 0 || player2.hp <= 0) {
            btn_submit.disabled = true;

            if (player1.hp > player2.hp) {
                arena.appendChild(playerWin(player1.name))
            } else if (player1.hp < player2.hp) {
                arena.appendChild(playerWin(player2.name))
            } else {
                arena.appendChild(playerWin())
            }
              arena.appendChild(createReloadButton());
        }


    })

});