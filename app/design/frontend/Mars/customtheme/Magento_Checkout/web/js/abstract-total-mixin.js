define([], function () {
    'use strict';
    var mixin = {
        isFullMode: function () {
            return this.getTotals();
        }
    };
    return function (target) {
        return target.extend(mixin);
    };
});
