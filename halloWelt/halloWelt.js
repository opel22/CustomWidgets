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