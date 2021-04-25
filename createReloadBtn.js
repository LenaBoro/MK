import {createElement} from "./utils/createElement.js";

export const createReloadButton = () => {
    const btn_block = createElement('div', 'reloadWrap');
    const btn = createElement('button', 'button-restart');

    btn.innerText = 'Restart';
    btn.setAttribute('onclick', 'window.location.reload()');
    btn_block.appendChild(btn);

    return btn_block;
}