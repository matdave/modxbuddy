<?php

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use MODXBuddy\MODXBuddy as MODXBuddyBase;

class MODXBuddy extends MODXBuddyBase
{
    public function __construct(&$modx, array $options = [])
    {
        $corePath = $modx->getOption('modxbuddy.core_path', $options, $modx->getOption('core_path', null, MODX_CORE_PATH) . 'components/modxbuddy/');
        $assetsUrl = $modx->getOption('modxbuddy.assets_url', $options, $modx->getOption('assets_url', null, MODX_ASSETS_URL) . 'components/modxbuddy/');

        /* loads some default paths for easier management */
        $options = array_merge([
            'modelPath' => $corePath . 'model/',
            'connectorUrl' => $assetsUrl . 'connector.php',
        ], $options);
        parent::__construct($modx, $options);
    }
    public function addPackage()
    {
        $this->modx->addPackage('modxbuddy', $this->getOption('modelPath'));
    }
}