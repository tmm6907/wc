import {WC} from "../WC.js"
/**
 * ButtonGroup component
 * @class
 * @extends WC
 */
class ButtonGroup extends WC {
    constructor(){
        super()
        this.innerHTML = this._styles + this.innerHTML
    }
    connectedCallback(){
        this.classList.add("wc-btn-group")
    }
}

customElements.define("wc-button-group", ButtonGroup)

let btnGrp = new ButtonGroup()