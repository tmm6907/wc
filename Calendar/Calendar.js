import {WC, html} from "../WC.js"
/**
 * Calendar Component
 * @class
 * @extends WC
 */

class Calendar extends WC{
    constructor(){
        super()
        this._styles = html`
        <style>
            .wc-calendar{
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
            wc-calendar time {
                font-size: 1.15rem;
            }
            wc-calendar .monthYear {
                margin: 0.5em 0;
            }

            wc-calendar table {
                border-collapse: collapse;
                border-spacing: 0;
            }
            wc-calendar tr, th {
                padding:0;
            }

            wc-calendar td {
                background-color: var(--bg-color, transparent);
                color: black;
                width: 3rem;
                height: 3rem;
                text-align: center;
                vertical-align: middle;
            }
            wc-calendar .cell-border {
                border: 1px gray solid;
            }

            wc-calendar .overlay {
                background-color: purple;
                border-radius: 50%;
                color: white;
                width: 2rem;
                height: 2rem;
                text-align: center;
                line-height: 2rem; 
                margin: auto;
                vertical-align: middle;
            }
            wc-calendar .overlay-text {
                margin: 0;
                padding: 0;
            }
            </style>
        `
        this._html = html`
        <div class="monthYear"><time id="monthYear" datetime=""></time></div>
        <table>
            <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                </tr>
                <tr>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                </tr>
                <tr>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                </tr>
                <tr>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                </tr>
                <tr>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                </tr>
                <tr>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                    <td class="cell-border"></td>
                </tr>
            </tbody>
        </table>
        `
        this._color = ""
        this._bgColor = ""
        this.innerHTML = this._styles + this._html
        this.classList.add("wc-calendar")
    }
    static get observedAttributes(){
        return ["color", "bg-color"]
    }
    updateDate() {
        var currentDate = new Date();
        const monthYear = this.querySelector("time");
        // console.log(monthYear)
        const currentMonth = currentDate.toLocaleString("default", { month: "long" });
        const currentYear = currentDate.getFullYear()
        monthYear.textContent = `${currentMonth} ${currentYear}`
        monthYear.setAttribute("datetime", `${currentYear}-${currentDate.getMonth()}`)

    }

    populateCalendar() {
        // Get the current date
        const currentDate = new Date();

        // Set the date to the first day of the month
        currentDate.setDate(1);

        // Get the day of the week for the first day of the month (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
        const firstDayOfWeek = currentDate.getDay();

        // Initialize the day counter
        let day = 1;

        // Populate the calendar cells with the numbers representing the days of the month
        const rows = this.querySelectorAll('table tr');
        for (let i = 1; i < rows.length; i++) { // Start from the second row (index 1), as the first row contains the header
            const cells = rows[i].querySelectorAll('td');
            for (let j = (i === 1 ? firstDayOfWeek : 0); j < cells.length; j++) {
                cells[j].innerHTML = '';
                if (day <= this.getMonthDays(currentDate.getMonth(), currentDate.getFullYear())) {
                    let now = new Date()
                    let overlay = document.createElement("div");

                    if (day !== now.getDate()) {
                        overlay.textContent = day++;
                        cells[j].appendChild(overlay)
                    } else {
                        overlay.classList.add("overlay")
                        let overlayText = document.createElement("p");
                        overlayText.classList.add("overlay-text")
                        overlayText.textContent = day++;
                        overlay.appendChild(overlayText);
                        cells[j].appendChild(overlay);
                    }
                } 
            }
        }
    }

    getMonthDays(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    updateColor(value) {
        this._color = value
        this.style.setProperty("--text-color", this._color)
    }
    updateBackgroundColor(value) {
        this._bgColor = value
        this.style.setProperty("--bg-color", this._bgColor)
    }

    updatePeriodically() {
        const now = new Date();
        const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
        const delay = nextDay - now;
        setTimeout(() => {
            console.log("called periodically for today", now.getDay())
            this.updateDate();
            this.populateCalendar();
            this.updatePeriodically();
        }, delay);
    }
    attributeChangedCallback(name, oldVal, newVal){
        if (name == "color") {
            this.updateColor(newVal)
            console.log("Color changed to:", this._color)
        }
    }
    connectedCallback(){
        this.updateDate();
        this.populateCalendar();
        this.updatePeriodically();
    }
}
customElements.define("wc-calendar", Calendar)
