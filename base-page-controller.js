/*jslint nomen:true */
/*global window, eFC, $, Backbone*/

(function (W, eFC, $, Backbone) {
    "use strict";

    eFC.Base = eFC.Base || {};
    eFC.Base.PageController = Backbone.Router.extend({
        pageViewClass: eFC.Base.PageView.extend(),
        pageModelClass: eFC.Base.PageModel.extend(),

        initialize: function (options) {
            this.options = options || {};

            this.initBase();

            this.renderPage();
        },

        initBase: function () {
            this.pageModel = new this.pageModelClass(this.options);

            this.pageView = new this.pageViewClass({
                model: this.pageModel
            });

            $("#wrapper").append(this.pageView.$el);

            this.pageModel.on("change:pageUrl", this.onPageRedirect, this);
        },

        onPageRedirect: function () {
            W.location.href = this.pageModel.get("pageUrl");
        },

        renderPage: function () {
            this.pageView.render();
        }
    });
}(window, eFC, $, Backbone));