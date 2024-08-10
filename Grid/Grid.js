import {WC} from "../WC.js"
/**
 * Grid web component.
 * @class
 * @extends WC
 */
class Grid extends WC {
    constructor() {
        super()
        /**
         * @type {string}
         */
        this.gap = "0.5em";
        /**
         * @type {string}
         */
        this.gapRow = this.gap;
        /**
         * @type {string}
         */
        this.gapCol = this.gap;
        /**
         * @type {string}
         */
        this.direction = ""
        /**
         * @type {Set<string>}
         */
        this.acceptedDirections = new Set(["column", "row", "row dense"])
        /**
         * @type {string}
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
        .wc-col-gap-3{
            column-gap: 1.5em;
        }
        .wc-gap-4{
            gap: 2em;
        }
        .wc-row-gap-4{
            row-gap: 2em;
        }
        .wc-col-gap-4{
            column-gap: 2em;
        }
        .wc-gap-5{
            gap: 2.5em;
        }
        .wc-row-gap-5{
            row-gap: 2.5em;
        }
        .wc-col-gap-5{
            column-gap: 2.5em;
        }
        .wc-column-1{
            grid-template-columns: repeat(1, 1fr);
        }
        .wc-column-2{
            grid-template-columns: repeat(2, 1fr);
        }
        .wc-column-3{
            grid-template-columns: repeat(3, 1fr);
        }
        .wc-column-4{
            grid-template-columns: repeat(4, 1fr);
        }
        .wc-column-5{
            grid-template-columns: repeat(5, 1fr);
        }
        .wc-column-6{
            grid-template-columns: repeat(6, 1fr);
        }
        .wc-column-7{
            grid-template-columns: repeat(7, 1fr);
        }
        .wc-column-8{
            grid-template-columns: repeat(8, 1fr);
        }
        .wc-column-9{
            grid-template-columns: repeat(9, 1fr);
        }
        .wc-column-10{
            grid-template-columns: repeat(10, 1fr);
        }
        .wc-column-11{
            grid-template-columns: repeat(11, 1fr);
        }
        .wc-column-12{
            grid-template-columns: repeat(12, 1fr);
        }
        </style>
        `
        /**
         * @type {string}
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
            // console.log("Gap:", this.gap)
            this._applyGap()
        }
        if (name == "row-gap") {
            this.gapRow = newVal
            // console.log("row-gap:", this.gapRow)
            this._applyGapRow()
        }
        if (name == "col-gap") {
            this.gapCol = newVal
            // console.log("col-gap:", this.gapCol)
            this._applyColGap()
        }
        if (name == "direction" && this.acceptedDirections.has(newVal)) {
            this.direction = newVal
            // console.log("direction:", this.direction)
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
        switch (this.direction){
            case "row dense":
                this.style.gridAutoFlow = this.direction
                this.style.rowGap = 0;
            break
            case "column":
                this.style.gridTemplateColumns = "repeat(12, minmax(8.3% , 1fr))"
            break
            case "row":
                this.style.gridAutoFlow = this.row
            break
        }
    }

    // connectedCallback() {
        
    // }
}
customElements.define("wc-grid", Grid)
