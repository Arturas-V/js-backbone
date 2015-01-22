/*jslint nomen:true*/
/*global window, eFC, $, Backbone, U*/
(function (W, eFC, $) {
    "use strict";

    eFC.JTS.Search.FormView = eFC.Components.FormView.extend({
        render: function () {

            if (this.idFieldVal() === '0') {
                this.model.set({jobTemplateId: ""}, {silent: true});
            }
            this.$el.html(this.template(this));
            this.delegateEvents();
            if (this.withErrors) {
                this.$el.prepend(this.errorsView.$el);
                this.errorsView.hide();
            }
            this.initComponentsOnRender();
            eFC.initNumeric(this.form);
            this.model.set({jobTemplateId: "0"}, {silent: true});

            this.initTemplateAutocomplete();
            this.initCompanyAutocomplete();
        },

        initTemplateAutocomplete: function () {
            var requestURL = W.CONTEXT_PATH + '/t?dsrc=job-templates/autoCompleteName';

            this.templateAutocomplete = new eFC.Autocomplete(this.$el.find('[name=jobTemplateName]'), '', '', { minLength: 2, preserveValue: false });

            this.templateAutocomplete.setSourceUrl(requestURL);
        },

        initCompanyAutocomplete: function () {
            var requestURL = W.CONTEXT_PATH + '/t?dsrc=companies/help';

            this.companyAutocomplete = new eFC.Autocomplete(this.$el.find('[name=companyName]'), '', '',
                {
                    minLength: 2,
                    preserveValue: false,
                    termKey: 'name'
                });

            this.companyAutocomplete.setSourceUrl(requestURL);
        },

        onSubmit: function (e) {
            var formObj, btnEl = $(e.currentTarget), idField = this.$el.find('input[name="jobTemplateId"]');

            e.preventDefault();
            e.stopPropagation();

            formObj = this.$el.serializeObject();

            if (this.model.hasOwnProperty("clearModel") && typeof this.model.clearModel === 'function') {
                this.model.clearModel({silent: true});
            }

            this.model.set(this.model.defaults, {silent: true});

            this.model.set(formObj, {silent: true});

            if (idField.val() === '') {
                this.model.set({jobTemplateId: "0"}, {silent: true});
            }

            this.model.set('pathToSearch', btnEl.data('search-type'), {silent: true});
            this.model.fetch();
            this.trigger('submit');

        },
        idFieldVal: function () {
            return this.model.get('jobTemplateId');
        }
    });

}(window, eFC, $));
