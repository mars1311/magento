<?php

namespace Mars\CustomPatchData2\Setup\Patch\Data;

use Magento\Cms\Model\PageFactory;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Framework\Setup\Patch\DataPatchInterface;

class CustCmsCreate2 implements DataPatchInterface
{
    /**
     * ModuleDataSetupInterface
     *
     * @var ModuleDataSetupInterface
     */
    private $moduleDataSetup;

    /**
     * @var PageFactory
     */
    private $pageFactory;

    /**
     * @param ModuleDataSetupInterface $moduleDataSetup
     * @param PageFactory $pageFactory
     */
    public function __construct(
        ModuleDataSetupInterface $moduleDataSetup,
        PageFactory $pageFactory
    ) {
        $this->moduleDataSetup = $moduleDataSetup;
        $this->pageFactory = $pageFactory;
    }

    /**
     * {@inheritdoc}
     */
    public function apply()
    {
        $pageData = [
            'title' => 'totally upgraded Mars Custom CMS Page',
            'page_layout' => '1column',
            'meta_keywords' => 'Mars Cms Meta Keywords',
            'meta_description' => 'Mars Cms Meta Description',
            'identifier' => 'marscms',
            'content_heading' => 'Mars Custom CMS Page',
            'content' => '<h1> totally upgraded Mars Custom Cms Page Content</h1>',
            'layout_update_xml' => '',
            'url_key' => 'marscms',
            'is_active' => 1,
            'stores' => [0],
            'sort_order' => 0,
        ];

        $this->moduleDataSetup->startSetup();
        $page = $this->pageFactory->create()->load($pageData['identifier']);

        if (!$page->getId()) {
            $page->setData($pageData)->save();
        }
        else {
            $page->setData('content', $pageData['content'])->save();
        }
        $this->moduleDataSetup->endSetup();

    }

    /**
     * {@inheritdoc}
     */
    public static function getDependencies()
    {
        return [];
    }

    /**
     * {@inheritdoc}
     */
    public function getAliases()
    {
        return [];
    }
}
