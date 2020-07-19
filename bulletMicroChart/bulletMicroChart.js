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
                            <BulletMicroChart scale="M" targetValue="100"
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

        set value(newValue) {
            let sViewId = this.firstChild.getAttribute("sapui5viewid");
            var oView = sap.ui.getCore().byId(sViewId); 
            if(!oView){
                return; 
            }
            oView.byId("actualValue").setValue(newValue);
        }
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
/*
        that_._BulletChartDataAct = new sap.suite.ui.microchart.BulletMicroChartData({
            value: 120,
            color: "Good"
        });

        that_._BulletChartDataThr0 = new sap.suite.ui.microchart.BulletMicroChartData({
            value: 0,
            color: "Error"   
        });

        that_._BulletChartDataThr1 = new sap.suite.ui.microchart.BulletMicroChartData({
            value: 50,
            color: "Critical"
        });        

        that_._BulletChartDataThr2 = new sap.suite.ui.microchart.BulletMicroChartData({
            value: 150,
            color: "Critical" 
        });  

        that_._BulletChartDataThr3 = new sap.suite.ui.microchart.BulletMicroChartData({
            value: 200,
            color: "Error"
        });  

        that_._BulletMicroChart = new sap.suite.ui.microchart.BulletMicroChart({
            actual: that_._BulletChartDataAct,
            thresholds: [
                that_._BulletChartDataThr0,
                that_._BulletChartDataThr1,
                that_._BulletChartDataThr2,
                that_._BulletChartDataThr3
            ]
        });

        that_._tileContent = new sap.m.TileContent({
            content: that_._BulletMicroChart
        })

        that_._GenericTile = new sap.m.GenericTile({
            tileContent: that_._tileContent
        });
*/

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
