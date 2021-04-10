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

    let player_wins = player1.name;


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

    function changeHp(playerObj) {
        const player_life = document.querySelector('.player' + playerObj.player + ' .life');

        if (playerObj.hp > 0) {
            playerObj.hp -= getRandomInt(1, 20);
            player_life.style.width = playerObj.hp + '%';
        } else {
            btn_random.disabled = true;
            player_life.style.width = 0 + '%';

            comparePlayerHp(player1, player2);
        }
    }

    function comparePlayerHp(playerObj1, playerObj2) {
        if (playerObj2.hp > playerObj1.hp) {
            player_wins = playerObj2.name;
        }

        arena.appendChild(playerWin(player_wins))
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
        changeHp(player1);
        changeHp(player2);
    })
});