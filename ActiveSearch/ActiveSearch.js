import {signal, component} from "reefjs"
import {WC, html} from "../WC.js"

/**
 * ActiveSearch component
 * @class
 * @extends WC
 */

class ActiveSearch extends WC {
    constructor() {
        super()
        this._placeholder = signal("Search", this.uuid)
        this.url = signal("", this.uuid)
        this._results = signal([], this.uuid)
        
        this._styles = html`
        <style>
        wc-active-search input {
            width: 32ch;
            padding: 1em;
            height: fit-content;
            border: 1px solid #000;
        }
        wc-active-search ul {
            display: none;
            padding:0.5em;
            width:48ch;
            z-index: 2;
        }
        wc-active-search li {
            background-color: red;
            border: 1px solid #ccc;
            padding:0.5em;
            width:48ch;
            height: fit-content;
            // z-index: 2;
        }
        .show {
            display: block;
        }
        </style>
        `
        
        
        
    }
    static get observedAttributes() {
        return ["placeholder", "url"]
    }
    attributeChangedCallback(name, oldVal, newVal) {
        switch (name) {
            case "placeholder":
                this._placeholder.value = newVal
                break;
            case "url":
                this.url.value = newVal
                break;
        }
    }

    updateResults() {
        // fetch(`/url/path/to/endpoint`) fetch results
        return [
            "Alice Blue",
            "Antique White",
            "Aqua",
            "Aquamarine",
            "Coral",
            "Crimson",
            "Deep Pink",
            "Gold",
            "Goldenrod",
            "Hot Pink",
            "Lavender",
        ]
        
    }

    template = () => {
        console.log("Rendering", this._results.length, this._results.value)
        try{
            return this._styles + html`
            <input type="text" placeholder="${this._placeholder.value}" url="${this.url.value}"/>
            <ul>${this._results.value.map((result) =>html`<li>${result}</li>`).join("")}</ul>
            `
        }
        catch {
            return this._styles + html`
            <input type="text" placeholder="${this._placeholder.value}" url="${this.url.value}"/>
            <ul>${this._results.map((result) =>html`<li>${result.value}</li>`).join("")}</ul>
            `
        } 
        
        // return this._styles + `
        // <input type="text" placeholder="${this._placeholder.value}" url="${this.url.value}"/>
        // <ul>${this._results.value.map((result) => `<li>${result}</li>`).join("") || ""}</ul>
        // `
        
    }
    connectedCallback() {
        component(this, this.template, { signals: [this.uuid] }) // only works if i use the tag name, this doesn't seem to work
        document.addEventListener("input", (event) => {
            let input = event.target
            if (input.parentElement.tagName === "WC-ACTIVE-SEARCH"){
                let resultsList = document.querySelector("wc-active-search ul")
                if (input.value.length > 2) {
                    this._results.value = this.updateResults()
                    resultsList.style.display = "block"
                } else {
                    resultsList.style.display = "none"
                }
            }
            
        })
        
    }
}
customElements.define("wc-active-search", ActiveSearch)