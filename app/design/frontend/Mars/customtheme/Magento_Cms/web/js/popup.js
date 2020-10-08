define([
    'jquery',
    'Magento_Ui/js/modal/modal',
    ],
    function($, modal) {
    'use strict'
    $(document).ready(function() {
        function checkCookie() {
            let cookieValue = $.cookie('showPopup');
            let cookieTime = new Date();
            cookieTime.setTime(cookieTime.getTime() + (60 * 1000));
            $.cookie('showPopup', 'true', {expires: cookieTime});
            return cookieValue === 'true';
            }
            setTimeout(ModalPopUp, 5000)
            function ModalPopUp () {
                if ($.cookie('showPopup') === null) {
                modal({
                    autoOpen: true,
                    responsive: true,
                    clickableOverlay: true,
                    modalClass: 'modal-custom',
                    title: 'Subscribe to our newsletter!'
                }, $("#popup-content"));
                checkCookie();
            }
            }
        });
    }
);

