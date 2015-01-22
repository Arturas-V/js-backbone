/*global window, eFC, $, Backbone, U*/
(function (eFC) {
    "use strict";

    eFC.JTS.Search.PageView = eFC.Base.PageView.extend({
        renderBackLink: function () {
            this.$el.find('#createTemplateBtn').attr("href", this.model.getCreateTplLink());
        }
    });
}(eFC));
