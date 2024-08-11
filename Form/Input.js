import {signal, component} from "reefjs"
import {WC, html} from '../WC.js'
/**
 * Form Input component
 * @class
 * @extends WC
 */

class Input extends WC{
    constructor(){
        super()
        this.uuid = crypto.randomUUID()
        this._name = signal("", this.uuid)
        this._type = signal("", this.uuid)
        this._value = signal("", this.uuid)
        this._styles = html`
        <style>
            wc-input[wc-key="${this.uuid}"]{
                font: inherit;
            }
            wc-input[wc-key="${this.uuid}"] input {
                padding: 0.5em;
            }
        </style>
        `
        component(this, this.template, {signals:[this.uuid]})
        this.setAttribute("wc-key", this.uuid)
        this.addEventListener("input", (event)=> {
            this._input = event.target
            console.log(this._input.value)
            this._value.value = this._input.value
        })
    }
    static get observedAttributes(){
        return ["type", "name", "value"]
    }
    attributeChangedCallback(name, oldVal, newVal){
        if (name === "type") {
            this._type.value = newVal
        }
        if (name === "name") {
            this._name.value = newVal
        }
        if (name === "value") {
            this._value.value = newVal
        }

        if (name === "bg-color") {
            this.style.setProperty("--bg-color", newVal)
        }
        if (name === "color") {
            this.style.setProperty("--text-color", newVal)
        }
    }
    template = () => {
        return this._styles + html`<input type="${this._type.value}" name="${this._name.value}" value="${this._value.value}" class="wc-input" key="${this.uuid}">`
    }
    connectedCallback(){
        console.log("connected")
    }
}
customElements.define("wc-input", Input)