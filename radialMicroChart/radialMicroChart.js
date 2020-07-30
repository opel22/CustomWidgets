(function() { 
    let _shadowRoot;
    let _oView;

    let template = document.createElement("template");
    template.innerHTML = `
        <div id="ui5_content" name="ui5_content">
            <slot name="content"></slot>
        </div>
        <script id="oView" name="oView" type="ui5_content">        
        <mvc:View 
            controllerName="myView.Template"
            xmlns="sap.suite.ui.microchart"
            xmlns:mvc="sap.ui.core.mvc"
            xmlns:m="sap.m">
            <m:GenericTile id="genTile" class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" size="L" header="Radial Chart"
                frameType="OneByOne" press="press">
                <m:tileContent>
                    <m:TileContent footer="Some footer">
                        <m:content>
                            <RadialMicroChart id="cont" size="Responsive" percentage="99.9" alignContent="Right" valueColor="Neutral"/>
                        </m:content>
                    </m:TileContent>
			    </m:tileContent>
            </m:GenericTile>
        </mvc:View>
        </script>            
    `;
    //Test for github
    class NewRadialMicroChart extends HTMLElement {
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
            //
        }

        set percentage(newPercentage) {
            let sViewId = this.firstChild.getAttribute("sapui5viewid");
            var oView = sap.ui.getCore().byId(sViewId); 
            if(!oView){
                return; 
            }
            oView.byId("cont").setPercentage(newPercentage);
        }

        set valueColor(newValueColor) {
            let sViewId = this.firstChild.getAttribute("sapui5viewid");
            var oView = sap.ui.getCore().byId(sViewId); 
            if(!oView){
                return; 
            }
            oView.byId("cont").setValueColor(newValueColor);
        }

        set header(newHeader) {
            let sViewId = this.firstChild.getAttribute("sapui5viewid");
            var oView = sap.ui.getCore().byId(sViewId); 
            if(!oView){
                return; 
            }
            oView.byId("genTile").setHeader(newHeader);
        }
        set subheader(newSubheader) {
            let sViewId = this.firstChild.getAttribute("sapui5viewid");
            var oView = sap.ui.getCore().byId(sViewId); 
            if(!oView){
                return; 
            }
            oView.byId("genTile").setSubheader(newSubheader);
        }
    }
    customElements.define("ch-processpartner-sample-radialmicrochart", NewRadialMicroChart);

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
