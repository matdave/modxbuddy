<?php

/**
 * MODXBuddy
 *
 * @package modxbuddy
 * @subpackage modxbuddy
 *
 * @var $modx
 * @var $scriptProperties array
 */

if (empty($modx->version)) {
    $modx->getVersionData();
}

$version = (int) $modx->version['version'];

if ($version > 2) {
    $mb = new \MODXBuddy\MODXBuddy($modx, $scriptProperties);

    $class = "\\MODXBuddy\\Events\\{$modx->event->name}";
} else {
    $corePath = $modx->getOption('modxbuddy.core_path', null, $modx->getOption('core_path') . 'components/modxbuddy/');
    $mb = $modx->getService('modxbuddy', 'MODXBuddy', $corePath . 'model/modxbuddy/', $scriptProperties);

    $class = "\\MODXBuddy\\v2\\Events\\{$modx->event->name}";
}
if (class_exists($class)) {
    $event = new $class($mb, $scriptProperties);
    $event->run();
} else {
    $modx->log(\xPDO::LOG_LEVEL_ERROR, 'MODXBuddy: Event class not found: ' . $class);
}