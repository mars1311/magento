define([
        'jquery',
        'ko',
        'uiComponent',
    ],
    function($, ko, Component){

        return Component.extend({
            defaults: {
                template: 'Magento_Checkout/mycustomtext',
                imports:  {
                    customText:'checkout.steps.my-new-step:customText',
                }
            },
            customText: ko.observable(),

            initialize: function () {
                this._super();
                this.getCustomText();
            },

            getCustomText() {
                return this.customText;
            }
        });
    }
);
