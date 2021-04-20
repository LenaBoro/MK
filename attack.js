import { HIT} from "./players.js";

export const ATTACK = ['head', 'body', 'foot'];

export function enemyAttack(randomInit) {
    let hit = ATTACK[randomInit];
    let defence = ATTACK[randomInit];
    return {
        value: HIT[randomInit],
        hit: hit,
        defence: defence,
    }
}

export function playerAttack() {
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

