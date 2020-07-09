(function() { 
    let template = document.createElement("template");
    template.innerHTML = `
        <mvc:View
        controllerName="sap.m.sample.NumericContentDifColors.Page"
        xmlns="sap.m"
        xmlns:mvc="sap.ui.core.mvc">
        <GenericTile
                class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout"
                size="L"
                header="Country-Specific Profit Margin" 
                subheader="Expenses" press="press">
                    <TileContent unit="EUR"
                        footer="Current Quarter">
                            <NumericContent scale="M"
                                value="1.96"
                                valueColor="Error"
                                indicator="Up"
                                withMargin="false" />
		            </TileContent>
        </GenericTile>
    </mvc:View>
    `;
    class FioriTile extends HTMLElement {
        constructor() {
            super(); 
            let shadowRoot = this.attachShadow({mode: "open"});
            shadowRoot.appendChild(template.content.cloneNode(true));
            this.addEventListener("click", event => {
                var event = new Event("onClick");
                this.dispatchEvent(event);
            });

            this._props = {};
        }
        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }
        onCustomWidgetAfterUpdate(changedProperties) {
            
        }
    }
    customElements.define("com-sap-sample-fioritile", FioriTile);
})();
