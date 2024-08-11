import {WC} from "../WC.js"
/**
 * Alert body component
 * @class
 * @extends WC
 */

class AlertBody extends WC{
    constructor(){
        super()
        this._styles = html`
        <style>
        
        </style>
        `
        this.innerHTML = this._styles + this.innerHTML
    }
    static get observedAttributes(){
        return []
    }
    attributeChangedCallback(name, oldVal, newVal){
        
    }
    connectedCallback(){
        
    }
}
customElements.define("wc-alert-body", AlertBody)