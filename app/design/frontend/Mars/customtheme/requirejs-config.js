var config = {
    config: {
        mixins: {
            'Magento_Catalog/js/catalog-add-to-cart': {
                'Magento_Catalog/js/catalog-add-to-cart-mixin': true
            },
            'Magento_Checkout/js/view/shipping': {
                'Magento_Checkout/js/mixin/view/shipping-payment-mixin': true
            },
            'Magento_Checkout/js/view/payment': {
                'Magento_Checkout/js/mixin/view/shipping-payment-mixin': true
            }
        }
    }
};

