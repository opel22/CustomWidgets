(function()  {
    let template = document.createElement("template");
    template.innerHTML = `
        <form id="form">
            <fieldset>
                <legend>Menue Bar Properties</legend>
                <table>
                    <tr>
                        <td>Color</td>
                        <td><input id="styling_color" type="text" size="40" maxlength="40"></td>
                    </tr>
                    <tr>
                        <td>Width</td>
                        <td><input id="styling_width" type="text" size="40" maxlength="40"></td>
                    </tr>
                </table>
                <input type="submit" style="display:none;">
            </fieldset>
        </form>
    `;
    class MenueBarStylingPanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));        
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
        }
        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                    detail: {
                        properties: {
                            color: this.color
                        }
                    }
            }));
        }
        set color(newColor) {
            this._shadowRoot.getElementById("styling_color").value = newColor;
        }
        get color() {
            return this._shadowRoot.getElementById("styling_color").value;
        }
        set width(newWidth) {
            this._shadowRoot.getElementById("styling_width").value = newWidth;
        }
        get width() {
            return this._shadowRoot.getElementById("styling_width").value;
        }
    }
    customElements.define("com-sap-sample-menuebar-styling", MenueBarStylingPanel);
   })();
