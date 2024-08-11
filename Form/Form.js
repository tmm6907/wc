import { signal, component } from 'reefjs'
import { WC, html } from '../WC.js'
/**
 * Form component
 * @class
 * @extends WC
 */

class Form extends WC{
    constructor(){
        super()
        // this.uuid = crypto.randomUUID()
        this._action = signal("", this.uuid)
        this._method = signal("", this.uuid)
        this._styles = html`
        <style>
            wc-form[wc-key="${this.uuid}"] {
                display: block;
                width: fit-content;
                padding: 2em;
                background-color: var(--bg-color, red);
                border-radius: 0.25em;
                color: var(--text-color, black);
            }
            wc-form[wc-key="${this.uuid}"] form {
                margin: 0;
                padding: 0;
                display: flex;
                gap: 1em;
                width: fit-content;
                font: inherit;
            }
        </style>
        `
        // this.setAttribute("wc-key", this.uuid)
        component(this, this.template, {signals: [this.uuid]})
    }
    static get observedAttributes(){
        return ["action", "method", "bg-color"]
    }
    attributeChangedCallback(name, oldVal, newVal){
        if (name === "action") {
            this._action.value = newVal
        }
        if (name === "method") {
            this._method.value = newVal
        }

        if (name === "bg-color") {
            this.style.setProperty("--bg-color", newVal)
        }
        if (name === "color") {
            this.style.setProperty("--text-color", newVal)
        }
    }

    template = () => {
        return this._styles + html`<form type="text" class="wc-form" action="${this._action.value}" method="${this._method.value}">${this.innerHTML}</form>`
    }
    
    connectedCallback(){
        
    }
}
customElements.define("wc-form", Form)