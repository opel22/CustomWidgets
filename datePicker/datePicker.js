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
            xmlns:mvc="sap.ui.core.mvc"
            xmlns:l="sap.ui.layout"
            xmlns="sap.m">
            <Label text='DatePicker with display format for months and years' labelFor="DP10"/>
            <DatePicker
                id="DP10"
                value="2015-11-23"
                displayFormat="MM-y"
                change="handleChange"
                class="sapUiSmallMarginBottom"/>
            <Label text="DatePicker with display format for years" labelFor="DP11"/>
            <DatePicker
                id="DP11"
                value="2015-11-23"
                displayFormat="yyyy"
                change="handleChange"
                class="sapUiSmallMarginBottom"/>
        </mvc:View>        
        </script>          
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

        set value(newValue) {
            let sViewId = this.firstChild.getAttribute("sapui5viewid");
            var oView = sap.ui.getCore().byId(sViewId); 
            if(!oView){
                return; 
            }
            if(typeof(newValue) === "string") {
                newValue = Date.now();
            } else {
                oView.byId("DRS4").setValue(newValue);
            }
        }
        get value() {
            let sViewId = this.firstChild.getAttribute("sapui5viewid");
            var oView = sap.ui.getCore().byId(sViewId); 
            if(!oView){
                return; 
            }
            return oView.byId("DRS4").getValue();
        }

        
    }
    customElements.define("ch-processpartner-sample-datepicker", NewDatePicker);

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
