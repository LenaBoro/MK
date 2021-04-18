document.addEventListener("DOMContentLoaded", function () {
    const logs = {
        start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
        end: [
            'Результат удара [playerWins]: [playerLose] - труп',
            '[playerLose] погиб от удара бойца [playerWins]',
            'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
        ],
        hit: [
            '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
            '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
            '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
            '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
            '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
            '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
            '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
            '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
            '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
            '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
            '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
            '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
            '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
            '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
            '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
            '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
            '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
            '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
        ],
        defence: [
            '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
            '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
            '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
            '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
            '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
            '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
            '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
            '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
        ],
        draw: 'Ничья - это тоже победа!'
    };
    const arena = document.querySelector('.arenas');
    const btn_submit = document.querySelector('.btn-submit');
    const btn_restart = document.querySelector('.button-restart');
    const chat = document.querySelector('.chat');

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

    function createTime() {
        let date = new Date();
        let minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
        let time = `${date.getHours()}:${minutes}`;

        return time;
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

    function playerAttack() {
        let attack = {};
        let radio_hit = document.querySelectorAll('input[name="hit"]');
        let radio_defence = document.querySelectorAll('input[name="defence"]');

        for (let i = 0; i < radio_hit.length; i++) {
            if (radio_hit[i].checked) {
                attack.hit = radio_hit[i].value;
            }

            if (radio_defence[i].checked) {
                attack.defence = radio_hit[i].value;
            }
        }
        return attack;
    }

    function generateLogs(type, player1, player2) {
        let text_log = '';

        switch (type) {
            case 'start':
                text_log = `${createTime()} ${logs[type].replace('[time]', createTime()).replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)}`;
                break;
            case 'hit':
                text_log = `${createTime()}  ${logs[type][getRandomInt(1, logs.hit.length) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)} ${player2.hp}  ${player2.hp / 100}`;
                break;
            case 'defence':
                text_log = `${createTime()}  ${logs[type][getRandomInt(1, logs.defence.length) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)} ${player1.hp}  ${player1.hp / 100}`;
                break;
            case 'end':
                text_log = `${createTime()} ${logs[type][getRandomInt(1, logs.end.length) - 1].replace('[playerLose]', player1.name).replace('[playerWins]', player2.name)} `;

                break;
            case 'draw':
                text_log = `${createTime()}  ${logs[type][0]}`;

                break;
            default:
                console.log(`Sorry, we are out of ${type}.`);
        }

        const el = `<p>${text_log}</p>`;
        chat.insertAdjacentHTML('afterbegin', el);
    }

    function gameFinished() {
        btn_submit.disabled = true;

        if (player1.hp > player2.hp) {
            arena.appendChild(playerWin(player1.name));

            generateLogs('end', player2, player1);

        } else if (player1.hp < player2.hp) {
            arena.appendChild(playerWin(player2.name));

            generateLogs('end', player1, player2);

        } else {
            arena.appendChild(playerWin());

            generateLogs('draw', player1, player2);
        }
        arena.appendChild(createReloadButton());
    }

    btn_submit.addEventListener('click', function (e) {
        e.preventDefault();

        let enemy_attack = enemyAttack(getRandomInt(1, 3) - 1);
        let player_attack = playerAttack();


        if (player_attack.defence !== enemy_attack.hit) {
            player1.changeHP(getRandomInt(1, 20));
            player1.renderHP(player1.elHP());
            generateLogs('hit', player2, player1)
        }

        if (player_attack.hit !== enemy_attack.defence) {
            player2.changeHP(getRandomInt(1, 20));
            player2.renderHP(player2.elHP());
            generateLogs('defence', player1, player2)
        }

        if (player1.hp <= 0 || player2.hp <= 0) {
            gameFinished();
        }


    });

    function initGame() {
        arena.appendChild(createPlayer(player1));
        arena.appendChild(createPlayer(player2));
        generateLogs('start', player1, player2);
    }

    initGame();
});