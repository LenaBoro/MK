document.addEventListener("DOMContentLoaded", function () {
    const arena = document.querySelector('.arenas');
    const btn_random = document.querySelector('.button');
    let player1 = {
        player: 1,
        name: 'SCORPION',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        weapon: ['1', '2', '3', '4'],
        attack: function () {
            console.log(`${this.name} + ‘Fight...`)
        }
    };
    let player2 = {
        player: 2,
        name: 'SUB-ZERO',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
        weapon: ['1', '2', '3', '4'],
        attack: function () {
            console.log(`${this.name} + ‘Fight...`)
        }
    };

    let player_wins = '';


    function createElement(tag, classNameTag) {
        const element = document.createElement(tag);
        if (classNameTag) {
            element.classList.add(classNameTag);
        }
        return element;
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

    function changeHp(playerObj1, playerObj2) {
        const player_life1 = document.querySelector('.player' + playerObj1.player + ' .life');
        const player_life2 = document.querySelector('.player' + playerObj2.player + ' .life');

        if (playerObj1.hp > 0 && playerObj2.hp > 0) {
            playerObj1.hp -= getRandomInt(1, 20);
            playerObj2.hp -= getRandomInt(1, 20);
            player_life1.style.width = playerObj1.hp + '%';
            player_life2.style.width = playerObj2.hp + '%';
        } else {
            btn_random.disabled = true;
            if (playerObj2.hp > playerObj1.hp) {
                player_wins = playerObj2.name;
                player_life1.style.width = 0 + '%';
            } else {
                player_wins = playerObj1.name;
                player_life2.style.width = 0 + '%';
            }

            arena.appendChild(playerWin(player_wins))
        }
    }

    function playerLose(name) {
        const lose_block = createElement('div', 'loseTitle');
        lose_block.innerHTML = name + ' lose!';

        return lose_block;
    }

    function playerWin(name) {
        const win_block = createElement('div', 'winTitle');
        win_block.innerHTML = name + ' wins!';

        return win_block;
    }

    arena.appendChild(createPlayer(player1));
    arena.appendChild(createPlayer(player2));


    btn_random.addEventListener('click', function () {
        changeHp(player1, player2);
    })
});