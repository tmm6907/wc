
/**
 * Grid web component.
 * @class Grid
 * @extends HTMLElement
 */
customElements.define("wc-grid", class Grid extends HTMLElement {
    /**
     * @constructor
     */
    constructor() {
        super()
        /**
         * @type {string}
         * @property {string}
         */
        this.gap = "0.5em";
        /**
         * @type {string}
         * @property {string}
         */
        this.gapRow = this.gap;
        /**
         * @type {string}
         * @property {string}
         */
        this.gapCol = this.gap;
        /**
         * @type {string}
         * @property {string}
         */
        this.direction = ""
        /**
         * @type {Set<string>}
         * @property {Set<string>}
         */
        this.acceptedDirections = new Set(["column", "row", "row-dense"])
        /**
         * @type {string}
         * @property {string}
         */
        this._css = `
        <style>
        .wc-grid{
            display: grid;
            gap: ${this.gap};
        }
        .wc-gap-1{
            gap: 0.5em;
        }
        .wc-row-gap-1{
            
            row-gap: 0.5em;
        }
        .wc-col-gap-1{
            
            column-gap: 0.5em;
        }
        .wc-row-gap-2{
            
            row-gap: 1em;
        }
        .wc-col-gap-2{
            
            column-gap: 1em;
        }
            
        .wc-gap-3{
            gap: 1.5em;
        }
        .wc-row-gap-3{
            
            row-gap: 1.5em;
        }
        .wc-gap-4{
            gap: 2em;
        }
        .wc-row-gap-4{
            
            row-gap: 2em;
        }
        .wc-gap-5{
            gap: 2.5em;
        }
        .wc-row-gap-5{
            
            row-gap: 2.5em;
        }
        
        .grid-row{
            grid-auto-flow: row;
        }
        
        .grid-column{
            grid-auto-flow: column;
        }
        
        .grid-row-dense{
            grid-auto-flow: row dense;
        }
        
        .wc-col-1{
            grid-template-columns: repeat(1, 1fr);
        }
        .wc-col-2{
            grid-template-columns: repeat(2, 1fr);
        }
        .wc-col-3{
            grid-template-columns: repeat(3, 1fr);
        }
        .wc-col-4{
            grid-template-columns: repeat(4, 1fr);
        }
        .wc-col-5{
            grid-template-columns: repeat(5, 1fr);
        }
        .wc-col-6{
            grid-template-columns: repeat(6, 1fr);
        }
        .wc-col-7{
            grid-template-columns: repeat(7, 1fr);
        }
        .wc-col-8{
            grid-template-columns: repeat(8, 1fr);
        }
        .wc-col-9{
            grid-template-columns: repeat(9, 1fr);
        }
        .wc-col-10{
            grid-template-columns: repeat(10, 1fr);
        }
        .wc-col-11{
            grid-template-columns: repeat(11, 1fr);
        }
        .wc-col-12{
            grid-template-columns: repeat(12, 1fr);
        }
        </style>
        `
        /**
         * @type {string}
         * @property {string} innerHTML
         * @public
         */
        this.innerHTML = this._css + this.innerHTML
        this.classList.add("wc-grid")
    }

    static get observedAttributes() {
        return ["gap", "row-gap", "col-gap", "direction"]
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name == "gap") {
            this.gap = newVal
            console.log("Gap:", this.gap)
            this._applyGap()
        }
        if (name == "row-gap") {
            this.gapRow = newVal
            console.log("row-gap:", this.gapRow)
            this._applyGapRow()
        }
        if (name == "col-gap") {
            this.gapCol = newVal
            console.log("col-gap:", this.gapCol)
            this._applyColGap()
        }
        if (name == "direction" && this.acceptedDirections.has(newVal)) {
            this.direction = newVal
            console.log("direction:", this.direction)
            this._applyDirection()
        }
    }

    /**
     * Applies gap class to component based on gap attr.
     * @memberof Grid
     * @private
     */
    _applyGap() {
        let numVal
        try {
            numVal = parseInt(this.gap, 10)
        } catch (e) {
            console.error("Invalid gap value!")
        }

        if (numVal > 5 || numVal < 1) console.error("Invalid gap value!")

        this.classList.add(`wc-gap-${this.gap}`)
    }
    /**
     * Applies row-gap class to component based on row-gap attr.
     * @memberof Grid
     * @private
     */
    _applyGapRow() {
        let numVal
        try {
            numVal = parseInt(this.gapRow, 10)
        } catch (e) {
            console.error("Invalid row-gap value!")
        }

        if (numVal > 5 || numVal < 1) console.error("Invalid row-gap value!")

        this.classList.add(`wc-row-gap-${this.gapRow}`)
    }
    /**
     * Applies col-gap class to component based on col-gap attr.
     * @memberof Grid
     * @private
     */
    _applyColGap() {
        let numVal
        try {
            numVal = parseInt(this.gapCol, 10)
        } catch (e) {
            console.error("Invalid col-gap value!")
        }

        if (numVal > 5 || numVal < 1) console.error("Invalid col-gap value!")

        this.classList.add(`wc-col-gap-${this.gapCol}`)
    }

    /**
     * Applies direction class to component based on direction attr.
     * @memberof Grid
     * @private
     */
    _applyDirection() {
        this.style.gridAutoFlow = this.direction
    }

    connectedCallback() {
    }
})


customElements.define("wc-item", class Item extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `
        <div class="wc-tooltip-container">
            <div class="wc-tooltip-text">${this.text}</div>
        </div>
        `

    }

    static get observedAttributes() {
        return ["text"]
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name == "text") {
            this.text = newVal
        }
    }
})
