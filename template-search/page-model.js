/*jslint nomen:true*/
/*global window, eFC, $, Backbone, U*/
(function (eFC, $) {
    "use strict";

    eFC.JTS.Search.PageModel = eFC.Base.PageModel.extend({
        initialize: function () {
            this.processData();
        },

        processData: function () {
            this.set({addTemplateLink: this.getCreateTplLink()}, {silent: true});
        },

        getCreateTplLink: function () {
            var link, addLinkParams = {};

            addLinkParams.backLink = this.get("listBackLink");

            link = this.get("contextPath") + this.get("jobTplCreatePageUrl")
                + "#create/" + encodeURIComponent($.param(addLinkParams));

            return link;
        }
    });
}(eFC, $));
