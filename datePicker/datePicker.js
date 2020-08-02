(function() { 
    let _shadowRoot;
    let _oView;

    let template = document.createElement("template");
    template.innerHTML = `
        <div id="ui5_content" name="ui5_content">
            <slot name="content"></slot>
        </div>

        <script id="sap-ui-bootstrap"
            src="https://openui5.hana.ondemand.com/resources/sap-ui-core.js"
            data-sap-ui-libs="sap.ui.core, sap.m, sap.ui.unified"
            data-sap-ui-theme="sap_fiori_3"
            data-sap-ui-async="true"
            data-sap-ui-compatversion="edge"
            data-sap-ui-xx-waitfortheme="init">
        </script><body id="content" class="sapUiBody"></body>

        <script id="oView" name="oView" type="ui5_content"></script>  
    `;
    //Test for github
    class NewDatePicker extends HTMLElement {
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

        get dateValue() {
            let sViewId = this.firstChild.getAttribute("sapui5viewid");
            var oView = sap.ui.getCore().byId(sViewId); 
            if(!oView){
                return; 
            }
            return oView.byId("DRS4").getDateValue();
        }

        
    }
    customElements.define("ch-processpartner-sample-datepicker", NewDatePicker);

    function loadthis(that) {
        var that_ = that;
      
        let content = document.createElement('div');
        content.slot = "content";

        that_.appendChild(content);

        sap.ui.getCore().attachInit(() => sap.ui.require([
            "sap/ui/core/Fragment",
            "sap/ui/model/json/JSONModel",
            "sap/ui/core/Core",
          ], async (Fragment, JSONModel, Core) => {
            "use strict";
          
            const control = await Fragment.load({
              definition: `<DatePicker xmlns="sap.m" xmlns:core="sap.ui.core"
                core:require="{ DateType: 'sap/ui/model/type/Date' }"
                maxDate="{/maxDate}"
                class="sapUiTinyMargin"
                displayFormat="yyyy"
                valueFormat="yyyy"
                width="7rem"
                value="{
                  path: '/myYear',
                  type: 'DateType',
                  formatOptions: {
                    pattern: 'yyyy',
                    source: {
                      pattern: 'yyyy'
                    }
                  },
                  constraints: { maximum: 2030 }
                }"
              />`,
            });
          
            Core.getMessageManager().registerObject(control, true);
            control.setModel(new JSONModel({
              myYear: new Date().getFullYear(), // current year, e.g. 2019
              maxDate: new Date("2030-12-31") // control awaits a JS date object for maxDate
            })).placeAt("content");
          }));
        
    }

})();
