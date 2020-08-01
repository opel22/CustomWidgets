(function() { 
    let _shadowRoot;
    let _oView;

    let template = document.createElement("template");
    template.innerHTML = `
        <div id="ui5_content" name="ui5_content">
            <slot name="content"></slot>
        </div>

        <script id="sap-ui-bootstrap"
            src="https://openui5.hana.ondemand.com/1.80.1/resources/sap-ui-core.js"
            data-sap-ui-libs="sap.ui.core,sap.m"
            data-sap-ui-theme="sap_fiori_3"
            data-sap-ui-compatVersion="edge"
            data-sap-ui-preload="async"></script>

        <script id="oView" name="oView" type="ui5_content">             
        <mvc:View
            controllerName="myView.Template"
            xmlns:mvc="sap.ui.core.mvc"
            xmlns="sap.m">
            <DatePicker
                id="DP10"
                value="2015-11"
                displayFormat="MM-yyyy"
                valueFormat="MM-yyyy"
                change="handleChange"
                class="sapUiSmallMarginBottom"/>
        </mvc:View>        
        </script>          
    `;
    //Test for github
    class NewDatePicker extends HTMLElement {
        constructor() {
            super(); 
            _shadowRoot = this.attachShadow({mode: "open"});

            _shadowRoot.appendChild(template.content.cloneNode(true));
            
            this._props = {};
            loadthis(this);
            
        }
        onCustomWidgetBeforeUpdate(changedProperties) {
            if ("designMode" in changedProperties) {
                this._designMode = changedProperties["designMode"];
            }
        }
        onCustomWidgetAfterUpdate(changedProperties) {

        }

        get dateValue() {
            let sViewId = this.firstChild.getAttribute("sapui5viewid");
            var oView = sap.ui.getCore().byId(sViewId); 
            if(!oView){
                return; 
            }
            return oView.byId("DRS4").getDateValue();
        }

        
    }
    customElements.define("ch-processpartner-sample-datepicker", NewDatePicker);

    function loadthis(that) {
        var that_ = that;
      
        let content = document.createElement('div');
        content.slot = "content";

        that_.appendChild(content);

        sap.ui.getCore().attachInit(function() {
            "use strict";

            //### Controller ###
            sap.ui.define([
                "sap/ui/core/mvc/Controller"
            ], function(Controller) {
                "use strict";
                
                return Controller.extend("myView.Template", {
                    //hier kämen die Methoden rein, Bsp. onButtonPress
                });
            });

            //### THE APP: place the XMLView somewhere into DOM ###
            _oView  = sap.ui.xmlview({
                viewContent: jQuery(_shadowRoot.getElementById("oView")).html(),
            });
            
            _oView.placeAt(content);

            content.setAttribute("sapUi5ViewId",_oView.getId());

        });
    }

})();
