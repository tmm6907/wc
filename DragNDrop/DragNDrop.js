import {WC, html} from '../WC.js'
/**
 * Drag and drop component
 * @class
 * @extends WC
 */

class DragNDrop extends WC{
    constructor(){
        super()
        // this.updateDate()
        /** @type {string} */
        this._color = ""
        /** @type {string} */
        this._bgColor = ""
        /** @type {string} */
        this._title = "FoleDrop"
        /** @type {string} */
        this._name = ""
        /** @type {string} */
        this._height = ""
        /** @type {string} */
        this._width = "fit-content"
        /** @type {string} */
        this._url = ""
        /** @type {Array} */
        this._files = []
        /** @type {string} */
        this._placeholder = "Drop files here"
        /** @type {string} */
        this._submit = "Submit"
        this._styles = html`
        <style>
            wc-drag-drop[wc-key="${this.uuid}"] {
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
            wc-drag-drop .fileContainer {
                margin: 0.5em 0;
            }
            wc-drag-drop header {
                display: flex;
                align-items: center;
            }

            wc-drag-drop label {
                margin-bottom: 1rem ;
            }
            wc-drag-drop button {
                padding: 0.5em 1em;
                border: 1px #000 solid;
                border-radius: 4px;
                margin-left: auto;
            }
            wc-drag-drop .placeholder {
                padding: 1em;
                font-weight: normal;
                color: gray;
                text-align: center;
            }
            wc-drag-drop .previewContainer {
                border-top: 1px solid #ccc;
                padding-top: 0.5em;
            }

            wc-drag-drop .filePreview {
                display: flex;
                align-items: center;
            }
            wc-drag-drop .filePreview button {
                margin-left: 1em;
                cursor: pointer;
            }
        </style>
        `
        this._html = html`
        <div class="fileContainer">
            <header>
                <label for="myfile"></label>
                <button type="submit"></button>
            </header>
            <section  class="placeholder">
                <p></p>
            </section >
            <input type="file" hidden multiple />
            <section class="previewContainer"></section>
        </div>
        `
        this.innerHTML = this._styles + this._html
        this.classList.add("wc-drag-drop")
    }
    static get observedAttributes(){
        return [
            "color",
            "bg-color",
            "name",
            "title",
            "height",
            "width",
            "url",
            "placeholder",
            "submit-btn"
        ]
    }

    /**
     * DragOver Event handler
     * @param {Event} e
     * @method
     */
    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    };

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        const inputElement = this.querySelector('input')
        this._files = e.dataTransfer.files;
        inputElement.files = this.files;
        this.displayFilePreviews();
    };

    displayFilePreviews() {
        const previewContainer = this.querySelector(".previewContainer");
        previewContainer.innerHTML = ""; 

        Array.from(this._files).forEach(file => {
            const preview = document.createElement("div");
            preview.classList.add("filePreview");
            const fileInfo = document.createElement("span");
            fileInfo.textContent = `${file.name} (${this.formatBytes(file.size)})`;
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => {
                preview.remove();
            });
            preview.appendChild(fileInfo);
            preview.appendChild(removeButton);
            previewContainer.appendChild(preview);
        });
    }

    setColor(value) {
        this._color = value
        this.style.setProperty("--text-color", this._color)
    }
    setBackgroundColor(value) {
        this._bgColor = value
        this.style.setProperty("--bg-color", this._bgColor)
    }
    setName(value) {
        this._name = value
        this.querySelector("input").setAttribute("name", value)
    }
    setTitle(value) {
        this._title = value
        this.querySelector("label").innerHTML = value
    }

    setWidth(value) {
        this._width = value
        this.style.width = value
    }

    setHeight(value) {
        this._height = value
        this.style.height = value
    }

    setPlaceholder(value) {
        this._placeholder = value;
        this.querySelector("section p").innerHTML = value;
    }
    
    setSubmit(value) {
        this._submit = value
        this.querySelector("header button").innerHTML = value;
    }

    setURL(value) {
        this._url = value
    }

    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    uploadFiles() {
        console.log("clicked")
        const formData = new FormData();
        if (this._files.length === 0) console.error()
        for (let i = 0; i < this._files.length; i++) {
            formData.append('files', this._files[i]);
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', this._url, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('Files uploaded successfully');
            } else {
                console.error('Error uploading files:', xhr.statusText);
            }
        };
        xhr.send(formData);
    }
    attributeChangedCallback(name, oldVal, newVal){
        if (name == "color" && oldVal !== newVal) {
            this.setColor(newVal)
            console.log("Color changed to:", this._color)
        }
        if (name == "bg-color" && oldVal !== newVal) {
            this.setBackgroundColor(newVal)
            console.log("BG Color changed to:", this._bgColor)
        }
        if (name == "name" && oldVal !== newVal) {
            this.setName(newVal)
            console.log("Name changed to:", this._name)
        }
        if (name == "title" && oldVal !== newVal) {
            this.setTitle(newVal)
            console.log("Title changed to:", this._title)
        }
        if (name == "width" && oldVal !== newVal) {
            this.setWidth(newVal)
            console.log("Width changed to:", this._width)
        }
        if (name == "height" && oldVal !== newVal) {
            this.setHeight(newVal)
            console.log("Height changed to:", this._height)
        }
        if (name == "url" && oldVal !== newVal) {
            this.setURL(newVal)
            console.log("URL changed to:", this._url)
        }

        if (name == "placeholder" && oldVal !== newVal) {
            this.setPlaceholder(newVal)
            console.log("Placeholder changed to:", this._placeholder)
        }

        if (name == "submit-btn" && oldVal !== newVal) {
            this.setSubmit(newVal)
            console.log("Submit changed to:", this._submit)
        }
    }
    connectedCallback(){
        var dropArea = this.querySelector("section.placeholder")
        dropArea.addEventListener('click', () => { 
            var input = this.querySelector("input")
            input.click()
             
        });
        var submitBtn = this.querySelector("header button")
        submitBtn.addEventListener('click', () => { 
            this.uploadFiles()
        });
        if (this._url == "") console.error("filedrop-wc url attribute not set", this._url)
        this.setPlaceholder(this._placeholder)
        this.setSubmit(this._submit)
        this.addEventListener('dragover', this.handleDragOver);
        this.addEventListener('drop', this.handleDrop);
    }
}
customElements.define("wc-drag-drop", DragNDrop)