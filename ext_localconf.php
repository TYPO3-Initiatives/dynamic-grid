<?php

if (!defined('TYPO3_MODE')) {
    die('Access denied.');
}

// XCLASS
$GLOBALS['TYPO3_CONF_VARS']['SYS']['Objects'][\TYPO3\CMS\Backend\View\BackendLayout\Grid\GridColumnItem::class] = ['className' => \FriendsOfTYPO3\DynamicGrid\Xclass\GridColumnItem::class];

