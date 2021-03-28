sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "de/sapui5buch/demo/model/models"
], function (Controller,models) {
	"use strict";
	return Controller.extend("de.sapui5buch.demo.controller.App", {
        onInit : function() {
            var oData = models.createDataModel();
            this.getView().setModel(oData);

            var oVorname = this.byId("idVorname");
            oVorname.setEnabled(true);

            var oInput = new sap.m.Input(this.createId("idInput"), {
                value: " {/vorname} {/nachname}"
            });
            var oFlexBox = this.byId("idFlexBox");
            oFlexBox.addItem(oInput);
        },
        onPress : function(oEvent) {
            debugger;
        },
        onSelectionChange : function(oEvent) {
            var oSelectedItem = oEvent.getParameter("listItem");
            var oBindingContext = oSelectedItem.getBindingContext();
            var sPath = oBindingContext.getPath();
            var oForm = this.byId("adressForm");
            oForm.bindElement(sPath + "/Adresse");
        }
    });
});