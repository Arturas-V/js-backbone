/*jslint nomen:true*/
/*global eFC, $, Backbone, U, window*/
(function (eFC, $, Backbone, U) {
    "use strict";

    eFC.JTS.Search.ResultView = Backbone.View.extend({
        templateId: '#searchTemplateItem',
        tagName: 'ul',
        className: "result",
        events: {
            //"click .previewJobTemplate": "onFeedDelete"
            //"click .open": "showJobTemplate"
        },
        initialize: function () {
            this.template = U.template($(this.templateId).html());

            this.btnLoader = new eFC.Components.BtnLoaderView({
                el: this.$el.find('.submit')
            });

            this.render();
            this.model.on('loaded', this.onDeleted, this);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.delegateEvents();
        },
        get: function (name) {
            return this.model.get(name);
        },
        getDate: function (name) {
            return eFC.helpers.formatDate(this.model.get(name));
        }
    });
}(eFC, $, Backbone, U));
