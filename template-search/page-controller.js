/*jslint nomen:true*/
/*global window, eFC, $, Backbone, U*/
(function (eFC, $) {
    "use strict";

    eFC.JTS = eFC.JTS || {};
    eFC.JTS.Search = eFC.JTS.Search || {};
    eFC.JTS.Search.PageController = eFC.Base.PageController.extend({
        initialize: function (options) {
            this.options = options || {};

            this.initBase();

            this.index();

            this.listController = new eFC.JTS.Search.List.PageController({
                contextPath: this.options.contextPath,
                tunnelUrl: this.options.tunnelUrl,
                pathToPage: this.options.pathToPage,
                createTemplateLink: this.options.jobTplCreatePageUrl
            });

            this.listController.on("state_updated", this.onPageStateUpdated, this);
        },

        initBase: function () {
            this.pageModel = new eFC.JTS.Search.PageModel(this.options);

            this.pageView = new eFC.JTS.Search.PageView({
                model: this.pageModel
            });

            $('#wrapper').append(this.pageView.$el);
        },

        index: function () {
            this.pageView.render();
        },

        onPageStateUpdated: function () {
            this.pageModel.set("listBackLink", this.listController.getBackLink());

            this.pageView.renderBackLink();
        }
    });
}(eFC, $));
