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
            xmlns="sap.suite.ui.microchart" xmlns:mvc="sap.ui.core.mvc" xmlns:m="sap.m">
            <m:GenericTile id="genTile" header="Revenue Dynamics"
                frameType="OneByOne" press="press">
                <m:tileContent>
                    <m:TileContent id="tileCont" unit="CHF" footer="With Forecast">
                        <m:content>
                            <BulletMicroChart id="cont" scale="M" targetValue="100"
                                forecastValue="110" showValueMarker="true" size="Responsive">
                                <actual>
                                    <BulletMicroChartData value="120" color="Good" />
                                </actual>
                                <thresholds>
                                    <BulletMicroChartData value="0" color="Error" />
                                    <BulletMicroChartData value="50" color="Critical" />
                                    <BulletMicroChartData value="150" color="Critical" />
                                    <BulletMicroChartData value="200" color="Error" />
                                </thresholds>
                            </BulletMicroChart>
                        </m:content>
                    </m:TileContent>
                </m:tileContent>
            </m:GenericTile>
        </mvc:View>
        </script>            
    `;
    //Test for github
    class NewBulletMicroChart extends HTMLElement {
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

        //oView.byId("cont").mProperties["targetValue"] = 100
        set targetValue(newTargetValue) {
            let sViewId = this.firstChild.getAttribute("sapui5viewid");
            var oView = sap.ui.getCore().byId(sViewId); 
            if(!oView){
                return; 
            }
            oView.byId("cont").setTargetValue(newTargetValue);
        }

        //oView.byId("cont").mProperties["forecastValue"] = 110
        set forecastvalue(newForecastValue) {
            let sViewId = this.firstChild.getAttribute("sapui5viewid");
            var oView = sap.ui.getCore().byId(sViewId); 
            if(!oView){
                return; 
            }
            oView.byId("cont").setTargetValue(newForecastValue);
        }
        
        //Die verschiedenen Werte für die "thresholds":
        //oView.byId("cont").mAggregations["thresholds"][0]["mProperties"]["value"] => 0
        //oView.byId("cont").mAggregations["thresholds"][0]["mProperties"]["color"] => Error

        //oView.byId("cont").mAggregations["thresholds"][1]["mProperties"]["value"] => 50
        //oView.byId("cont").mAggregations["thresholds"][1]["mProperties"]["color"] => Critical

        //oView.byId("cont").mAggregations["thresholds"][2]["mProperties"]["value"] => 150
        //oView.byId("cont").mAggregations["thresholds"][2]["mProperties"]["color"] => Critical

        //oView.byId("cont").mAggregations["thresholds"][3]["mProperties"]["value"] => 200
        //oView.byId("cont").mAggregations["thresholds"][3]["mProperties"]["color"] => Error

        //oView.byId("cont").mAggregations["actual"]["mProperties"]["value"] = 120






        set unit(newUnit) {
            let sViewId = this.firstChild.getAttribute("sapui5viewid");
            var oView = sap.ui.getCore().byId(sViewId); 
            if(!oView){
                return; 
            }
            oView.byId("tileCont").setUnit(newUnit);
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
    customElements.define("ch-processpartner-sample-bulletmicrochart", NewBulletMicroChart);

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
