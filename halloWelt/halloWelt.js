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
    `;

    class HalloWelt extends HTMLElement {
        constructor() {
            super(); 
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.content.cloneNode(true));

        }
        connectedCallback() {
            let ui5Button = new sap.m.Button(this.createId("helloButton"), {
                text : "Click me"
            }); 
        }
    }
    customElements.define("com-sap-sample-hallowelt",  HalloWelt);

})();