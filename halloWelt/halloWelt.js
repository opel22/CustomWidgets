(function() { 
    let _shadowRoot;
    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
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
    }
    customElements.define("com-sap-sample-hallowelt",  HalloWelt);

})();