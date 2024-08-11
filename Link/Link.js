import {html, WC} from "../WC.js"
/**
 * Link component
 * @class
 * @extends WC
 */

class Link extends WC{
    constructor(){
        super()
        this._styles = html`
        <style>
            a {
                font: inherit;
                text-decoration: none;
                padding: 0;
                margin: 0;
            }
            
            a.padded {
                position: relative;
                display: block;
                width: fit-content;
                padding: 1em;
                background-color: var(--colorPrimary);
                border-radius: 0.25em;
                color: var(--bgColorLight)
            }
            a.padded::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
                cursor: pointer;
            }
        </style>
        `
        this.innerHTML = this._styles + html`
        <a href="">${this.innerHTML}</a>
        `
        this._link = this.querySelector("a")
    }
    static get observedAttributes(){
        return ["padded", "url"]
    }
    attributeChangedCallback(name, oldVal, newVal){
        if (name === "padded") {
            this.querySelector("a").classList.add("padded")
        }
        if (name === "url") {
            this._link.setAttribute("href", newVal)
        }
    }
    connectedCallback(){}
}
customElements.define("wc-link", Link)