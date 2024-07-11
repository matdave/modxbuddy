<?php

/*
 * This file is part of the MODXBuddy package.
 *
 * Copyright (c) MODX, LLC
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * MODXBuddy Connector
 *
 * @package modxbuddy
 */

require_once dirname(__FILE__, 4) . '/config.core.php';
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
require_once MODX_CONNECTORS_PATH . 'index.php';

$corePath = $modx->getOption('modxbuddy.core_path', null, $modx->getOption('core_path', null, MODX_CORE_PATH) . 'components/modxbuddy/');
/** @var MODXBuddy $modxbuddy */
$modxbuddy = $modx->getService(
    'modxbuddy',
    'MODXBuddy',
    $corePath . 'model/modxbuddy/',
    [
        'core_path' => $corePath
    ]
);

$action = $_REQUEST['action'] ?? null;
// replace namespace action with processor e.g. MODXBuddy\Processors\ElementCategories\GetList => mgr/element_categories/getlist
if ($action) {
    $action = str_replace('\\', '/', strtolower(str_replace('MODXBuddy\\Processors\\', '', $action)));
    $action = preg_replace('/([a-z])([A-Z])/', '$1_$2', $action);
    $action = preg_replace('/([A-Z])([A-Z])([a-z])/', '$1_$2$3', $action);
    $actionArray = explode('/', $action);
    $last = array_pop($actionArray);
    $actionArray[] = str_replace('_', '', $last);
    $action = implode('/', $actionArray);
    $action = $action;
}

$modx->request->handleRequest(
    [
        'processors_path' => $modxbuddy->getOption('processorsPath', [], $corePath . 'processors/'),
        'location' => '',
        'action' => $action
    ]
);
