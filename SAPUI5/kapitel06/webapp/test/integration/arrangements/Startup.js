sap.ui.define([
  "sap/ui/test/Opa5"
], function(Opa5) {
  "use strict";

  return Opa5.extend("de.sapui5buch.demo.test.integration.arrangements.Startup", {

    iStartMyApp: function () {
      this.iStartMyUIComponent({
        componentConfig: {
          name: "de.sapui5buch.demo",
          async: true,
          manifest: true
        }
      });
    }

  });
});
