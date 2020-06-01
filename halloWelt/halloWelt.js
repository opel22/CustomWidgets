(function() { 
    let _shadowRoot;
    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
    <style>
    canvas.drawingBuffer {
        z-index : 11;
        position: absolute;
        width   : 100%;
        height  : 100%;
        top     : 50px;
        bottom  : 0;
        left    : 50px;
        right   : 0
    }   
    </style>
    <div id="export_div" name="export_div">
        <slot name="export_button"></slot>
    </div>
    `;
    console.log("Test");
    class HalloWelt extends HTMLElement {
        constructor() {
            super();

            _shadowRoot = this.attachShadow({
                mode: "open"
            });
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));

            this._id = createGuid();

            _shadowRoot.querySelector("#export_div").id = this._id + "_export_div";

            this._firstConnection = 0;
        }

        connectedCallback() {
            try {
                if (window.commonApp) {
                    let outlineContainer = commonApp.getShell().findElements(true, ele => ele.hasStyleClass && ele.hasStyleClass("sapAppBuildingOutline"))[0]; // sId: "__container0"

                    if (outlineContainer && outlineContainer.getReactProps) {
                        let parseReactState = state => {
                            let components = {};

                            let globalState = state.globalState;
                            let instances = globalState.instances;
                            let app = instances.app["[{\"app\":\"MAIN_APPLICATION\"}]"];
                            let names = app.names;

                            for (let key in names) {
                                let name = names[key];

                                let obj = JSON.parse(key).pop();
                                let type = Object.keys(obj)[0];
                                let id = obj[type];

                                components[id] = {
                                    type: type,
                                    name: name
                                };
                            }

                            for (let componentId in components) {
                                let component = components[componentId];
                            }

                            let metadata = JSON.stringify({
                                components: components,
                                vars: app.globalVars
                            });

                            if (metadata != this.metadata) {
                                this.metadata = metadata;

                                this.dispatchEvent(new CustomEvent("propertiesChanged", {
                                    detail: {
                                        properties: {
                                            metadata: metadata
                                        }
                                    }
                                }));
                            }                            
                        };

                        let subscribeReactStore = store => {
                            this._subscription = store.subscribe({
                                effect: state => {
                                    parseReactState(state);
                                    return {
                                        result: 1
                                    };
                                }
                            });
                        };

                        let props = outlineContainer.getReactProps();
                        if (props) {
                            subscribeReactStore(props.store);
                        } else {
                            let oldRenderReactComponent = outlineContainer.renderReactComponent;
                            outlineContainer.renderReactComponent = e => {
                                let props = outlineContainer.getReactProps();
                                subscribeReactStore(props.store);

                                oldRenderReactComponent.call(outlineContainer, e);
                            }
                        }                        
                    }
                }
            } catch (e) {}
        }
        
        disconnectedCallback() {
            if (this._subscription) { // react store subscription
                this._subscription();
                this._subscription = null;
            }
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
            if ("designMode" in changedProperties) {
                this._designMode = changedProperties["designMode"];
            }
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            var that = this;
            if (this._firstConnection === 0) {
                this._firstConnection = 1;
                
                async function LoadLibs() {
                    loadthis(that);
                };
                LoadLibs();
            }
        }

        _renderExportButton() {
            let components = this.metadata ? JSON.parse(this.metadata)["components"] : {};
            console.log("_renderExportButton-components");
            console.log(components);
            console.log("end");
        }
    };
    customElements.define("com-sap-sample-hallowelt",  HalloWelt);
})();

// Functions
function loadthis(that) {
    var that_ = that;

    let buttonSlot = document.createElement('div');
    buttonSlot.slot = "export_button";
    that_.appendChild(buttonSlot);

    that_._Label = new sap.m.Label({
        required: false,
        text: "Button value",
        design: "Bold"
    });

    that_._exportButton = new sap.m.Button({
        id: "scan",
        text: "Button",
        icon: "sap-icon://bar-code",
        visible: true,
        tooltip: "We will see ...",
        press: function() {
            startScan();
        }
    });

    that_._Input = new sap.m.Input({
        id: "scannedValue",
        type: sap.m.InputType.Text,
        placeholder: ''
    });

    that_._simpleForm = new sap.ui.layout.form.SimpleForm({
        labelSpanL: 3,
        labelSpanM: 3,
        emptySpanL: 3,
        emptySpanM: 3,
        columnsL: 1,
        columnsM: 1,
        editable: true,
        content: [
            that_._Label,
            that_._Input,
            that_._exportButton
        ]
    })

    that_._simpleForm.placeAt(buttonSlot);
    that_._renderExportButton();

    if (that_._designMode) {
        sap.ui.getCore().byId("scan").setEnabled(false);
        sap.ui.getCore().byId("scannedValue").setEditable(false);
    }
};