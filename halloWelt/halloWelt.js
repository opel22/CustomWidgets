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
            var oButton = new sap.m.Button({
                text : "Content Button",
                type : sap.m.ButtonType.Reject     
                });
            this.shadowRoot.appendChild(oButton);
        }
    }
    customElements.define("com-sap-sample-hallowelt",  HalloWelt);

})();