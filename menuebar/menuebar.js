(function() { 
    let template = document.createElement("template");
    template.innerHTML = `
     <body>   
        <link rel="stylesheet" href="https://opel22.github.io/CustomWidgets/menuebar/menuebar.css">
        <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu">
        <label for="openSidebarMenu" class="sidebarIconToggle">
        <div class="spinner diagonal part-1"></div>
        <div class="spinner horizontal"></div>
        <div class="spinner diagonal part-2"></div>
        </label>
        <div id="sidebarMenu">
        <ul class="sidebarMenuInner">
            <li>Jelena Jovanovic <span>Web Developer</span></li>
            <li><a href="https://vanila.io" target="_blank">Company</a></li>
            <li><a href="https://instagram.com/plavookac" target="_blank">Instagram</a></li>
            <li><a href="https://twitter.com/plavookac" target="_blank">Twitter</a></li>
            <li><a href="https://www.youtube.com/channel/UCDfZM0IK6RBgud8HYGFXAJg" target="_blank">YouTube</a></li>
            <li><a href="https://www.linkedin.com/in/plavookac/" target="_blank">Linkedin</a></li>
        </ul>
        </div>
    </body>
    `;
    class MenueBar extends HTMLElement {
        constructor() {
            super(); 
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.content.cloneNode(true));
            this.addEventListener("click", event => {
                var event = new Event("onClick");
                this.dispatchEvent(event);
            });

            this._props = {};
        }
        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }
        onCustomWidgetAfterUpdate(changedProperties) {
            if ("color" in changedProperties) {
                this.style["background-color"] = changedProperties["color"];
            }
            if ("opacity" in changedProperties) {
                this.style["opacity"] = changedProperties["opacity"];
            }
            if("width" in changedProperties) {
                this.style["width"] = changedProperties["width"];
            }
        }
    }
    customElements.define("com-sap-sample-menuebar", MenueBar);
})();
