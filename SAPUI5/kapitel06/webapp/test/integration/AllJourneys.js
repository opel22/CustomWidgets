sap.ui.define([
  "sap/ui/test/Opa5",
  "de/sapui5buch/demo/test/integration/arrangements/Startup",
  "de/sapui5buch/demo/test/integration/BasicJourney"
], function(Opa5, Startup) {
  "use strict";

  Opa5.extendConfig({
    arrangements: new Startup(),
    pollingInterval: 1
  });

});
