sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    'use strict';
    return Controller.extend("de.sapui5buch.demo.controller.JavaScriptView", {
		onInit : function() {
			var oLbl = this.byId("idLbl");
			oLbl.setVisible(true);
		}
    });
});