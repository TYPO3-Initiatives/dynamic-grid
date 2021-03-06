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

use TYPO3\CMS\Backend\Routing\Exception\RouteNotFoundException;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Grid Column Item
 *
 * Model/proxy around a single record which appears in a grid column
 * in the page layout. Returns titles, urls etc. and performs basic
 * assertions on the contained content element record such as
 * is-versioned, is-editable, is-deletable and so on.
 *
 * Accessed from Fluid templates.
 *
 * @internal this is experimental and subject to change in TYPO3 v10 / v11
 */

/**
 * Generate URL for a new content element for following cases:
 *
 * - Add CE after existing CE in the same column
 * - Add CE in a new column to the left/right of an existing CE
 * - Add CE in a new row
 */
class GridColumnItem extends \TYPO3\CMS\Backend\View\BackendLayout\Grid\GridColumnItem
{
    /**
     * Generate URL for new item in current grid column
     *
     * @param string $gridPlacement Can be one of the following: newRow, newItemBelow, newItemAbove, newColumnLeft, newColumnRight
     * @throws RouteNotFoundException
     */
    protected function generateNewContentUrlWithGridPlacement(string $gridPlacement): string
    {
        $uriBuilder = GeneralUtility::makeInstance(UriBuilder::class);
        $pageId = $this->context->getPageId();

        if ($this->context->getDrawingConfiguration()->getShowNewContentWizard()) {
            $urlParameters = [
                'id' => $pageId,
                'sys_language_uid' => $this->context->getSiteLanguage()->getLanguageId(),
                'colPos' => $this->column->getColumnNumber(),
                'uid_pid' => -$this->record['uid'],
                'gridPlacement' => $gridPlacement,
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

    /**
     * Generate URL to place the new content in a new row
     *
     * @throws RouteNotFoundException
     */
    public function getNewContentUrlAsNewRow(): string
    {
        return $this->generateNewContentUrlWithGridPlacement('newRow');
    }

    /**
     * Generate URL to place the new content as first item of a column
     *
     * @throws RouteNotFoundException
     */
    public function getNewContentUrlAsNewItemAbove(): string
    {
        return $this->generateNewContentUrlWithGridPlacement('newItemAbove');
    }

    /**
     * Generate URL to place the new content inside en existing column
     *
     * @throws RouteNotFoundException
     */
    public function getNewContentUrlAsNewItemBelow(): string
    {
        return $this->generateNewContentUrlWithGridPlacement('newItemBelow');
    }

    /**
     * Generate URL to place the new content in a new column as the first column of a row
     *
     * @throws RouteNotFoundException
     */
    public function getNewContentUrlAsNewColumnLeft(): string
    {
        return $this->generateNewContentUrlWithGridPlacement('newColumnLeft');
    }

    /**
     * Generate URL to place the new content in a new column next to an existing column
     *
     * @throws RouteNotFoundException
     */
    public function getNewContentUrlAsNewColumnRight(): string
    {
        return $this->generateNewContentUrlWithGridPlacement('newColumnRight');
    }
}
