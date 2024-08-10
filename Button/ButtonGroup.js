import {WC} from "../WC.js"
/**
 * ButtonGroup component
 * @class
 * @extends WC
 */
class ButtonGroup extends WC {
    constructor(){
        super()
        /** 
         * @type {string}
         * @memberof ButtonGroup
        */
        this._css = ""
        this.innerHTML = this._css + this.innerHTML
        
    }
    connectedCallback(){
        this.classList.add("wc-btn-group")
    }
}

customElements.define("wc-button-group", ButtonGroup)

let btnGrp = new ButtonGroup()