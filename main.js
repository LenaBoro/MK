document.addEventListener("DOMContentLoaded", function (event) {
    //0
    const player1 = {
        name: 'SCORPION',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        weapon: ['1', '2', '3', '4'],
        attack: function () {
            console.log(`${this.name} + ‘Fight...`)
        }
    };
    const player2 = {
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

        let player = document.createElement('div');
        player.classList.add(playerName);

        let player_progressbar = document.createElement('div');
        player_progressbar.classList.add('progressbar');

        let player_character = document.createElement('div');
        player_character.classList.add('character');

        let player_live = document.createElement('div');
        player_live.classList.add(playerObj.hp);

        let player_name = document.createElement('div');
        player_name.classList.add(playerObj.name);

        let player_img = document.createElement('img');
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