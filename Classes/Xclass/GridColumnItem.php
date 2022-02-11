<?php

declare(strict_types=1);

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

namespace FriendsOfTYPO3\DynamicGrid\Xclass;

use TYPO3\CMS\Backend\Preview\StandardPreviewRendererResolver;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Backend\View\PageLayoutContext;
use TYPO3\CMS\Backend\View\PageLayoutView;
use TYPO3\CMS\Backend\View\PageLayoutViewDrawItemHookInterface;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Site\Entity\SiteLanguage;
use TYPO3\CMS\Core\Type\Bitmask\Permission;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Grid Column Item
 *
 * Model/proxy around a single record which appears in a grid column
 * in the page layout. Returns titles, urls etc. and performs basic
 * assertions on the contained content element record such as
 * is-versioned, is-editable, is-delible and so on.
 *
 * Accessed from Fluid templates.
 *
 * @internal this is experimental and subject to change in TYPO3 v10 / v11
 */
class GridColumnItem extends \TYPO3\CMS\Backend\View\BackendLayout\Grid\GridColumnItem
{


    public function getNewContentAfterUrlLeft(): string
    {
        $uriBuilder = GeneralUtility::makeInstance(UriBuilder::class);
        $pageId = $this->context->getPageId();

        if ($this->context->getDrawingConfiguration()->getShowNewContentWizard()) {
            $urlParameters = [
                'id' => $pageId,
                'sys_language_uid' => $this->context->getSiteLanguage()->getLanguageId(),
                'colPos' => $this->column->getColumnNumber(),
                'uid_pid' => -$this->record['uid'],
		'left' => 1,
                'returnUrl' => $GLOBALS['TYPO3_REQUEST']->getAttribute('normalizedParams')->getRequestUri(),
            ];
            $routeName = BackendUtility::getPagesTSconfig($pageId)['mod.']['newContentElementWizard.']['override']
                ?? 'new_content_element_wizard';
        } else {
            $urlParameters = [
                'edit' => [
                    'tt_content' => [
                        -$this->record['uid'] => 'new',
                    ],
                ],
                'returnUrl' => $GLOBALS['TYPO3_REQUEST']->getAttribute('normalizedParams')->getRequestUri(),
            ];
            $routeName = 'record_edit';
        }

        return (string)$uriBuilder->buildUriFromRoute($routeName, $urlParameters);
    }
    
    public function getNewContentAfterUrlRight(): string
    {
        $uriBuilder = GeneralUtility::makeInstance(UriBuilder::class);
        $pageId = $this->context->getPageId();

        if ($this->context->getDrawingConfiguration()->getShowNewContentWizard()) {
            $urlParameters = [
                'id' => $pageId,
                'sys_language_uid' => $this->context->getSiteLanguage()->getLanguageId(),
                'colPos' => $this->column->getColumnNumber(),
                'uid_pid' => -$this->record['uid'],
                'returnUrl' => $GLOBALS['TYPO3_REQUEST']->getAttribute('normalizedParams')->getRequestUri(),
            ];
            $routeName = BackendUtility::getPagesTSconfig($pageId)['mod.']['newContentElementWizard.']['override']
                ?? 'new_content_element_wizard';
        } else {
            $urlParameters = [
                'edit' => [
                    'tt_content' => [
                        -$this->record['uid'] => 'new',
                    ],
                ],
                'returnUrl' => $GLOBALS['TYPO3_REQUEST']->getAttribute('normalizedParams')->getRequestUri(),
            ];
            $routeName = 'record_edit';
        }

        return (string)$uriBuilder->buildUriFromRoute($routeName, $urlParameters);
    }
}
