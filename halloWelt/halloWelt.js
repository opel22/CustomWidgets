(function() { 
    let ui5Script = document.createElement('script');
    ui5Script.src = 'https://sapui5.hana.ondemand.com/resources/sap-ui-core.js';
    ui5Script.async = false;
    document.head.appendChild(ui5Script);

    let ui5Button = document.createElement('script');
    ui5Button.innerHTML = `
        new sap.m.Button({
            text:"Hello world"
            }
        }).placeAt("content");
    `;

    let template = document.createElement('template');
    template.innerHTML = `
        <body class="sapUiBody" id="content">
        </body>
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
