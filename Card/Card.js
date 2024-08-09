/**
 * Card comopponent
 * @class
 * @extends HTMLElement
 */

class Card extends HTMLElement{
    constructor(){
        super()
    }
    static get observedAttributes(){
        return []
    }
    attributeChangedCallback(name, oldVal, newVal){
        
    }
    connectedCallback(){
        
    }
}
customElements.define("wc-card", Card)