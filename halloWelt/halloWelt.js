(function() { 
    let ui5Script = document.createElement('script');
    ui5Script.src = 'https://sapui5.hana.ondemand.com/resources/sap-ui-core.js';
    ui5Script.async = false;
    document.head.appendChild(ui5Script);


    let template = document.createElement('template');
    template.innerHTML = `
    <style>
    :host {
       text: "Test";
    }
    </style>
    `;

    ui5Script.onload = () =>

    customElements.define("com-sap-sample-hallowelt", class HalloWelt extends HTMLElement {
        disconnectedCallback () {
            try{
                document.head.removeChild(ui5Script);
            }
            catch{}
        }

        constructor() {
            super(); 
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));

        }
    });
})();
