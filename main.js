document.addEventListener("DOMContentLoaded", function (event) {
    //0
    let player1 = {
        name: 'SCORPION',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        weapon: ['1', '2', '3', '4'],
        attack: function () {
            console.log(`${this.name} + ‘Fight...`)
        }
    };
    let player2 = {
        name: 'SUB-ZERO',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
        weapon: ['1', '2', '3', '4'],
        attack: function () {
            console.log(`${this.name} + ‘Fight...`)
        }
    };


    //1
    function createPlayer(playerName, playerObj) {

        const player = document.createElement('div');
        player.classList.add(playerName);

        const player_progressbar = document.createElement('div');
        player_progressbar.classList.add('progressbar');

        const player_character = document.createElement('div');
        player_character.classList.add('character');

        const player_live = document.createElement('div');
        player_live.classList.add(playerObj.hp);

        const player_name = document.createElement('div');
        player_name.classList.add(playerObj.name);

        const player_img = document.createElement('img');
        player_img.setAttribute('src', playerObj.img);

        player_progressbar.appendChild(player_live);
        player_progressbar.appendChild(player_name);

        player_character.appendChild(player_img);

        player.appendChild(player_progressbar);
        player.appendChild(player_character);

        document.querySelector('.arenas').appendChild(player);
    }

    createPlayer('player1', player1);
    createPlayer('player2', player2);
});