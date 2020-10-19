define([
    'jquery'
], function($){
    "use strict";

    //targeted elements
    let blockSearchToggle = '.search-toggle';
    let miniCartToggle =  '.shopping-cart-toggle';
    let headerLinksToggle = '.header-link-toggle';

    //elements to dropdown
    let blockSearch = $('.block.block-search');
    let miniCart = $('.minicart-wrapper');
    let headerLinks = $('.header.links');
    let elementsDropdown = [blockSearch, miniCart, headerLinks];

    function dropdown(targetElement, toggleElement) {
        $('body').on('click', targetElement, toggleElement, function () {
            elementsDropdown.forEach(function (item, index) {
                if (item !== toggleElement) {
                    item.css('display', 'none');
                }
            });
            toggleElement.slideToggle('slow');
        })
    }

    return function toggleNavbar() {
        dropdown(blockSearchToggle, blockSearch);
        dropdown(miniCartToggle, miniCart);
        dropdown(headerLinksToggle, headerLinks);
    }
});
