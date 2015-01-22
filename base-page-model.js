/*jslint nomen:true*/
/*global window, eFC, $, Backbone*/

(function (eFC, Backbone) {
    "use strict";

    eFC.Base = eFC.Base || {};
    eFC.Base.PageModel = Backbone.Model.extend({
        silent: {silent: true},

        onRedirect: function (redirectUrl) {
            this.set("pageUrl", redirectUrl);
        }
    });
}(eFC, Backbone));
