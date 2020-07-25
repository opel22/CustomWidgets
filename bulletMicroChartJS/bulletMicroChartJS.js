(function() { 
    let _shadowRoot;
    let _oView;

    let template = document.createElement("template");
    template.innerHTML = `
        <div id="ui5_content" name="ui5_content">
            <slot name="content"></slot>
        </div>
        <script id="oView" name="oView" type="ui5_content">
        </script>
        <script>
            src="https://sapui5.hana.ondemand.com/resources/sap-ui-core.js"
            data-sap-ui-libs="sap.m,sap.suit.ui"
            data-sap-ui-theme="sap_bluecrystal"
        </script>           
    `;
    //Test for github
    class NewBulletMicroChartJS extends HTMLElement {
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
    }
    customElements.define("ch-processpartner-sample-bulletmicrochart", NewBulletMicroChartJS);

    function loadthis(that) {
        var that_ = that;
      
        let content = document.createElement('div');
        content.slot = "content";

        that_.appendChild(content);

        sap.ui.getCore().attachInit(function() {
            "use strict";

            var oBulletMicroChart = new sap.suite.ui.microchart.BulletMicroChart({
                scale="M",
                targetValue="100",
                forecastValue="110",
                showValueMarker="true",
                size="Responsive",
                actuals: [
                    new sap.suite.ui.microchart.BulletMicroChartData({
                        color: "Good",
                        value: 120
                    }),
                ],
                thresholds: [
                    new sap.suite.ui.microchart.BulletMicroChartData({
                        color: "Error",
                        value: 0
                    }),
                    new sap.suite.ui.microchart.BulletMicroChartData({
                        color: "Critical",
                        value: 50
                    }),
                    new sap.suite.ui.microchart.BulletMicroChartData({
                        color: "Critical",
                        value: 150
                    }),
                    new sap.suite.ui.microchart.BulletMicroChartData({
                        color: "Error",
                        value: 200
                    })
                ]
            });

            var oGenericTile = new sap.m.GenericTile({
                header: "GT Header",
                subheader: "GT Subheader",
                frameType="OneByOne",
                tileContent: oBulletMicroChart
            });




/*
            //### Controller ###
            sap.ui.define([
                "sap/ui/core/mvc/Controller"
            ], function(Controller) {
                "use strict";
                
                return Controller.extend("sap", {
                    //hier kämen die Methoden rein, Bsp. onButtonPress
                });
            });
        
            //### THE APP: place the XMLView somewhere into DOM ###
*/            
            oGenericTile.placeAt(content);

            content.setAttribute("sapUi5ViewId",oGenericTile.getId());

        });

    }

})();
