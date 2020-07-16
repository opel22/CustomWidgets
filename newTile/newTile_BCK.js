(function() { 
    let _shadowRoot;

    let template = document.createElement("template");
    template.innerHTML = `
        <div id="ui5_content" name="ui5_content">
            <slot name="content"></slot>
        </div>
        <script id="oView" name="oView" type="ui5_content">        
            <mvc:View
            controllerName="myView.Template"
            xmlns="sap.m"
            xmlns:mvc="sap.ui.core.mvc">
            <GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" size="L" header="Country-Specific Profit Margin" subheader="Expenses" press="press">
                <TileContent unit="EUR" footer="Current Quarter">
                    <NumericContent id="tile" scale="M" value="1.96" valueColor="Error" indicator="Up" withMargin="false" />
                </TileContent>
            </GenericTile>
            </mvc:View>
        </script>
    `;
    class NewTile extends HTMLElement {
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
        set value(newValue) {
            if (sap.ui.getCore().byId("__tile0")) {
                sap.ui.getCore().byId("__tile0").getTileContent()[0].getContent().setValue(newValue);
            }
        }
    }
    customElements.define("com-sap-sample-newtile", NewTile);

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
            var oView  = sap.ui.xmlview({
                viewContent: jQuery(_shadowRoot.getElementById("oView")).html(),
            });
            oView.placeAt(content);


            if (that_._designMode) {
                //oView.byId("passwordInput").setEnabled(false);
            }
        });
    }

})();
