import {signal, component} from "reefjs"
import {WC, html} from "../WC.js"
/**
 * Clock component. Utilizes reef.js to add React-like reactivity.
 * 
 * @class
 * @extends WC
 */
class Clock extends WC {
    constructor() {
        super();
        let now = new Date();
        /** @type {string}*/
        this.uuid = crypto.randomUUID();
        /** @type {reef.signal}*/
        this.time = signal(now.toLocaleTimeString(), this.uuid);
        /** @type {string}*/
        this._color = ""
        /** @type {string}*/
        this._bgColor = ""
        /** @type {string}*/
        this._css = html`
            <style>
                wc-clock {
                display: block;
                width: fit-content;
                color: var(--text-color, black);
                font-weight: bold;
                background-color: var(--bg-color, whitesmoke);
                padding: 1em;
                margin: 1em 0;
                border: 0px #000 solid;
                border-radius: 0.5rem;
            }
            </style>
        `    
    }
    
    static get observedAttributes () {
        return ["color", "bg-color"]
    }  

    template = () => {
        return html`
        ${this._css}
        <div key="${this.uuid}">${this.time.value}</div>
    `;
    }
    
    attributeChangedCallback(attr , oldVal, newVal){
        if (attr == "color" && oldVal !== newVal){
            this._color = newVal
            this.style.setProperty("--text-color", this._color)
            console.log("Color changed to:", this._color)
        }
        if (attr == "bg-color" && oldVal !== newVal){
            this._bgColor = newVal
            this.style.setProperty("--bg-color", this._bgColor)
            console.log("Background Color changed to:", this._bgColor)
        }
        if (attr == "alive"){
            console.log("ALIVE")
        }
    }

    connectedCallback() {
        component(this, this.template, { signals: [this.uuid] });
        window.setInterval(() => {
            this.time.value = new Date().toLocaleTimeString();
        }, 1000);
    }
}
customElements.define("wc-clock", Clock)