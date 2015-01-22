/*global eFC, $, Backbone, U*/

(function (eFC, $, Backbone, U) {
    "use strict";

    eFC.Base = eFC.Base || {};
    eFC.Base.PageView = Backbone.View.extend({
        id: "mainContent",
        tagName: "div",
        templateId: "#page-view-tpl",

        initialize: function () {
            this.template = U.template($(this.templateId).html());
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));

            eFC.initChosen();
        }
    });
}(eFC, $, Backbone, U));