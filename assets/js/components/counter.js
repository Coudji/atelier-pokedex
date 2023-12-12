export default class Counter extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.render();
    }

    render(){
        const value = this.getAttribute('val');

        this.innerHTML = `
            ${value}
        `;
    }

    static get observedAttributes() {
        return ['val'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }
}