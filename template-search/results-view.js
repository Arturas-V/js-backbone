/*jslint nomen:true*/
/*global eFC, $, Backbone, U, document, scrollTop*/
(function (eFC, $, Backbone, U) {
    "use strict";

    eFC.JTS.Search.ResultsView = Backbone.View.extend({
        tagName: 'div',
        className: 'listContainer',

        initialize: function (options) {
            this.options = options || {};
            this.noResultsTpl = U.template($(this.options.noResultsTplId).html());

            this.pager = new eFC.Components.PagerView({
                collection: this.model
            });

            this.hide();
            this.model.on('loaded', this.render, this);
            this.pager.on('switchPage', this.onSwitchPage, this);
        },

        render: function () {
            var self = this,
                collection = this.model.get('results'),
                resultView;

            this.$el.empty();

            if (!collection.length) {
                this.renderNoResultsTpl();
            } else {
                U.each(collection.models, function (model) {
                    resultView = new eFC.JTS.Search.ResultView({
                        model: model
                    });
                    self.$el.append(resultView.$el);
                });
            }

            this.renderPager();
            this.show();
        },

        renderNoResultsTpl: function () {
            this.$el.html(this.noResultsTpl());
        },

        renderPager: function () {
            this.$el.append($('<div id="pagination" class="pagination"></div>'));
            this.pager.setElement(this.$el.find('#pagination'));
            this.pager.el = this.pager.$el;
            this.pager.render();
            this.pager.delegateEvents();
        },

        onSwitchPage: function (page) {
            this.model.set({page: page});
        },

        hide: function () {
            this.$el.fadeOut(200);
        },
        show: function () {
            /**
             * bug in chrome, after show scrollwheel is not working
             * steps:
             * 1. do a search
             * 2. go to some feed item edit page
             * 3. press browser's back button
             */
            this.$el.fadeIn(200, function () {
                $(document).scrollTop(0);
            });
        }
    });
}(eFC, $, Backbone, U));
