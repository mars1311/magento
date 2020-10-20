define([
    'jquery',
    'ko',
    'uiComponent',
    'mage/collapsible',
    'matchMedia',
    'domReady!'
], function ($, ko, Component) {
    'use strict';

    return Component.extend({
        defaults: {
            itemsAmount:parseInt(window.checkoutConfig.quoteData.items_qty)
        },

        initialize: function () {
            this._super();
            this.domReady();
        },

        domReady: function () {
            var accordionContainer = $('.accordion-container'),
                accordionOptions = {
                "header": ".accordion-title",
                "content": "#shopping-cart-table",
            };

            accordionContainer.collapsible(accordionOptions);

            mediaCheck({
                media: '(min-width: 768px)',
                entry: function () { // desktop
                    accordionContainer.collapsible('activate');
                    accordionContainer.collapsible('option', 'collapsible', false);
                },
                exit: function () { // mobile
                    accordionContainer.collapsible('deactivate');
                    accordionContainer.collapsible('option', 'collapsible', true);
                }
            });
        }
    });
})
