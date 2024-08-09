// const {signal, component} = reef;
// /**
//  * ActiveSearch component
//  * @class
//  * @extends HTMLElement
//  */

// class ActiveSearch extends HTMLElement {
//     constructor() {
//         super()
//         this.uuid = crypto.randomUUID()
//         this._results = signal([], this.uuid)
//         this._css = `
//         <style>
//         wc-active-search input {
//             width: 32ch;
//             padding: 1em;
//             height: fit-content;
//             border: 1px solid #000;
//         }
//         wc-active-search ul {
//             display: none;
//             z-index: 2;
//         }
//         wc-active-search li {

//         }
//         </style>
//         `
        
        
//     }
//     static get observedAttributes() {
//         return ["placeholder", "url"]
//     }
//     attributeChangedCallback(name, oldVal, newVal) {
//         switch (name) {
//             case "placeholder":
//                 this.querySelector("input").setAttribute("placeholder", newVal) // this erros due to null
//                 break;
//             case "url":
//                 this.url = newVal
//                 break;
//         }
//     }

//     updateResutls() {
//         // fetch(`/url/path/to/endpoint`) fetch results
//         let res = [
//             "Alice Blue",
//             "Antique White",
//             "Aqua",
//             "Aquamarine",
//             "Coral",
//             "Crimson",
//             "Deep Pink",
//             "Gold",
//             "Goldenrod",
//             "Hot Pink",
//             "Lavender",
//         ]
//         if (res.length != 0) {
//             this.querySelector("ul").style.display = "block"
//         } else {
//             this.querySelector("ul").style.display = "none"
//         }
//         this._results = res
//     }

//     template = () => {
//         return this._css + `
//         <input type="text"/>
//         <ul>${this._results.value.map((result) => `<li>${result}</li>`).join("")}</ul>
//         `
//     }
//     connectedCallback() {
//         this.innerHTML = this.template()
//         component(this, this.template, { signals: [this.uuid] }) // only works if i use the tag name, this doesn't seem to work
//         let input = document.querySelector("wc-active-search input") // this and "this.querySelector("input")" both error due to null unless is inlcude "this.innerHTML = this.template()"
//         input.addEventListener("input", (event) => {
//             let val = event.target.value;
//             if (val.length > 2) {
//                 console.log(val)
//                 this.updateResutls()
//             }
//         })
//     }
// }
// customElements.define("wc-active-search", ActiveSearch)


const {signal, component} = reef;
/**
 * ActiveSearch component
 * @class
 * @extends HTMLElement
 */

class ActiveSearch extends HTMLElement {
    constructor() {
        super()
        this.uuid = crypto.randomUUID()
        this._results = signal([], this.uuid)
        this._css = `
        <style>
        wc-active-search input {
            width: 32ch;
            padding: 1em;
            height: fit-content;
            border: 1px solid #000;
        }
        wc-active-search ul {
            display: none;
            z-index: 2;
        }
        wc-active-search li {

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
                this.querySelector("input").setAttribute("placeholder", newVal) // this erros due to null
                break;
            case "url":
                this.url = newVal
                break;
        }
    }

    updateResutls() {
        // fetch(`/url/path/to/endpoint`) fetch results
        let res = [
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
        if (res.length > 0) {
            this.querySelector("ul").style.display = "block"
//           this code works in place of reef
            // this.querySelector("ul").innerHTML = this._results.map((result) => `<li>${result}</li>`).join("")
        } else {
            this.querySelector("ul").style.display = "none"
        }
        this._results = res
        
    }

    template = () => {
        return this._css + `
        <input type="text"/>
        <ul>${this._results.map((result) => `<li>${result}</li>`).join("")}</ul>
        `
    }
    connectedCallback() {
        this.innerHTML = this.template()  // not supposed to need this from my understanding
        component(this, this.template, { signals: [this.uuid] }) // only works if i use the tag name, this doesn't seem to work
        let input = document.querySelector("wc-active-search input") // this and "this.querySelector("input")" both error due to null unless is inlcude "this.innerHTML = this.template()"
        input.addEventListener("input", (event) => {
            let val = event.target.value;
            if (val.length > 2) {
                console.log(val)
                this.updateResutls()
            } else {
              // in place of reef
              // this.querySelector("ul").innerHTML = ""
            }
        })
    }
}
customElements.define("wc-active-search", ActiveSearch)