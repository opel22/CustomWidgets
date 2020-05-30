(function() { 
    let ui5Script = document.createElement('script');
    ui5Script.src = 'https://sapui5.hana.ondemand.com/resources/sap-ui-core.js';
    ui5Script.async = false;
    document.head.appendChild(ui5Script);


    let template = document.createElement('template');
    template.innerHTML = `
    <body class="sapUiBody" id="content"></body>
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
    

    customElements.define("com-sap-sample-hallowelt", HalloWelt);
})();
