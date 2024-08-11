import { signal, component } from 'reefjs'
import {WC, html} from '../WC.js'
/**
 * Form component
 * @class
 * @extends WC
 */

class Form extends WC{
    constructor(){
        super()
        this.uuid = crypto.randomUUID()
        this.action = signal("", this.uuid)
        this.method = signal("", this.uuid)
        this._css = html `
        <style>
            .wc-form form{
                background-color: var(--bgColorDark);
                padding: 1em;
                
            }
            .wc-form input {
                font: inherit;
                background-color: var(--textColorDark);
                color: var(--textColorLight);
                border: 1px solid #ccc;
                padding: 0.25em;
                outline: 0;
            }
        </style>`
        component(this, this.template, {signals: [this.uuid]})
        this.classList.add("wc-form")
    }
    static get observedAttributes(){
        return ["action", "method"]
    }
    attributeChangedCallback(name, oldVal, newVal){
        if (name === "action") {
            this.action.value = newVal
        }
        if (name === "method") {
            this.method.value = newVal
        }
    }
    template = () => {
        return this._css + html`<form action="${this.action.value}" method="${this.method.value}">${this.innerHTML}</form>`
    }
    connectedCallback(){
        
    }
}
customElements.define("wc-form", Form)