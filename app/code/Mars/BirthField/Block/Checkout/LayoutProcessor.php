<?php
namespace Mars\BirthField\Block\Checkout;
use Magento\Checkout\Block\Checkout\LayoutProcessor as CheckoutLayerprocessor;

class LayoutProcessor
{
    public function afterProcess(CheckoutLayerprocessor $subject, array $jsLayout)
    {
        $jsLayout['components']['checkout']['children']['steps']['children']['shipping-step']['children']
        ['shippingAddress']['children']['shipping-address-fieldset']['children']['customer_birth_field'] = [
            'component' => 'Magento_Ui/js/form/element/abstract',
            'config' => [
                'customScope' => 'shippingAddress',
                'template' => 'ui/form/field',
                'elementTmpl' => 'ui/form/element/date',
                'options' => [],
                'id' => 'birth_field_id'
            ],
            'dataScope' => 'shippingAddress.custom_attributes' . '.' . 'customer_birth_field',
            'label' => 'Date of birth',
            'provider' => 'checkoutProvider',
            'visible' => true,
            'validation' => [],
            'sortOrder' => 250,
            'id' => 'customer_birth_field'
        ];
        return $jsLayout;
    }
}
