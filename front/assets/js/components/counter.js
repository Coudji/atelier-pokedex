import { getActiveUser, getUserById } from "../functions/user.js";
export default class Counter extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['val'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render(){
        const statValue = this.getAttribute('val') || 0;

        this.innerHTML = `
            ${statValue}
        `;
    }
}