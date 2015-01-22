/*jslint nomen:true*/
/*global eFC, $, Backbone, U, window, log*/
(function (eFC, $, Backbone, U) {
    "use strict";

    eFC.JTS.Search.ResultsModel = Backbone.Model.extend({
        defaults: {
            page: 1,
            'page-size': 10
        },

        loading: false,

        initialize: function () {
            U.bindAll(this, "onSuccess", "setElementAdditionalAttributes");
            this.resultsCollection = this.createCollection();
            this.resultsCollection.model = eFC.JTS.Search.ResultModel;

            this.on('change', this.fetch, this);
            this.resultsCollection.on('change', this.onResultDeleted, this);
        },

        createCollection: function () {
            return new Backbone.Collection();
        },

        fetch: function () {
            var self = this;

            if (this.loading) {
                return;
            }

            this.loading = true;
            this.trigger('loading');

            $.ajax({
                url: this.url(),
                type: "GET",
                data: this.getState(),
                dataType: "json",
                contentType: 'application/json',
                success: this.onSuccess,
                error: function (err) {
                    log('error', err);
                    self.loading = false;
                    self.trigger('loaded');
                }
            });
        },

        url: function () {
            return this.get("tunnelUrl") + this.get('pathToSearch');
        },

        getState: function () {
            var state = U.clone(this.attributes);

            delete state.results;
            delete state.total;
            delete state.tunnelUrl;
            delete state.contextPath;
            delete state.pathToPage;
            delete state.searchBackLink;

            return state;
        },

        onSuccess: function (data) {
            this.loading = false;
            this.set({
                results: this.getResultsCollection(data)
            }, {silent: true});

            this.trigger('loaded');
        },

        getResultsCollection: function (data) {
            var self = this;

            this.resultsCollection.reset();
            if (data) {
                if (data.jobTemplates) {
                    U.each(data.jobTemplates, this.setElementAdditionalAttributes);

                    self.resultsCollection.add(data.jobTemplates);

                    this.set({
                        total: data.totalCount
                    }, {silent: true});
                } else {
                    self.resultsCollection.add(data);
                    this.unset('total', {silent: true});
                }
            }

            return this.resultsCollection;
        },
        setElementAdditionalAttributes: function (obj) {
            obj.backLink = this.get('searchBackLink');
        },

        onResultDeleted: function () {
            this.set({
                page: 1
            }, {silent: true});
            this.trigger('change');
        },

        getResultUrl: function (result) {
            return this.get("contextPath") + this.get("pathToPage") + result.id;
        },

        pageInfo: function () {
            var info = {
                    total: this.get('total'),
                    page: parseInt(this.get('page'), 10),
                    perPage: parseInt(this.get('page-size'), 10),
                    pages: Math.ceil(this.get('total') / 10),
                    prev: false,
                    next: false
                },
                pages;

            if (info.page > 1) {
                info.prev = info.page - 1;
            }

            if (info.page < info.pages) {
                info.next = info.page + 1;
            }

            pages = this.calculatePages(info);
            info.minPage = pages[0];
            info.maxPage = pages[1];

            return info;
        },

        calculatePages: function (info) {
            var min, max, half = Math.ceil(info.perPage / 2);
            /* start offset */
            if (info.page <= half || info.pages <= half || (info.pages < info.perPage)) {
                min = 1;
            } else if (info.page >= (info.pages - half)) {
                min = info.pages - info.perPage + 1;
            } else {
                min = info.page - half;
            }
            /* end offset */
            if (info.pages < info.perPage) {
                max = info.pages;
            } else {
                max = min + info.perPage - 1;
            }
            return [min, max];
        }
    });

}(eFC, $, Backbone, U));
