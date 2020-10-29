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
            categoryId: ko.observable(''),
            showNotification: ko.observable(false),
            showLoading: ko.observable(false),
            initialize: function () {
                this._super();
            },
            getCategoryId: function () {
                var self = this;
                self.showLoading(true)
                $('body').trigger('processStart');

                var categoryValue = document.getElementById("categoryId").value;
                self.categoryId(categoryValue)

                self.getProducts(self.categoryId())
            },
            getShoesSlider: function () {
                var self = this;
                self.getProducts(self.itemsCategories.shoes)
            },
            getCupsSlider: function () {
                var self = this;
                self.getProducts(self.itemsCategories.cups)
            },
            getProducts: function (productsID) {
                var self = this;
                var url = urlBuilder.build("graphql");
                var headers = {
                    'Authorization':'bearer s2pzubm2fb4x3axto8egns760xawxzct',
                    'access-control-allow-origin':'*'
                };
                var query = `query { products( filter:{ category_id:{ eq:"${productsID}" } } ){ items { name sku image {url label} } } } `;
//change parametres, how to send variables query
// find all items by name and set quantity
// on custom step create input
                $.ajax({
                    type: 'post',
                    url,
                    contentType: "application/json",
                    headers,
                    data: JSON.stringify({"query": query}),
                    success: function(data){
                        self.productsImages([])
                        self.productsImages(data.data.products.items)
                        self.showLoading(false)
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
