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
            var that = this;
            loadthis(that);
        }
    }
    customElements.define("com-sap-sample-hallowelt",  HalloWelt);

    function loadthis(that) {
        var that_ = that;

        let buttonSlot = document.createElement('div');
        buttonSlot.slot = "export_button";
        that_.appendChild(buttonSlot);

        that_._exportButton = new sap.m.Button({
            id: "scan",
            text: "Scan",
            icon: "sap-icon://bar-code",
            visible: true,
            tooltip: "Scan Barcode",
            press: function() {
                startScan();
            }
        });
    }

})();