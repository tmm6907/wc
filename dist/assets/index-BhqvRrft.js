var q=Object.defineProperty;var F=(w,o,s)=>o in w?q(w,o,{enumerable:!0,configurable:!0,writable:!0,value:s}):w[o]=s;var P=(w,o,s)=>F(w,typeof o!="symbol"?o+"":o,s);(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const C of document.querySelectorAll('link[rel="modulepreload"]'))l(C);new MutationObserver(C=>{for(const _ of C)if(_.type==="childList")for(const k of _.addedNodes)k.tagName==="LINK"&&k.rel==="modulepreload"&&l(k)}).observe(document,{childList:!0,subtree:!0});function s(C){const _={};return C.integrity&&(_.integrity=C.integrity),C.referrerPolicy&&(_.referrerPolicy=C.referrerPolicy),C.crossOrigin==="use-credentials"?_.credentials="include":C.crossOrigin==="anonymous"?_.credentials="omit":_.credentials="same-origin",_}function l(C){if(C.ep)return;C.ep=!0;const _=s(C);fetch(C.href,_)}})();/*! reef v13.0.4 | (c) 2024 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/reef */function e(w,o,s=document){let l=new CustomEvent(`reef:${w}`,{bubbles:!0,cancelable:!0,detail:o});return s.dispatchEvent(l)}function t(w){return typeof w=="string"?document.querySelector(w):w}function n(w){return Object.prototype.toString.call(w).slice(8,-1).toLowerCase()}function r(w,o){let s="signal"+(w?`-${w}`:"");return{get:(l,C)=>C==="_isSignal"||(["object","array"].includes(n(l[C]))&&!l[C]._isSignal&&(l[C]=new Proxy(l[C],r(w))),l[C]),set:(l,C,_)=>(l[C]===_||(l[C]=_,e(s,{prop:C,value:_,action:"set"})),!0),deleteProperty:(l,C)=>(delete l[C],e(s,{prop:C,value:l[C],action:"delete"}),!0)}}function i(w={},o=""){return w=["array","object"].includes(n(w))?w:{value:w},new Proxy(w,r(o))}let u=["input","option","textarea"],c=["value","checked","selected"],d=["checked","selected"];function a(w){return["false","null","undefined","0","-0","NaN","0n","-0n"].includes(w)}function f(w,o,s,l){if(!o.startsWith("on")||!l||w[o])return;let C=l[s.split("(")[0]];C&&(w[o]=C)}function h(w,o){let s=o.replace(/\s+/g,"").toLowerCase();return!(!["src","href","xlink:href"].includes(w)||!s.includes("javascript:")&&!s.includes("data:text/html"))||!!(w.startsWith("on")||w.startsWith("@on")||w.startsWith("#on"))||void 0}function m(w,o,s,l){f(w,o,s,l),h(o,s)||(c.includes(o)&&(w[o]=o==="value"?s:" "),w.setAttribute(o,s))}function g(w,o){c.includes(o)&&(w[o]=""),w.removeAttribute(o)}function p(w,o){if(w.nodeType===1){for(let{name:s,value:l}of Array.from(w.attributes)){if(h(s,l))return g(w,s),void f(w,s,l,o);if(!s.startsWith("@")&&!s.startsWith("#"))continue;let C=s.slice(1);g(w,s),d.includes(C)&&a(l)||m(w,C,l,o)}if(w.childNodes)for(let s of w.childNodes)p(s,o)}}function b(w){return w.childNodes&&w.childNodes.length?null:w.textContent}function y(w,o,s){let l=w.childNodes,C=o.childNodes;(function(_){let k=_.querySelectorAll("script");for(let L of k)L.remove()})(w)||(l.forEach(function(_,k){if(!C[k]){let x=_.cloneNode(!0);return p(x,s),void o.append(x)}if(L=_,S=C[k],typeof L.nodeType=="number"&&L.nodeType!==S.nodeType||typeof L.tagName=="string"&&L.tagName!==S.tagName||typeof L.id=="string"&&L.id&&L.id!==S.id||"getAttribute"in L&&"getAttribute"in S&&L.getAttribute("key")!==S.getAttribute("key")||typeof L.src=="string"&&L.src&&L.src!==S.src){let x=function(D,$){if(D.nodeType!==1)return;let M=D.getAttribute("id"),H=D.getAttribute("key");if(!M||!H)return;let T=M?`#${M}`:`[key="${H}"]`;return $.querySelector(`:scope > ${T}`)}(_,o);if(!x){let D=_.cloneNode(!0);return p(D,s),void C[k].before(D)}C[k].before(x)}var L,S;if(l[k]&&"hasAttribute"in l[k]&&l[k].hasAttribute("reef-ignore")||(function(x,D,$){if(x.nodeType!==1)return;let M=x.attributes,H=D.attributes;for(let{name:T,value:W}of Array.from(M)){if(T.startsWith("#")||c.includes(T)&&u.includes(x.tagName.toLowerCase()))continue;let B=T.startsWith("@")?T.slice(1):T;d.includes(B)&&a(W)?g(D,B):m(D,B,W,$)}for(let{name:T,value:W}of Array.from(H))M[T]||c.includes(T)&&u.includes(D.tagName.toLowerCase())||g(D,T)}(_,C[k],s),_.nodeName.includes("-")))return;let E=b(_);if(E&&E!==b(C[k])&&(C[k].textContent=E),_.childNodes.length||!C[k].childNodes.length){if(!C[k].childNodes.length&&_.childNodes.length){let x=document.createDocumentFragment();return y(_,x,s),void C[k].appendChild(x)}_.childNodes.length&&y(_,C[k],s)}else C[k].innerHTML=""}),function(_,k){let L=_.length-k.length;if(!(L<1))for(;L>0;L--)_[_.length-1].remove()}(C,l))}function v(w,o,s){let l=t(w),C=function(_){let k=new DOMParser().parseFromString(`<body><template>${_}</template></body>`,"text/html");return k.body?k.body.firstElementChild.content:document.createElement("body")}(o);e("before-render",null,l)&&(y(C,l,s),e("render",null,l))}class N{constructor(o,s,l){var C;this.elem=o,this.template=s,this.signals=l.signals?l.signals.map(_=>`reef:signal-${_}`):["reef:signal"],this.events=l.events,this.handler=(C=this,function(_){C.render()}),this.debounce=null,this.start()}start(){for(let o of this.signals)document.addEventListener(o,this.handler);this.render(),e("start",null,t(this.elem))}stop(){for(let o of this.signals)document.removeEventListener(o,this.handler);e("stop",null,t(this.elem))}render(){let o=this;o.debounce&&window.cancelAnimationFrame(o.debounce),o.debounce=window.requestAnimationFrame(function(){v(o.elem,o.template(),o.events)})}}function A(w,o,s={}){return new N(w,o,s)}const html=(w,...o)=>w[0]+o.map((s,l)=>s+w[l+1]).join("");class WC extends HTMLElement{constructor(){super()}}customElements.define("wc-base",WC);class Clock extends WC{constructor(){super();P(this,"template",()=>html`
        ${this._styles}
        <div key="${this.uuid}">${this.time.value}</div>
    `);let s=new Date;this.uuid=crypto.randomUUID(),this.time=i(s.toLocaleTimeString(),this.uuid),this._color="",this._bgColor="",this._styles=html`
            <style>
                wc-clock {
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
            </style>
        `}static get observedAttributes(){return["color","bg-color"]}attributeChangedCallback(s,l,C){s=="color"&&l!==C&&(this._color=C,this.style.setProperty("--text-color",this._color),console.log("Color changed to:",this._color)),s=="bg-color"&&l!==C&&(this._bgColor=C,this.style.setProperty("--bg-color",this._bgColor),console.log("Background Color changed to:",this._bgColor)),s=="alive"&&console.log("ALIVE")}connectedCallback(){A(this,this.template,{signals:[this.uuid]}),window.setInterval(()=>{this.time.value=new Date().toLocaleTimeString()},1e3)}}customElements.define("wc-clock",Clock);class Calendar extends WC{constructor(){super(),this._styles=html`
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
        `,this._html=html`
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
        `,this._color="",this._bgColor="",this.innerHTML=this._styles+this._html,this.classList.add("wc-calendar")}static get observedAttributes(){return["color","bg-color"]}updateDate(){var o=new Date;const s=this.querySelector("time"),l=o.toLocaleString("default",{month:"long"}),C=o.getFullYear();s.textContent=`${l} ${C}`,s.setAttribute("datetime",`${C}-${o.getMonth()}`)}populateCalendar(){const o=new Date;o.setDate(1);const s=o.getDay();let l=1;const C=this.querySelectorAll("table tr");for(let _=1;_<C.length;_++){const k=C[_].querySelectorAll("td");for(let L=_===1?s:0;L<k.length;L++)if(k[L].innerHTML="",l<=this.getMonthDays(o.getMonth(),o.getFullYear())){let S=new Date,E=document.createElement("div");if(l!==S.getDate())E.textContent=l++,k[L].appendChild(E);else{E.classList.add("overlay");let x=document.createElement("p");x.classList.add("overlay-text"),x.textContent=l++,E.appendChild(x),k[L].appendChild(E)}}}}getMonthDays(o,s){return new Date(s,o+1,0).getDate()}updateColor(o){this._color=o,this.style.setProperty("--text-color",this._color)}updateBackgroundColor(o){this._bgColor=o,this.style.setProperty("--bg-color",this._bgColor)}updatePeriodically(){const o=new Date,l=new Date(o.getFullYear(),o.getMonth(),o.getDate()+1,0,0,0,0)-o;setTimeout(()=>{console.log("called periodically for today",o.getDay()),this.updateDate(),this.populateCalendar(),this.updatePeriodically()},l)}attributeChangedCallback(o,s,l){o=="color"&&(this.updateColor(l),console.log("Color changed to:",this._color))}connectedCallback(){this.updateDate(),this.populateCalendar(),this.updatePeriodically()}}customElements.define("wc-calendar",Calendar);class DragNDrop extends WC{constructor(){super(),this._color="",this._bgColor="",this._title="FoleDrop",this._name="",this._height="",this._width="fit-content",this._url="",this._files=[],this._placeholder="Drop files here",this._submit="Submit",this._styles=html`
        <style>
            /* wc-drag-drop {
                --text-color: "";
                --bg-color: "";
            } */
            .wc-drag-drop {
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
        `,this._html=html`
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
        `,this.innerHTML=this._styles+this._html,this.classList.add("wc-drag-drop")}static get observedAttributes(){return["color","bg-color","name","title","height","width","url","placeholder","submit-btn"]}handleDragOver(o){o.preventDefault(),o.stopPropagation()}handleDrop(o){o.preventDefault(),o.stopPropagation();const s=this.querySelector("input");this._files=o.dataTransfer.files,s.files=this.files,this.displayFilePreviews()}displayFilePreviews(){const o=this.querySelector(".previewContainer");o.innerHTML="",Array.from(this._files).forEach(s=>{const l=document.createElement("div");l.classList.add("filePreview");const C=document.createElement("span");C.textContent=`${s.name} (${this.formatBytes(s.size)})`;const _=document.createElement("button");_.textContent="Remove",_.addEventListener("click",()=>{l.remove()}),l.appendChild(C),l.appendChild(_),o.appendChild(l)})}setColor(o){this._color=o,this.style.setProperty("--text-color",this._color)}setBackgroundColor(o){this._bgColor=o,this.style.setProperty("--bg-color",this._bgColor)}setName(o){this._name=o,this.querySelector("input").setAttribute("name",o)}setTitle(o){this._title=o,this.querySelector("label").innerHTML=o}setWidth(o){this._width=o,this.style.width=o}setHeight(o){this._height=o,this.style.height=o}setPlaceholder(o){this._placeholder=o,this.querySelector("section p").innerHTML=o}setSubmit(o){this._submit=o,this.querySelector("header button").innerHTML=o}setURL(o){this._url=o}formatBytes(o,s=2){if(o===0)return"0 Bytes";const l=1024,C=s<0?0:s,_=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],k=Math.floor(Math.log(o)/Math.log(l));return parseFloat((o/Math.pow(l,k)).toFixed(C))+" "+_[k]}uploadFiles(){console.log("clicked");const o=new FormData;this._files.length===0&&console.error();for(let l=0;l<this._files.length;l++)o.append("files",this._files[l]);const s=new XMLHttpRequest;s.open("POST",this._url,!0),s.onload=function(){s.status===200?console.log("Files uploaded successfully"):console.error("Error uploading files:",s.statusText)},s.send(o)}attributeChangedCallback(o,s,l){o=="color"&&s!==l&&(this.setColor(l),console.log("Color changed to:",this._color)),o=="bg-color"&&s!==l&&(this.setBackgroundColor(l),console.log("BG Color changed to:",this._bgColor)),o=="name"&&s!==l&&(this.setName(l),console.log("Name changed to:",this._name)),o=="title"&&s!==l&&(this.setTitle(l),console.log("Title changed to:",this._title)),o=="width"&&s!==l&&(this.setWidth(l),console.log("Width changed to:",this._width)),o=="height"&&s!==l&&(this.setHeight(l),console.log("Height changed to:",this._height)),o=="url"&&s!==l&&(this.setURL(l),console.log("URL changed to:",this._url)),o=="placeholder"&&s!==l&&(this.setPlaceholder(l),console.log("Placeholder changed to:",this._placeholder)),o=="submit-btn"&&s!==l&&(this.setSubmit(l),console.log("Submit changed to:",this._submit))}connectedCallback(){var o=this.querySelector("section.placeholder");o.addEventListener("click",()=>{var l=this.querySelector("input");l.click()});var s=this.querySelector("header button");s.addEventListener("click",()=>{this.uploadFiles()}),this._url==""&&console.error("filedrop-wc url attribute not set",this._url),this.setPlaceholder(this._placeholder),this.setSubmit(this._submit),this.addEventListener("dragover",this.handleDragOver),this.addEventListener("drop",this.handleDrop)}}customElements.define("wc-drag-drop",DragNDrop);class Grid extends WC{constructor(){super(),this.gap="0.5em",this.gapRow=this.gap,this.gapCol=this.gap,this.direction="",this.acceptedDirections=new Set(["column","row","row dense"]),this._styles=`
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
        `,this.innerHTML=this._styles+this.innerHTML,this.classList.add("wc-grid")}static get observedAttributes(){return["gap","row-gap","col-gap","direction"]}attributeChangedCallback(o,s,l){o=="gap"&&(this.gap=l,this._applyGap()),o=="row-gap"&&(this.gapRow=l,this._applyGapRow()),o=="col-gap"&&(this.gapCol=l,this._applyColGap()),o=="direction"&&this.acceptedDirections.has(l)&&(this.direction=l,this._applyDirection())}_applyGap(){let o;try{o=parseInt(this.gap,10)}catch{console.error("Invalid gap value!")}(o>5||o<1)&&console.error("Invalid gap value!"),this.classList.add(`wc-gap-${this.gap}`)}_applyGapRow(){let o;try{o=parseInt(this.gapRow,10)}catch{console.error("Invalid row-gap value!")}(o>5||o<1)&&console.error("Invalid row-gap value!"),this.classList.add(`wc-row-gap-${this.gapRow}`)}_applyColGap(){let o;try{o=parseInt(this.gapCol,10)}catch{console.error("Invalid col-gap value!")}(o>5||o<1)&&console.error("Invalid col-gap value!"),this.classList.add(`wc-col-gap-${this.gapCol}`)}_applyDirection(){switch(this.direction){case"row dense":this.style.gridAutoFlow=this.direction,this.style.rowGap=0;break;case"column":this.style.gridTemplateColumns="repeat(12, minmax(8.3% , 1fr))";break;case"row":this.style.gridAutoFlow=this.row;break}}}customElements.define("wc-grid",Grid);class Button extends WC{constructor(w,o,s){super(),this._styles=`
        <style>
        .wc-btn {
            font: inherit;
            border: 0;
            background-color: white;
            border-radius: 0.25em;
            padding: 0.5em 1em;
            height:fit-content;
            user-select: none;
            -webkit-user-select: none;
        }

        .wc-btn:active,
        .wc-btn:hover,
        .wc-btn:focus{
            background-color: rgb(200, 200, 200);
        }


        .wc-btn-outline {
            font: inherit;
            border: 2px rgb(160, 159, 159) solid;
            border-radius: 0.25em;
            padding: 0.5em 1em;
            user-select: none;
            -webkit-user-select: none;
        }

        .wc-btn-outline:active {
            background-color: rgb(200, 200, 200);
            border: 2px white solid;
        }
        </style>
        `,w?(this.innerHTML=this._styles,this.innerText=w):this.innerHTML=this._styles+this.innerHTML,this._onclickHandler=o,s&&this.setAttribute("varient",s),this.setAttribute("tabIndex",0),this.setAttribute("role","button"),o&&typeof this._onclickHandler=="function"&&(console.log("add click",this.innerText,this._onclickHandler),this.addEventListener("click",l=>{this._onclickHandler(l)}))}static get observedAttributes(){return["onlick","varient"]}handleVarient(w){switch(w&&(this.classList.remove("wc-btn"),console.log("removed class",this.innerText)),w){case"outline":this.classList.add("wc-btn-outline"),this._varient=w;break;case"text":this.classList.add("wc-btn-text"),this._varient=w;break;case"contained":this._varient=w;break;default:this.classList.add("wc-btn"),console.log("added class",this.innerText);break}}attributeChangedCallback(name,oldVal,newVal){name=="onclick"&&(onClick=eval(newVal),typeof onClick=="function"&&(this._onclickHandler=onClick,this.addEventListener("click",w=>{this._onclickHandler(w)}))),name=="varient"&&this.handleVarient(newVal)}doStuff(){console.log("Doing stuff")}connectedCallback(){this.handleVarient(this._varient)}}customElements.define("wc-button",Button);class ButtonGroup extends WC{constructor(){super(),this._styles="",this.innerHTML=this._styles+this.innerHTML}connectedCallback(){this.classList.add("wc-btn-group")}}customElements.define("wc-button-group",ButtonGroup);new ButtonGroup;class Alert extends WC{constructor(){super(),this._styles=`
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
        `,this.innerHTML=this._styles+this.innerHTML,this.classList.add("alert"),this.classList.add("alert-light")}static get observedAttributes(){return["theme","varient","icon"]}handleTheme(o){o==="light"?this.classList.add("alert-light"):o==="dark"?this.classList.add("alert-dark"):console.log(`Unrecognized theme: ${o}`)}handleVarient(o){switch(o){case"success":this.classList.add("alert-success");break;case"waring":this.classList.add("alert-waring");break;case"danger":this.classList.add("alert-danger");break;case"primary":this.classList.add("alert-primary");break}}addIcon(){this.classList.add("icon")}attributeChangedCallback(o,s,l){switch(o){case"theme":this.handleTheme(l);break;case"varient":this.handleVarient(l);break;case"icon":this.addIcon();break;default:console.error(`Have not implemented ${o} yet!`);break}}}customElements.define("wc-alert",Alert);class AlertCloseBtn extends WC{constructor(){super(),this._styles=`
        <style>
        button {
            background-color: var(--bgColorLight, red);
            padding: 0.5em;
            border:0;
            border-radius: 0.25em;
        }
        button:hover,
        button:active,
        button:focus {
            outline: none;
            box-shadow: var(--boxShadowHighlight, red);
        }
        </style>
        `,this._html=`
        <button class="wc-alert-close">${this.innerHTML}</button>
        `,this.innerHTML=this._styles+this._html,this.btn=this.querySelector("button"),this.btn.addEventListener("click",()=>{this.parentElement.remove()})}static get observedAttributes(){return[]}attributeChangedCallback(o,s,l){}connectedCallback(){}}customElements.define("wc-alert-close",AlertCloseBtn);class AlertBody extends WC{constructor(){super(),this._styles=`
        <style>
        
        </style>
        `,this.innerHTML=this._styles+this.innerHTML}static get observedAttributes(){return[]}attributeChangedCallback(o,s,l){}connectedCallback(){}}customElements.define("wc-alert-body",AlertBody);class ActiveSearch extends WC{constructor(){super();P(this,"template",()=>{console.log("Rendering",this._results.length,this._results.value);try{return this._styles+html`
            <input type="text" placeholder="${this._placeholder.value}" url="${this.url.value}"/>
            <ul>${this._results.value.map(s=>html`<li>${s}</li>`).join("")}</ul>
            `}catch{return this._styles+html`
            <input type="text" placeholder="${this._placeholder.value}" url="${this.url.value}"/>
            <ul>${this._results.map(s=>html`<li>${s.value}</li>`).join("")}</ul>
            `}});this.uuid=crypto.randomUUID(),this._placeholder=i("Search",this.uuid),this.url=i("",this.uuid),this._results=i([],this.uuid),this._styles=html`
        <style>
        wc-active-search input {
            width: 32ch;
            padding: 1em;
            height: fit-content;
            border: 1px solid #000;
        }
        wc-active-search ul {
            display: none;
            padding:0.5em;
            width:48ch;
            z-index: 2;
        }
        wc-active-search li {
            background-color: red;
            border: 1px solid #ccc;
            padding:0.5em;
            width:48ch;
            height: fit-content;
            // z-index: 2;
        }
        .show {
            display: block;
        }
        </style>
        `}static get observedAttributes(){return["placeholder","url"]}attributeChangedCallback(s,l,C){switch(s){case"placeholder":this._placeholder.value=C;break;case"url":this.url.value=C;break}}updateResults(){return["Alice Blue","Antique White","Aqua","Aquamarine","Coral","Crimson","Deep Pink","Gold","Goldenrod","Hot Pink","Lavender"]}connectedCallback(){A(this,this.template,{signals:[this.uuid]}),document.addEventListener("input",s=>{let l=s.target;if(l.parentElement.tagName==="WC-ACTIVE-SEARCH"){let C=document.querySelector("wc-active-search ul");l.value.length>2?(this._results.value=this.updateResults(),C.style.display="block"):C.style.display="none"}})}}customElements.define("wc-active-search",ActiveSearch);class Link extends WC{constructor(){super(),this._styles=html`
        <style>
            a {
                font: inherit;
                text-decoration: none;
                padding: 0;
                margin: 0;
            }
            
            a.padded {
                position: relative;
                display: block;
                width: fit-content;
                padding: 1em;
                background-color: var(--colorPrimary);
                border-radius: 0.25em;
                color: var(--bgColorLight)
            }
            a.padded::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
                cursor: pointer;
            }
        </style>
        `,this.innerHTML=this._styles+html`
        <a href="">${this.innerHTML}</a>
        `,this._link=this.querySelector("a")}static get observedAttributes(){return["padded","url"]}attributeChangedCallback(o,s,l){o==="padded"&&this.querySelector("a").classList.add("padded"),o==="url"&&this._link.setAttribute("href",l)}connectedCallback(){}}customElements.define("wc-link",Link);class Form extends WC{constructor(){super();P(this,"template",()=>this._styles+html`<form action="${this.action.value}" method="${this.method.value}">${this.innerHTML}</form>`);this.uuid=crypto.randomUUID(),this.action=i("",this.uuid),this.method=i("",this.uuid),this._styles=html`
        <style>
            .wc-form form{
                background-color: var(--bgColorDark);
                padding: 1em;
            }
            .wc-form input {
                font: inherit;
                background-color: var(--textColorDark);
                color: var(--textColorLight);
                border: 1px solid #ccc;
                padding: 0.25em;
                outline: 0;
            }
        </style>`,A(this,this.template,{signals:[this.uuid]}),this.classList.add("wc-form")}static get observedAttributes(){return["action","method"]}attributeChangedCallback(s,l,C){s==="action"&&(this.action.value=C),s==="method"&&(this.method.value=C)}connectedCallback(){}}customElements.define("wc-form",Form);
