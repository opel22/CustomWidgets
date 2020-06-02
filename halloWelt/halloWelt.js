(function() { 
    let template = document.createElement("template");
    template.innerHTML = `
        <style>
        :host {
            border-radius: 25px;
            border-width: 4px;
            border-color: black;
            border-style: solid;
            display: block;
        } 
        </style> 
        <p id="myButton"></>
    `;

    class HalloWelt extends HTMLElement {
        constructor() {
            super(); 
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.content.cloneNode(true));

        }
        connectedCallback() {
            var oButton = new sap.ui.commons.Button(this.createId("myButton"), {text:"Hello JS View"}); 
        }
    }
    customElements.define("com-sap-sample-hallowelt",  HalloWelt);

})();