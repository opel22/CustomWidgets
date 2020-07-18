(function() {
    let template = document.createElement("template");
    template.innerHTML = ` 
        <form id="submitForm">
                <legend class="no">Process Partner Generic Tile properties</legend>
                    <div class="abra-prop">
                        <div class="abra-title">Earliest allowed value</div>
                        <div><input id="builder_header" class="abra-input" type="text" size="8"></div>				
                    </div>
                    <div class="abra-prop">
                        <div class="abra-title">Preferred picker position</div>
                        <div>
                            <select id="builder_prefPickerPos" class="abra-input" style="width:190px;">
                                <option value="top left">Above, left-aligned</option>
                                <option value="top right">Above, right-aligned</option>
                                <option value="bottom left">Below, left-aligned</option>
                                <option value="bottom right">Below, right-aligned</option>
                            </select>
                        </div>
                    </div>
                <input type="submit" style="display: none;">
        </form>
		`;
    class NewTileBuilderPanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));

            this._shadowRoot.getElementById("submitForm").addEventListener("submit", 
            this._submit.bind(this));
        }
        _submit(e) {
            e.preventDefault(), this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        header: this.header
                    }
                }
            }));
        }
        set header(newHeader) {
            this._shadowRoot.getElementById("builder_header").value = newHeader;
        }
        get header() {
            return this._shadowRoot.getElementById("builder_header").value;
        }
    }
        customElements.define("com-sap-sample-newtile-builder", NewTileBuilderPanel);
    })();