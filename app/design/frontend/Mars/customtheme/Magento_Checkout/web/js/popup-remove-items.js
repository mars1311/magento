define([
    'jquery',
    'ko',
    'uiComponent',
    'Magento_Ui/js/modal/modal',
    'mage/url',
    'mage/translate'
], function ($, ko, Component, modal, urlBuilder) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Magento_Checkout/popup-remove-items-btn'
        },

        clearShoppingCart: function() {
            var url = urlBuilder.build("removeitems/page/clearShoppingCart");
            $.ajax({
                url: url,
                type: 'POST',
                success: function() {
                    location.reload();
                },
                error: function(data) {
                    console.log('ERROR:', data);
                },
            });
        },

        popupDeleteItems: function () {
            var self = this,
                confirmModalBtn = {
                text: $.mage.__('Yes'),
                class: 'confirm modal-btn',
                click: function () {
                    self.clearShoppingCart();
                    this.closeModal();
                }
            },
                refuseModalBtn =  {
                text: $.mage.__('No'),
                class: 'refuse modal-btn',
                click: function () {
                    this.closeModal();
                }
            },
                options = {
                type: 'popup',
                responsive: true,
                innerScroll: true,
                title: $.mage.__('Do you really want to clear shopping cart?'),
                buttons: [confirmModalBtn, refuseModalBtn]
            };

            modal(options, $('#popup-modal'));
            $('#popup-modal').modal('openModal');
        },
    });
});
