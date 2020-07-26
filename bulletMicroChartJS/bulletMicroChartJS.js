(function() { 
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
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.content.cloneNode(true));
            
            this._props = {};
            
            sap.ui.getCore().attachInit(function() {
                "use strict";

                /*var oActuals = new sap.suite.ui.microchart.BulletMicroChartData({
                    color: "Good",
                    value: 120
                });*/
                
                var oThreshold1 = new sap.suite.ui.microchart.BulletMicroChartData({
                    color: "Error",
                    value: 0
                });

                var oThreshold2 = new sap.suite.ui.microchart.BulletMicroChartData({
                    color: "Critical",
                    value: 50
                });

                var oThreshold3 = new sap.suite.ui.microchart.BulletMicroChartData({
                    color: "Critical",
                    value: 150
                });

                var oThreshold4 = new sap.suite.ui.microchart.BulletMicroChartData({
                    color: "Error",
                    value: 200
                });

                var oBulletMicroChart = new sap.suite.ui.microchart.BulletMicroChart({
                    scale: "M",
                    targetValue: "100",
                    forecastValue: "110",
                    showValueMarker: true,
                    size: "Responsive",
                    actual: [{
                        value: 130,
                        color: "Good"
                    }]
                });

                oBulletMicroChart.addThreshold(oThreshold1);
                oBulletMicroChart.addThreshold(oThreshold2);
                oBulletMicroChart.addThreshold(oThreshold3);
                oBulletMicroChart.addThreshold(oThreshold4);

                
                var oGenericTile = new sap.m.GenericTile({
                    header: "GT Header",
                    subheader: "GT Subheader",
                    frameType: "OneByOne",
                    tileContent: oBulletMicroChart
                }); 
                
                oGenericTile.placeAt(content);

                content.setAttribute("sapUi5ViewId",oGenericTile.getId());
            });

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
    customElements.define("ch-processpartner-sample-bulletmicrochartjs", NewBulletMicroChartJS);
})();
