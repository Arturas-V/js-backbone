/*jslint nomen:true*/
/*global eFC, $, Backbone, U*/
(function (eFC, $, Backbone, U) {
    "use strict";

    eFC.JTS.Search.ResultModel = Backbone.Model.extend({
        initialize: function () {
            U.bindAll(this, "onSuccess");
            this.generateUpdateLink();
        },
        generateUpdateLink: function () {
            var updatePageParams = {},
                updateLink,
                updatePageLink;

            updatePageLink = this.get('updatePageLink') || '';

            updatePageParams.companyId = this.get("companyId") || '';
            updatePageParams.backLink = this.get("backLink") || '';

            updateLink = updatePageLink + "/" + encodeURIComponent($.param(updatePageParams));
            this.set('updateLink', updateLink);
        },

        onSuccess: function () {
            this.clear();
            this.trigger('loaded');
        }
    });

}(eFC, $, Backbone, U));
