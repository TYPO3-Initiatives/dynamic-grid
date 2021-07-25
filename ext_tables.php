<?php
defined('TYPO3') or die();

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTypoScriptSetup('
module.tx_backend.view.templateRootPaths.100 = EXT:dynamic_grid/Resources/Private/Templates/
module.tx_backend.view.partialRootPaths.100 = EXT:dynamic_grid/Resources/Private/Partials/
');
