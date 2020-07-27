(function() {
    /*
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


   _shadowRoot = this.attachShadow({mode: "open"});



    */
    //Test for github
    customElements.define("ch-processpartner-sample-bulletmicrochartjs", class extends HTMLElement {
        constructor() {
            super(); 
            this._props = {};

            this.$this = $(this);
            this.$contDiv = $("<div>").attr("id", "ui5_content").appendTo(this.$this);
            this.$contSlot = $("<slot>").attr("id", "content").appendTo(this.$contDiv);
            
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
                }).placeAt("content");

                //oGenericTile.setAttribute("sapUi5ViewId",_oView.getId());              
                //oGenericTile.placeAt(content);
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
    })
})();
