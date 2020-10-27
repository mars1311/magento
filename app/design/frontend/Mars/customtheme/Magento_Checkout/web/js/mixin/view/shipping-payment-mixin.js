define(
    [
        'ko',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/model/checkout-data-resolver',
        'uiRegistry',
        'Magento_Checkout/js/checkout-data',
        'Magento_Checkout/js/action/set-shipping-information',
        'Magento_Checkout/js/model/step-navigator',
    ], function (ko,
                 quote,
                 checkoutDataResolver,
                 registry,
                 checkoutData,
                 setShippingInformationAction,
                 stepNavigator) {
        'use strict';
        var mixin = {

            initialize: function () {
                this.isVisible = ko.observable(false); // set visible to be initially false to have your step show first
                this._super();
                return this;
            },
        };
        return function (target) {
            return target.extend(mixin);
        };
    }
);
