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

use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Wizard\NewContentElementWizardHookInterface;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\StringUtility;

/**
 * Pass dynamic grid information to newContentElementWizard
 *
 * @internal this is experimental and subject to change in TYPO3 v10 / v11
 */

class NewContentElementController extends \TYPO3\CMS\Backend\Controller\ContentElement\NewContentElementController
{
    /**
     * Creating the module output.
     *
     * @throws \UnexpectedValueException
     */
    protected function prepareWizardContent(ServerRequestInterface $request): void
    {
        $hasAccess = $this->id && $this->pageInfo !== [];
        $this->view->assign('hasAccess', $hasAccess);
        if (!$hasAccess) {
            return;
        }
        // Whether position selection must be performed (no colPos was yet defined)
        $positionSelection = !isset($this->colPos);
        $this->view->assign('positionSelection', $positionSelection);

        // Get processed wizard items from configuration
        $wizardItems = $this->getWizards();

        // Call hooks for manipulating the wizard items
        foreach ($GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms']['db_new_content_el']['wizardItemsHook'] ?? [] as $className) {
            $hookObject = GeneralUtility::makeInstance($className);
            if (!$hookObject instanceof NewContentElementWizardHookInterface) {
                throw new \UnexpectedValueException(
                    $className . ' must implement interface ' . NewContentElementWizardHookInterface::class,
                    1227834741
                );
            }
            $hookObject->manipulateWizardItems($wizardItems, $this);
        }

        $key = 0;
        $menuItems = [];
        /**
         * PATCH BEGIN: Add grid information
         */
        $requestQueryParams = $request->getQueryParams();
        $gridPlacement = $requestQueryParams['gridPlacement'];
        /**
         * PATCH END: Add grid information
         */
        // Traverse items for the wizard.
        // An item is either a header or an item rendered with title/description and icon:
        foreach ($wizardItems as $wizardKey => $wInfo) {
            if (isset($wInfo['header'])) {
                $menuItems[] = [
                    'label' => $wInfo['header'] ?: '-',
                    'content' => '',
                ];
                $key = count($menuItems) - 1;
            } else {
                // Initialize the view variables for the item
                $viewVariables = [
                    'wizardInformation' => $wInfo,
                    'wizardKey' => $wizardKey,
                    'icon' => $this->iconFactory->getIcon(($wInfo['iconIdentifier'] ?? ''), Icon::SIZE_DEFAULT, ($wInfo['iconOverlay'] ?? ''))->render(),
                ];

                // Check wizardItem for defVals
                $itemParams = [];
                parse_str($wInfo['params'] ?? '', $itemParams);
                $defVals = $itemParams['defVals']['tt_content'] ?? [];

                // In case no position has to be selected, we can just add the target
                if (!$positionSelection) {
                    // Go to DataHandler directly instead of FormEngine
                    if (($wInfo['saveAndClose'] ?? false)) {
                        $viewVariables['target'] = (string)$this->uriBuilder->buildUriFromRoute('tce_db', [
                            'data' => [
                                'tt_content' => [
                                    StringUtility::getUniqueId('NEW') => array_replace($defVals, [
                                        'colPos' => $this->colPos,
                                        'pid' => $this->uid_pid,
                                        'sys_language_uid' => $this->sys_language,
                                    ]),
                                ],
                            ],
                            'redirect' => $this->R_URI,
                        ]);
                    } else {
                        /**
                         * PATCH BEGIN: Add grid information
                         */
                        $viewVariables['target'] = (string)$this->uriBuilder->buildUriFromRoute('record_edit', [
                            'edit' => [
                                'tt_content' => [
                                    $this->uid_pid => 'new',
                                ],
                            ],
                            'returnUrl' => $this->R_URI,
                            'defVals' => [
                                'tt_content' => array_merge(
                                    [
                                        'colPos' => $this->colPos,
                                        'sys_language_uid' => $this->sys_language,
                                        'gridPlacement' => $gridPlacement,
                                        'insertAfter' => $this->uid_pid
                                    ],
                                    $defVals
                                ),
                            ],
                        ]);
                        /**
                         * PATCH END: Add grid information
                         */
                    }
                } else {
                    $viewVariables['positionMapArguments'] = GeneralUtility::jsonEncodeForHtmlAttribute([
                        'url' => (string)$this->uriBuilder->buildUriFromRoute('new_content_element_wizard', [
                            'action' => 'positionMap',
                            'id' => $this->id,
                            'sys_language_uid' => $this->sys_language,
                            'returnUrl' => $this->R_URI,
                        ]),
                        'defVals' => $defVals,
                        'saveAndClose' => (bool)($wInfo['saveAndClose'] ?? false),
                    ], true);
                }

                $menuItems[$key]['content'] .= $this->getFluidTemplateObject('MenuItem')->assignMultiple($viewVariables)->render();
            }
        }

        $this->view->assign('renderedTabs', $this->moduleTemplateFactory->create($request)->getDynamicTabMenu(
            $menuItems,
            'new-content-element-wizard'
        ));
    }
}
