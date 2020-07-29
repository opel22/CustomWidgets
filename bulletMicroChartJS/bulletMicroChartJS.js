(function() {
    let template = document.createElement("template");
    template.innerHTML = `
  
    `;

   
    class BulletMicroChartJS extends HTMLElement {
        constructor() {
            super(); 
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.content.cloneNode(true));

            let content = document.createElement('div');
            content.slot = "content";
            shadowRoot.appendChild(content);

            sap.ui.getCore().attachInit(function() {
                "use strict";

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
                    tileContent: [
                        new sap.m.TileContent({
                            content: [oBulletMicroChart]
                        })
                    ]
                })
                
                var oView = new sap.ui.core.mvc.JSView({
                    content: [oGenericTile]
                });
                oView.placeAt(content);

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
    customElements.define("ch-processpartner-sample-bulletmicrochartjs", BulletMicroChartJS) ;
})();
