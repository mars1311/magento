/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'jquery-ui-modules/widget',
    'slick',
], function ($) {
    'use strict';

    $.widget('mage.itemsSlider', {
        options: {
        },

        _create: function () {
            this.sliderContainer = $(this.options.sliderContainerSelector);

            this.sliderContainer.not('.slick-initialized').slick({
               arrows: true,
               dots: true,
               infinite: true,
               slidesToShow: 3,
               slidesToScroll: 3,
               responsive: [
                   {
                       breakpoint: 768,
                       settings: {
                           slidesToShow: 2,
                           slidesToScroll: 2
                       }
                   },
                   {
                       breakpoint: 460,
                       settings: {
                           slidesToShow: 1,
                           slidesToScroll: 1
                       }
                   }
               ]
           });
       }
    });

    return $.mage.itemsSlider;
});
