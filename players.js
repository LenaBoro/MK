export let player1 = {
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
export let player2 = {
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

export const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};


export function attack() {
    console.log(`${this.name} + ‘Fight...`)
}

//changeHP
export function changeHP(randomInt) {
    if (this.hp >= 0) {
        this.hp -= randomInt;
    } else {
        this.hp = 0;
    }
}

//elHP
export function elHP() {
    let class_player = '.player' + this.player;
    return document.querySelector(class_player + ' .life');
}

//renderHP
export function renderHP(el) {
    return el.style.width = this.hp + '%';
}
