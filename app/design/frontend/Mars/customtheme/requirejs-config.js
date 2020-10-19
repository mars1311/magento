var config = {
    map: {
        '*': {
                toggleNavbar:'Magento_Theme/js/toggleNavbar'
        }
    },
    config: {
        mixins: {
            'Magento_Catalog/js/catalog-add-to-cart': {
                'Magento_Catalog/js/catalog-add-to-cart-mixin': true
            }
        }
    }
};

