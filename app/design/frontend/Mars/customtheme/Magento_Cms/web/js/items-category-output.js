define([
        'jquery',
        'ko',
        'uiComponent',
        'mage/url',
        'slick',
        'domReady!'
    ], function ($, ko, Component, urlBuilder) {
        'use strict'

        return Component.extend({
            productsImages: ko.observableArray(),

            itemName: ko.observable(''),
            itemQty: ko.observable(''),

            showNotification: ko.observable(false),
            initialize: function () {
                this._super();
            },
            getItems: function () {
                var self = this;
                $('body').trigger('processStart');

                var itemName = document.getElementById("itemNameId").value;
                self.itemName(itemName)

                var itemQty = document.getElementById("itemQtyId").value;
                self.itemQty(itemQty)

                self.getProducts(self.itemName(), self.itemQty())
            },

            getProducts: function (productName, productQuantity) {
                console.log(productName, productQuantity)
                var self = this;
                var url = urlBuilder.build("graphql");
                var headers = {
                    'Authorization':'bearer s2pzubm2fb4x3axto8egns760xawxzct',
                    'access-control-allow-origin':'*'
                };
                $.ajax({
                    type: 'post',
                    url,
                    contentType: "application/json",
                    headers,
                    data: JSON.stringify({
                        query: `query ($productName: String!) {
                                  products(
                                    filter: { name: {match: $productName}}
                                  )
                                  {
                                    items {
                                    name
                                    sku
                                        image {
                                        url
                                        label
                                       }
                                     }
                                    }
                                  }`,
                        variables: {
                            "productName": productName
                        }
                    }),
                        success: function(data){
                        var slicedData = data.data.products.items.slice(0, productQuantity);
                        console.log(slicedData)
                        self.productsImages([])
                        self.productsImages(slicedData)
                        $('body').trigger('processStop');

                        if(data.data.products.items.length === 0) {
                            self.showNotification(true)
                        }
                        else {
                            self.showNotification(false)
                        }
                    },
                    error: function(data){
                        console.log('error', data);
                    }
                });
            },
        });
    }
);
