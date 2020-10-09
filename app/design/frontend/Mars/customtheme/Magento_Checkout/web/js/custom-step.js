define(
    [
        'ko',
        'uiComponent',
        'underscore',
        'Magento_Checkout/js/model/step-navigator'
    ],
    function (ko, Component, _, stepNavigator) {
        return Component.extend({
            defaults: {
                template: 'Magento_Checkout/mystep',
                customText: ko.observable('some text from js '),
            },
            isVisible: ko.observable(true),
            initialize: function () {
                this._super();
                // register your step
                stepNavigator.registerStep(
                    //step code will be used as step content id in the component template
                    'step_code',
                    //step alias
                    null,
                    //step title value
                    'Order comment',
                    //observable property with logic when display step or hide step
                    this.isVisible,

                    _.bind(this.navigate, this),

                    /**
                     * sort order value
                     * 'sort order value' < 10: step displays before shipping step;
                     * 10 < 'sort order value' < 20 : step displays between shipping and payment step
                     * 'sort order value' > 20 : step displays after payment step
                     */
                    15
                );

                return this;
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
