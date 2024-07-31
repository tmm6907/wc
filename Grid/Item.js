/**
 * Grid Item component
 * @class
 * @extends HTMLElement
 */
class Item extends HTMLElement {
    constructor() {
        super()
        this.xs = 4
        this._css = `
        <style>
        </style>
        `
        this.innerHTML = this._css + this.innerHTML
        
        // this.style.display = "block"
        // this.style.display = "flex"
        // this.style.height = "100%"
    }

    static get observedAttributes() {
        return ["xs"]
    }

    _applyXS(){
        let prevItem = this.previousElementSibling    
        if (prevItem && prevItem.tagName == "wc-item".toUpperCase()){
            // console.log("prev El:", prevItem)
            let elementEnd = getComputedStyle(prevItem).getPropertyValue("grid-column-end");
            let newStart = parseInt(elementEnd)
            let newEnd = parseInt(this.xs) + newStart
            // console.log("newStart", newStart)
            // console.log("newEnd", newEnd)
            if (newEnd <= 12){
                this.style.setProperty('grid-column-start', newStart);
                this.style.setProperty("grid-column-end", newEnd)
            } else {
                this.style.setProperty('grid-column-start', 1);
                this.style.setProperty("grid-column-end", this.xs != 1 ? this.xs : 2)
            }
            
        } else {
            this.style.setProperty('grid-column-start', 1);
            this.style.setProperty("grid-column-end", this.xs != 1 ? this.xs : 2)
        }
    }
    
    attributeChangedCallback(name, oldVal, newVal) {
        if (name == "xs") {
            this.xs = newVal
            // console.log("xs:", this.xs)
            this._applyXS()
        }
    }
}
customElements.define("wc-item", Item)