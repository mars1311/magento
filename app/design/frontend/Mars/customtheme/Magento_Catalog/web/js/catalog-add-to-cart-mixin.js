define([
    'jquery',
    'Magento_Catalog/js/product/view/product-ids-resolver',
], function ($, idsResolver) {
    'use strict';

    return function (widget) {
        $.widget('mage.catalogAddToCart', widget, {
            ajaxSubmit: function (form) {
                var self = this,
                    productIds = idsResolver(form),
                    formData;

                    $(self.options.minicartSelector).trigger('contentLoading');
                    self.disableAddToCartButton(form);
                    formData = new FormData(form[0]);

                    $.ajax({

                        url: form.attr('action'),
                        data: formData,
                        type: 'post',
                        dataType: 'json',
                        cache: false,
                        contentType: false,
                        processData: false,

                        success: function (res) {
                            var eventData, parameters;

                            $(document).trigger('ajax:addToCart', {
                                'sku': form.data().productSku,
                                'productIds': productIds,
                                'form': form,
                                'response': res
                            });

                            if (self.isLoaderEnabled()) {
                                $('body').trigger(self.options.processStop);
                            }

                            if (res.backUrl) {
                                eventData = {
                                    'form': form,
                                    'redirectParameters': []
                                };

                                $('body').trigger('catalogCategoryAddToCartRedirect', eventData);

                                if (eventData.redirectParameters.length > 0 &&
                                    window.location.href.split(/[?#]/)[0] === res.backUrl
                                ) {
                                    parameters = res.backUrl.split('#');
                                    parameters.push(eventData.redirectParameters.join('&'));
                                    res.backUrl = parameters.join('#');
                                }

                                self._redirect(res.backUrl);

                                return;
                            }

                            if (res.messages) {
                                $(self.options.messagesSelector).html(res.messages);
                            }

                            if (res.minicart) {
                                $(self.options.minicartSelector).replaceWith(res.minicart);
                                $(self.options.minicartSelector).trigger('contentUpdated');
                            }

                            if (res.product && res.product.statusText) {
                                $(self.options.productStatusSelector)
                                    .removeClass('available')
                                    .addClass('unavailable')
                                    .find('span')
                                    .html(res.product.statusText);
                            }
                            self.enableAddToCartButton(form);

                            console.log('success from widget')
                        },
                    });
                },
            });
            return $.mage.catalogAddToCart;
        }
});

