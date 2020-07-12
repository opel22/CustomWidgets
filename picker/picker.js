(function() { 
    let template = document.createElement("template");
    template.innerHTML = `
    <script id="sap-ui-bootstrap"
        src="https://sapui5.hana.ondemand.com/sdk/resources/sap-ui-core.js"
        data-sap-ui-theme="sap_belize"
        data-sap-ui-resourceroots='{
            "sap.m.sample.DatePicker": "./",
            "sap.ui.demo.mock": "mockdata"
        }'
        data-sap-ui-compatVersion="edge"
        data-sap-ui-async="true"
        data-sap-ui-frameOptions="trusted"
        data-sap-ui-oninit="module:sap/ui/core/ComponentSupport">
    </script>

    <div class="sapUiBody sapUiSizeCozy" id="content"
        data-sap-ui-component
        data-name="sap.m.sample.DatePicker"
        data-height="100%"
        data-id="container"
        data-settings='{"id" : "sap.m.sample.DatePicker"}'
        style="height: 100%">
    </div>

    <script id="oView" name="oView" type="ui5_content">    
        <mvc:View
            controllerName="sap.m.sample.DatePicker.Group"
            xmlns:mvc="sap.ui.core.mvc"
            xmlns:l="sap.ui.layout"
            xmlns="sap.m">
            <Label text='DatePicker with display format for months and years' labelFor="DP1"/>
            <DatePicker
                    id="DP1"
                    displayFormat="MM-y"
                    change="handleChange"
                    class="sapUiSmallMarginBottom"/>
        </mvc:View>
    </script>        
    `;
    class Picker extends HTMLElement {
        constructor() {
            super(); 
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.content.cloneNode(true));
            this.addEventListener("click", event => {
                var event = new Event("onClick");
                this.dispatchEvent(event);
            });
            
            this._props = {};
        }
        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }
        onCustomWidgetAfterUpdate(changedProperties) {
            
        }
    }
    customElements.define("com-sap-sample-picker", Picker);

    // UTILS
    function loadthis(that) {
        var that_ = that;
      
        let content = document.createElement('div');
        content.slot = "content";
        that_.appendChild(content);

        sap.ui.getCore().attachInit(function() {
            "use strict";
            var oDatePicker = new sap.m.DatePicker();
            oDatePicker.placeAt("content");            
        });
    }


})();
