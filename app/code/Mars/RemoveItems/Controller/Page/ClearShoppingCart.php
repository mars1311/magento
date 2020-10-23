<?php

declare(strict_types=1);

namespace Mars\RemoveItems\Controller\Page;
use Magento\Checkout\Model\Cart;
use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Framework\App\Action\Action;
class ClearShoppingCart extends Action
{
    public function execute()
    {
        $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
        $cartObject = $objectManager->create('Magento\Checkout\Model\Cart')->truncate();
        $cartObject->saveQuote();
    }
}
