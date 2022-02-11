<?php

defined('TYPO3_MODE') or die();

$newFields = [
    'tx_dynamicgrid_grid' => [
	'label' => 'Dynamic Grid',
	'config' => [
	    'type' => 'text',
	    'cols' => 30,
	    'rows' => 5,
	    'behaviour' => [
		'allowLanguageSynchronization' => true,
	    ],
	]
    ]
];
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('pages', $newFields);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
    'pages',
    'tx_dynamicgrid_grid',
    '',
    'after:TSconfig'
);
