import {WC} from "../WC.js"
/**
 * Button web component
 * @class
 * @extends WC
 */
class Button extends WC {
    /** 
     * @constructor
     * @param {string} [text]
     * @param {Function} [onClick] - onclick handler
     * @param {string} [varient]
    */
    constructor(text, onClick, varient) {
        super()
        /** @type {string}*/
        this._css = `
        <style>
        .wc-btn {
            font: inherit;
            border: 0;
            background-color: white;
            border-radius: 0.25em;
            padding: 0.5em 1em;
            height:fit-content;
            user-select: none;
            -webkit-user-select: none;
        }

        .wc-btn:active,
        .wc-btn:hover,
        .wc-btn:focus{
            background-color: rgb(200, 200, 200);
        }


        .wc-btn-outline {
            font: inherit;
            border: 2px rgb(160, 159, 159) solid;
            border-radius: 0.25em;
            padding: 0.5em 1em;
            user-select: none;
            -webkit-user-select: none;
        }

        .wc-btn-outline:active {
            background-color: rgb(200, 200, 200);
            border: 2px white solid;
        }
        </style>
        `
        if (text) {
            this.innerHTML = this._css
            this.innerText = text
        }else{
            this.innerHTML = this._css + this.innerHTML
        }
        /** @type {CallableFunction}*/
        this._onclickHandler = onClick
        /** @type {string}*/
        if (varient) {
            this.setAttribute("varient", varient)
        }
        this.setAttribute("tabIndex", 0)
        this.setAttribute("role", "button")
        if (onClick && typeof this._onclickHandler === "function"){
            console.log("add click", this.innerText, this._onclickHandler)
            this.addEventListener("click", (event) => {
                this._onclickHandler(event)
            })
        }
        
    }

    static get observedAttributes(){
        return["onlick", "varient"]
    }

    /**
     * Handles varient attr.
     * @param {string} varient
     * @private
     */
    handleVarient(varient) {
        if (varient){
            this.classList.remove("wc-btn")
            console.log("removed class", this.innerText)
        }
        switch(varient) {
            case "outline":
                this.classList.add("wc-btn-outline")
                this._varient = varient
                break
            case "text":
                this.classList.add("wc-btn-text")
                this._varient = varient
                break
            case "contained":
                this._varient = varient
                break
            default:
                this.classList.add("wc-btn")
                console.log("added class", this.innerText)
                break
        }
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name == "onclick") {
            onClick = eval(newVal)
            if (typeof onClick === "function"){
                this._onclickHandler = onClick
                this.addEventListener("click", (event) => {
                    this._onclickHandler(event)
                })
            }
        }

        if (name == "varient") {
            this.handleVarient(newVal)
        }
    }

    doStuff(){
        console.log("Doing stuff")
    }

    connectedCallback() {
        this.handleVarient(this._varient)
    }
}
customElements.define("wc-button", Button)
// const wcBtnGrp = document.querySelector("wc-button-group")
// let btn = new Button("Text", function(e) { this.doStuff() }, "outline");
// wcBtnGrp.appendChild(btn)