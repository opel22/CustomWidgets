(function() { 
    let ui5Script = document.createElement('script');
    ui5Script.type = 'text/javascript';
    ui5Script.src = 'https://sapui5.hana.ondemand.com/resources/sap-ui-core.js';
    ui5Script.addEventListener(load, callback);
    shadowRoot.appendChild(ui5Script);
    //document.head.appendChild(ui5Script);


    let template = document.createElement('template');
    template.innerHTML = `
    <script>
    new sap.m.Button({
        text:"Hello world",
        press: function(){
            alert("hello SapUI5!");
        }
    }).placeAt("content");
    </script>
    <body class="sapUiBody" id="content"></body> 
    `;
    
    class HalloWelt extends HTMLElement {
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

    };
    customElements.define("com-sap-sample-hallowelt",  HalloWelt);
})();
