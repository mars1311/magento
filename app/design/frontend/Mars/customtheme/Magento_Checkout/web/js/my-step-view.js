define(
    [
        'jquery',
        'ko',
        'uiComponent',
        'underscore',
        'Magento_Checkout/js/model/step-navigator',
        'Magento_Checkout/js/model/quote'
    ],
    function ($, ko, Component, _, stepNavigator, quote) {
        return Component.extend({
            defaults: {
                template: 'Magento_Checkout/new-step',
                marsCustomerData: ko.observableArray([]),
                customerOrders: ko.observableArray([]),
                selectedItem: ko.observable('null'),
            },
            isVisible: ko.observable(true),
            initialize: function () {
                var self = this;
                self._super();
                quote.totals().items.forEach(function (item) {
                    self.customerOrders.push(ko.observable(item));
                });
                quote.shippingAddress.subscribe(function (value) {
                    self.marsCustomerData({
                        lastname: ko.observable(value.lastname),
                        firstname: ko.observable(value.firstname),
                        country: ko.observable(value.countryId),
                        company: ko.observable(value.company),
                        city: ko.observable(value.city),
                        street: ko.observable(value.street),
                        region: ko.observable(value.region),
                        postcode: ko.observable(value.postcode),
                        telephone: ko.observable(value.telephone),
                    });
                })

                stepNavigator.registerStep(
                    //step code will be used as step content id in the component template
                    'step_code',
                    //step alias
                    null,
                    //step title value
                    'Informational step',
                    //observable property with logic when display step or hide step
                    this.isVisible,

                    _.bind(this.navigate, this),
                    15
                );
            },

            highlightItem: function (item) {
                var self = this;
                self.selectedItem(item)
            },
            goToPrevStep: function () {
                stepNavigator.navigateTo('shipping');
            },
            navigate: function () {
                this.isVisible(true);
            },
            navigateToNextStep: function () {
                stepNavigator.next();
            }
        });
    }
);
