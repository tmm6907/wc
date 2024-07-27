const calendarTemplate = document.createElement("template")
calendarTemplate.innerHTML = `
<style>
:host{
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
time {
    font-size: 1.15rem;
}
.monthYear {
    margin: 0.5em 0;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}
tr, th {
    padding:0;
}

td {
    background-color: var(--bg-color, transparent);
    color: black;
    width: 3rem;
    height: 3rem;
    text-align: center;
    vertical-align: middle;
}
.cell-border {
    border: 1px gray solid;
}
</style>
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
class Calendar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" })
        // this.updateDate()
        this._color = ""
        this._bgColor = ""
        this._active = this.hasAttribute("alive")
        shadow.append(calendarTemplate.content.cloneNode(true))
    }

    static observedAttributes = ["color", "bg-color"]

    updateDate() {
        var currentDate = new Date();
        const monthYear = this.shadowRoot.querySelector("time");
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
        const rows = this.shadowRoot.querySelectorAll('table tr');
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
                        overlay.style.backgroundColor = "purple";
                        overlay.style.borderRadius = "50%";
                        overlay.style.color = "white";
                        overlay.style.width = "2rem";
                        overlay.style.height = "2rem";
                        overlay.style.textAlign = "center"; // Center text horizontally
                        overlay.style.lineHeight = "2rem"; // Center text vertically
                        overlay.style.margin = "auto"; // Center div horizontally
                        overlay.style.verticalAlign = "middle"; // Center div vertically

                        let overlayText = document.createElement("p");
                        overlayText.textContent = day++;
                        overlayText.style.margin = "0"; // Ensure no default margins

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
        this.shadowRoot.host.style.setProperty("--text-color", this._color)
    }
    updateBackgroundColor(value) {
        this._bgColor = value
        this.shadowRoot.host.style.setProperty("--bg-color", this._bgColor)
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

    connectedCallback() {
        this.updateDate();
        this.populateCalendar();
        this.updatePeriodically();
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if (attr == "color" && oldVal !== newVal) {
            this.updateColor(newVal)
            console.log("Color changed to:", this._color)
        }
    }
}

customElements.define("calendar-wc", Calendar)