import {WC} from "../WC.js"
/**
 * Card comopponent
 * @class
 * @extends WC
 */

class Card extends WC{
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