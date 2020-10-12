<?php

namespace Mars\CustomModule\Setup;

use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;

class UpgradeData implements \Magento\Framework\Setup\UpgradeDataInterface
{

    /**
     * @var \Magento\Cms\Model\BlockFactory
     */
    private $_blockFactory;

    /**
     * UpgradeData constructor
     *
     * @param \Magento\Cms\Model\BlockFactory $blockFactory
     */
    public function __construct(
        \Magento\Cms\Model\BlockFactory $blockFactory
    )
    {
        $this->_blockFactory = $blockFactory;
    }

    /**
     * Upgrade data for the module
     *
     * @param ModuleDataSetupInterface $setup
     * @param ModuleContextInterface $context
     * @return void
     * @throws \Exception
     */
    public function upgrade(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
        $setup->startSetup();

        // run the code while upgrading module to version 0.1.1
        if (version_compare($context->getVersion(), '0.1.1') < 0) {
            $cmsBlock = $this->_blockFactory->create()->load('my-block', 'identifier');

            $cmsBlockData = [
                'title' => 'My new block',
                'identifier' => 'my-block',
                'is_active' => 1,
                'stores' => [0],
                'content' => "<div class='block'>
                                <h2>This is from 0.1.1 module version</h2>
                            </div>",
            ];

            if (!$cmsBlock->getId()) {
                $this->_blockFactory->create()->setData($cmsBlockData)->save();
            } else {
                $cmsBlock->setContent($cmsBlockData['content'])->save();
            }
        }

        if (version_compare($context->getVersion(), '0.1.2') < 0) {
            $cmsBlock2 = $this->_blockFactory->create()->load('my-block', 'identifier');

            $cmsBlockData = [
                'content' => "<div class='block'>
                                <h2>This is from 0.1.2 module version</h2>
                            </div>",
            ];

            if ($cmsBlock2->getId()) {
                $cmsBlock2->setContent($cmsBlockData['content'])->save();
            }
        }

        $setup->endSetup();
    }
}
