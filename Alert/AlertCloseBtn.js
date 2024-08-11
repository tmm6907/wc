import {WC} from "../WC.js"
/**
 * Close button component for alerts.
 * @class
 * @extends WC
 */

class AlertCloseBtn extends WC{
    constructor(){
        super()
        this._styles = html`
        <style>
        button {
            background-color: var(--bgColorLight, red);
            padding: 0.5em;
            border:0;
            border-radius: 0.25em;
        }
        button:hover,
        button:active,
        button:focus {
            outline: none;
            box-shadow: var(--boxShadowHighlight, red);
        }
        </style>
        `
        this._html = `
        <button class="wc-alert-close">${this.innerHTML}</button>
        `
        this.innerHTML = this._styles + this._html
        this.btn = this.querySelector("button")
        this.btn.addEventListener("click", () => {
            this.parentElement.remove()
        })
    }
    static get observedAttributes(){
        return []
    }
    attributeChangedCallback(name, oldVal, newVal){
        
    }
    connectedCallback(){
        
    }
}
customElements.define("wc-alert-close", AlertCloseBtn)