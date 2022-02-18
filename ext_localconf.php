<?php

if (!defined('TYPO3_MODE')) {
    die('Access denied.');
}

// XCLASS
$GLOBALS['TYPO3_CONF_VARS']['SYS']['Objects'][\TYPO3\CMS\Backend\View\BackendLayout\Grid\GridColumnItem::class] = ['className' => \FriendsOfTYPO3\DynamicGrid\Xclass\GridColumnItem::class];
$GLOBALS['TYPO3_CONF_VARS']['SYS']['Objects'][\TYPO3\CMS\Backend\Controller\ContentElement\NewContentElementController::class] = ['className' => \FriendsOfTYPO3\DynamicGrid\Xclass\NewContentElementController::class];

// Hooks
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tcemain.php']['processDatamapClass'][] = \FriendsOfTYPO3\DynamicGrid\Hook\DataHandlerHook::class;
