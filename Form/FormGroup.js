import {WC, html} from "../WC.js"
/**
 * FormGroup component
 * @class
 * @extends WC
 */
class FormGroup extends WC {
    constructor(){
        super()
        // this.uuid = crypto.randomUUID()
        this._styles = html`
            <style>
                wc-form-group[wc-key="${this.uuid}"] {
                    display: block;
                    label {

                    }
                    wc-input, input {

                    }
                }
            </style>
        `
        // this.setAttribute("wc-key", this.uuid)
        this.innerHTML = this._styles + this.innerHTML
    }
    connectedCallback(){
    }
}

customElements.define("wc-form-group", FormGroup)