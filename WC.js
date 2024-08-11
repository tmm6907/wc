/**
 * Enables html template literals.
 * @param {TemplateStringsArray} strings - Array of template string literals
 * @param {...any} values - Values to be inserted into template
 * @return {string} returns html template string
 * @example html`<div>${count}</div>`
 */
export const html = (strings, ...values) => {
    return strings[0] + values.map((value, i) => {
        return value + strings[i+1]
    }).join("");
}

/**
 * Base web component.
 * @class
 * @extends HTMLElement
 */
export class WC extends HTMLElement {
    constructor() {
        super()
    }
}
customElements.define("wc-base", WC)