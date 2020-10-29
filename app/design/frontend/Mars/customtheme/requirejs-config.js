var config = {
    map: {
        '*': {
            slick:'Magento_Theme/js/slick.min',
            itemsSlider:'Magento_Cms/js/items-slider-widget',

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

