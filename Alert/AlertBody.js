/**
 * Alert body component
 * @class
 * @extends HTMLElement
 */

class AlertBody extends HTMLElement{
    constructor(){
        super()
        this._css = `
        <style>
        
        </style>
        `
        this.innerHTML = this._css + this.innerHTML
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