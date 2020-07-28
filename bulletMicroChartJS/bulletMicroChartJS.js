(function() {
    let template = document.createElement("template");
    template.innerHTML = `          
    `;

    //Test for github
    customElements.define("ch-processpartner-sample-bulletmicrochartjs", class extends HTMLElement {
        constructor() {
			super(); 
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

            this._props = {};
            this._tagContainer;
            this._tagType = "div";
 
            //this.$contDiv = $("<div>").attr("id", "ui5_content").appendTo(this.$this);
            //this.$contSlot = $("<slot>").attr("id", "content").appendTo(this.$contDiv);
            
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

                var shadow = window.getSelection(this._shadowRoot);
                this._tagContainer = document.createElement(this._tagType);
                this._tagContainer =appendChild(oGenericTile);
                this._shadowRoot.appendChild(this._tagContainer);                
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
