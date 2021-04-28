import {Game} from './game.js';
import {Player} from "./players.js";


let player1;
let player2;


const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player-avatar');
const $avatar1 = document.querySelector('.avatar1');
const $avatar2 = document.querySelector('.avatar2');
const popup = document.querySelector('.popup');

const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach(item => {
                $tag.classList.add(item);
            })
        } else {
            $tag.classList.add(className);
        }

    }

    return $tag;
};

function createEmptyPlayerBlock() {
    const el = createElement('div', ['character', 'div11', 'disabled']);
    const img = createElement('img');
    img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
    el.appendChild(img);
    $parent.appendChild(el);
}

async function init() {
    localStorage.removeItem('player1');

    const players = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());

    const player_comp = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());

    let imgSrc = null;
    createEmptyPlayerBlock();


    players.forEach(item => {
        const el = createElement('div', ['character', `div${item.id}`]);
        const img = createElement('img');

        el.addEventListener('mousemove', () => {
            if (imgSrc === null) {
                imgSrc = item.img;
                const $img = createElement('img');
                $img.src = imgSrc;
                $player.appendChild($img);
            }
        });

        el.addEventListener('mouseout', () => {
            if (imgSrc) {
                imgSrc = null;
                $player.innerHTML = '';
            }
        });

        el.addEventListener('click', () => {
            localStorage.setItem('player1', JSON.stringify(item));
            el.classList.add('active');
            let ls = JSON.parse(localStorage.getItem('player1'));
            let comp = player_comp;

            player1 = new Player({
                name: ls.name,
                player: 1,
                hp: ls.hp,
                img: ls.img,
                weapon: [1, 2, 3],
                rootSelector: '.arenas'
            });
            player2 = new Player({
                name: comp.name,
                player: 2,
                hp: comp.hp,
                img: comp.img,
                weapon: [1, 2, 3],
                rootSelector: '.arenas'
            });

            let img1 = createElement('img');
            img1.setAttribute('src', ls.img);
            let img2 = createElement('img');
            img2.setAttribute('src', comp.img);

            $avatar1.appendChild(img1);


            setTimeout(() => {
                $avatar2.appendChild(img2);
            }, 1500);

            setTimeout(() => {

                popup.style.display = 'none';
                const game = new Game(player1, player2);
                game.start();

            }, 3000);

        });

        img.src = item.avatar;
        img.alt = item.name;

        el.appendChild(img);
        $parent.appendChild(el);
    });
}

init();
