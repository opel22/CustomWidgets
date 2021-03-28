sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageBox",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function(Controller, MessageBox, Filter, FilterOperator) {
  "use strict";
  return Controller.extend("de.sapui5buch.demo.controller.App", {
    onPress : function(oEvent) {
      var oInputField = this.byId("idInputField");
      var sValue = oInputField.getValue();
      MessageBox.show(
        "Hallo " + sValue, {
          icon: MessageBox.Icon.INFORMATION,
          title: "Hallo Nachricht",
          }
      );
    },
    onSuggest: function(oEvent) {
			var sTerm = oEvent.getParameter("suggestValue");
			var aFilters = [];
			if (sTerm) {
				aFilters.push(new Filter("BusinessPartnerID", FilterOperator.StartsWith, sTerm));
			}
      oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
    },
    onSuggestionItemSelected : function(oEvent) {
      var oSelectedItem = oEvent.getParameter("selectedItem");
      var sBindingPath = oSelectedItem.getBindingContext().getPath();
      this._updateUI(sBindingPath);
    },

    _updateUI : function(sBindingPath) {
      var oHeaderContent = this.byId("headerContent");
      oHeaderContent.bindElement(sBindingPath);

      var oAdrSection = this.byId("adressSection");
      oAdrSection.setVisible(true);
      oAdrSection.bindElement(sBindingPath + "/Address")
      var oObjLayout = this.byId("ObjectPageLayout");
      oObjLayout.setShowHeaderContent(true);
      oObjLayout.setToggleHeaderOnTitleClick(true);
    },

    onValueHelpRequest : function(oEvent) {
      var sInputValue = oEvent.getSource().getValue();
			this._sInputId = oEvent.getSource().getId();
			if (!this._oValueHelpDialog) {
				this._oValueHelpDialog = sap.ui.xmlfragment(
					"de.sapui5buch.demo.view.SelectDialog",
					this
				);
				this.getView().addDependent(this._oValueHelpDialog);
			}
			this._oValueHelpDialog.getBinding("items").filter([new Filter(
				"BusinessPartnerID",
				FilterOperator.Contains, sInputValue
			)]);

			this._oValueHelpDialog.open(sInputValue);
    },

    onSearch: function(oEvent) {
      var sValue = oEvent.getParameter("value");
			var oFilter = new Filter(
				"BusinessPartnerID",
				FilterOperator.Contains, sValue
			);
	
			oEvent.getSource().getBinding("items").filter([oFilter]);
    },

    onClose : function(oEvent) {
      var oSelectedItem = oEvent.getParameter("selectedItem");
			if (oSelectedItem) {
        this._updateUI(oSelectedItem.getBindingContext().getPath());
			}
    }


  });
});

//"de/sapui5buch/demo/controller/BaseController",