define([
        'jquery',
        'ko',
        'uiComponent',
        'mage/url',
    ], function($, ko, Component, urlBuilder) {
        'use strict'

        return Component.extend({
            cmsBlocks:ko.observableArray(),

            getStaticBlocks: function() {
                var self = this;
                var url = urlBuilder.build("rest/V1/cmsBlock/search?searchCriteria[sortOrders][0][field]=identifier&searchCriteria[sortOrders][0][direction]=asc");
                var headers = { 'Authorization':'bearer s2pzubm2fb4x3axto8egns760xawxzct' };
                $.ajax({
                    url: url,
                    type: 'GET',
                    headers,
                    success: function(data) {
                        self.cmsBlocks(data.items)
                    },
                    error: function(data) {
                        console.log('ERROR:', data);
                    },
                });
            },
        });
    }
);
