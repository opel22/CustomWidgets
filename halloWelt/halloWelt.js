(function() { 
    let _shadowRoot;
    let template = document.createElement('template');
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
    <p>Test</p>

    `;
    console.log("Test");
    class HalloWelt extends HTMLElement {
        constructor() {
            super(); 
            _shadowRoot = this.attachShadow({mode: "open"});
            _shadowRoot.appendChild(template.content.cloneNode(true));
            loadthis(that);
        }
    };
    customElements.define("com-sap-sample-hallowelt",  HalloWelt);
})();

// Functions
function loadthis(that) {
    var that_ = that;

    let buttonSlot = document.createElement('div');
    buttonSlot.slot = "export_button";
    that_.appendChild(buttonSlot);

    that_._exportButton = new sap.m.Label({
        id: "scan",
        text: "Scan",
        visible: true,
        tooltip: "Scan Barcode"
    });

};