import WC from "../WC.js"
/**
 * Alert component
 * @class
 * @extends WC
 */
class Alert extends HTMLElement {
    constructor() {
        super()
        /** @type {string}*/
        this._css = `
        <style>
            .alert.alert-light{
                background-color: var(--bgColorLight);
                color: var(--colorDark);
                box-shadow: var(--boxShadowLight);
            }
            .alert.alert-dark{
                background-color: var(--colorDark);
                color: var(--textColorLight);
                box-shadow: var(--boxShadowDark);
            }

            .alert.alert-success{ border-top: 4px var(--colorSuccess) solid;}
            .alert.alert-primary{ border-top: 4px var(--colorPrimary) solid;}
            .alert.alert-warning{ border-top: 4px var(--colorWarning) solid;}
            .alert.alert-danger{ border-top: 4px var(--colorDanger) solid;}
            .alert.alert-primary.icon > :nth-child(2){color: var(--colorPrimary);}
            .alert.alert-warning.icon > :nth-child(2){color: var(--colorWarning);}
            .alert.alert-success.icon > :nth-child(2){color: var(--colorSuccess);}
            .alert.alert-danger.icon > :nth-child(2){color: var(--colorDanger);}
            
            .alert.icon {
                grid-template-columns: min-content 2fr;
                grid-template-areas: 
                "icon heading"
                "body body"
                ;
                align-content: center;
                :nth-child(2){
                    grid-area: icon;
                }
                :nth-child(3){
                    grid-area: heading;
                }
                wc-alert-body{
                    grid-area: body;
                    margin: 0;
                }
            }

            .alert.icon:has(wc-alert-close) {
                grid-template-columns: min-content 2fr min-content;
                grid-template-areas: 
                "icon heading close"
                "body body body"
                ;
                wc-alert-close {
                    grid-area: close;
                }
            }
            
            .alert{
                display: grid;
                width: 33%;
                margin-inline: auto;
                gap: 0.5em;
                padding: 1em;
                border: 0;
                border-radius: var(--borderRadSmall);
                border-top: 4px grey solid;
            }
            
            .alert > :nth-child(2){
                margin: 0;
            }
            .alert > :nth-child(3){
                margin: 0;
            }
        </style>
        `
        this.innerHTML = this._css + this.innerHTML
        this.classList.add("alert")
        this.classList.add("alert-light")
        // this.props.count = 0
    }
    static get observedAttributes() {
        return ["theme", "varient", "icon"]
    }

    /**
     * Handles theming
     * @param {string} theme
     */
    handleTheme(theme){
        if (theme === "light") {
            this.classList.add("alert-light")
        }
        else if (theme === "dark"){
            this.classList.add("alert-dark")
        } else {
            console.log(`Unrecognized theme: ${theme}`)
        }
    }
    /**
     * Handles Varient
     * @param {string} varient
     */
    handleVarient(varient){
        switch(varient){
            case "success":
                this.classList.add("alert-success")
                break;
            case "waring":
                this.classList.add("alert-waring")
                break;
            case "danger":
                this.classList.add("alert-danger")
                break;
            case "primary":
                this.classList.add("alert-primary")
                break;
        }
    }
    addIcon(){
        this.classList.add("icon")
    }

    attributeChangedCallback(name, oldVal, newVal){
        switch(name){
            case "theme":
                this.handleTheme(newVal)
                break;
            case "varient":
                this.handleVarient(newVal)
                break;
            case "icon":
                this.addIcon()
                break;
            default:
                console.error(`Have not implemented ${name} yet!`)
                break;
        }
    }
}


customElements.define("wc-alert", Alert)