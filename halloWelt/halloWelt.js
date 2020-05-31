(function() { 
    let _shadowRoot;
    let template = document.createElement('template');
    template.innerHTML = `
    <style>
        canvas.drawingBuffer {
            z-index : 11;
            position: absolute;
            width   : 100%;
            height  : 100%;
            top     : 50px;
            bottom  : 0;
            left    : 50px;
            right   : 0
        }   
    </style>
    <div id="export_div" name="export_div">
        <slot name="export_button"></slot>
    </div>
    `;
    
    class HalloWelt extends HTMLElement {
        constructor() {
            super(); 
            _shadowRoot = this.attachShadow({mode: "open"});
            _shadowRoot.appendChild(template.content.cloneNode(true));
        }
        onCustomWidgetAfterUpdate(changedProperties) {
            var that = this;
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
        icon: "sap-icon://bar-code",
        visible: true,
        tooltip: "Scan Barcode"
    });

    that_._simpleForm = new sap.ui.layout.form.SimpleForm({
        labelSpanL: 3,
        labelSpanM: 3,
        emptySpanL: 3,
        emptySpanM: 3,
        columnsL: 1,
        columnsM: 1,
        editable: true,
        content: [
            that_._exportButton
        ]
    })

    that_._simpleForm.placeAt(buttonSlot);

    if (that_._designMode) {
        sap.ui.getCore().byId("scan").setEnabled(false);
        sap.ui.getCore().byId("scannedValue").setEditable(false);
    }
}