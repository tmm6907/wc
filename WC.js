/**
 * Base web component.
 * @class
 * @extends HTMLElement
 */

export default class WC extends HTMLElement {
    constructor() {
        super()
    }
    static get observedAttributes() {
        return []
    }
    attributeChangedCallback(name, oldVal, newVal) {

    }
    connectedCallback() {
        // this.watch("count")
        // console.dir(this.count)
        // this.props.count = 0
    }
}

customElements.define("wc-base", WC)