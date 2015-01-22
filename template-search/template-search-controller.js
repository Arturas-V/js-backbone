/*jslint nomen:true*/
/*global eFC, $, Backbone*/
(function (eFC, $, Backbone) {
    "use strict";

    eFC.JTS = eFC.JTS || {};
    eFC.JTS.Search = eFC.JTS.Search || {};
    eFC.JTS.Search.List = eFC.JTS.Search.List || {};
    eFC.JTS.Search.List.PageController = Backbone.Router.extend({
        routes: {
            'index': 'index',
            'search/:query': 'search',
            '*something': 'index'
        },

        initialize: function (options) {
            var contentContainer = $('.contentContainer'),
                formsContainer = $('#templateSearchFields');

            this.options = options || {};

            this.resultsModel = new eFC.JTS.Search.ResultsModel({
                contextPath: this.options.contextPath,
                tunnelUrl: this.options.tunnelUrl,
                pathToPage: this.options.pathToPage,
                createTemplateLink: this.options.createTemplateLink
            });

            this.formView = new eFC.JTS.Search.FormView({
                model: this.resultsModel,
                templateId: '#searchForm',
                loaderContainer: $('#mainContent'),
                withErrors: false
            });

            this.resultsView = new eFC.JTS.Search.ResultsView({
                model: this.resultsModel,
                noResultsTplId: "#noResultsTpl"
            });

            formsContainer.append(this.formView.$el);
            contentContainer.append(this.resultsView.$el);

            this.formView.on('submit', this.updateUrl, this);
            this.resultsModel.on("change:page", this.updateUrl, this);
            this.on("state_updated", this.onPageStateUpdated, this);
        },

        index: function () {
            this.navigate('index');
            this.activeMode = 'index';

            this.resultsView.hide();
            this.resultsModel.set(this.resultsModel.defaults, {silent: true});
            this.formView.render();

            this.trigger("state_updated");
        },

        search: function (query) {
            var state = $.deparam(query);

            this.activeMode = 'search';

            this.resultsModel.set(state);
        },

        updateUrl: function () {
            this.activeMode = 'search';

            this.navigate("search/" + this.getActualUrlWithState());

            this.trigger("state_updated");
        },

        getActualUrlWithState: function () {
            return encodeURIComponent($.param(this.resultsModel.getState()));
        },

        onPageStateUpdated: function () {
            var silentOpt = this.activeMode === 'index' ? {silent: true} : {silent: false};

            this.resultsModel.set("searchBackLink", "/job-template-administration#"
                + this.activeMode + "/" + this.getActualUrlWithState(), silentOpt);
        },

        getBackLink: function () {
            return this.resultsModel.get('searchBackLink');
        }
    });
}(eFC, $, Backbone));
