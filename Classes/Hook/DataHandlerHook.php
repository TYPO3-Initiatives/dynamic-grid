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

namespace FriendsOfTYPO3\DynamicGrid\Hook;

use Doctrine\DBAL\Driver\Exception;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class DataHandlerHook
{
    //alternative: processDatamap_afterAllOperations
    /**
     * @throws Exception
     */
    public function processDatamap_afterDatabaseOperations($status, $table, $id, $fieldArray, $parentObject)
    {
        if ('new' !== $status) {
            return;
        }

        $existingElementUid = (int)trim($parentObject->defaultValues['tt_content']['insertAfter'], '-');
        $newElementUid = $parentObject->substNEWwithIDs[$id];
        $pageUid = (int)$fieldArray['pid'];
        $colPos = (int)$fieldArray['colPos'];
        $gridPlacement = $parentObject->defaultValues['tt_content']['gridPlacement'] ?? 'newRow';

        // Update pages' dynamic grid information
        // TODO: Respect workspaces and stuff
        $connection = GeneralUtility::makeInstance(ConnectionPool::class)->getConnectionForTable('pages');

        // Get dynamic grid configuration
        $page = $connection->select(
            ['tx_dynamicgrid_grid'], // fields to select
            'pages', // from
            [ 'uid' => $pageUid] // where
        )->fetchAssociative();

        if (!empty($page['tx_dynamicgrid_grid'])) {
            $dynamicGridConfig = json_decode($page['tx_dynamicgrid_grid'], true);
            $newEntity = ['name' => $table, 'identifier' => $newElementUid];;

            // Update dynamic grid configuration
            foreach ($dynamicGridConfig as $colPosKey => $columnConfig) {
                if ((int)$columnConfig['colPos'] === $colPos) {

                    $existingItemTargets = $this->findExistingItemInGrid($columnConfig, $existingElementUid);
                    $targetContainer = $existingItemTargets['targetContainer'];
                    $targetItem = $existingItemTargets['targetItem'];
                    $targetEntity = $existingItemTargets['targetEntity'];

                    switch ($gridPlacement) {
                        case 'newRow':
                            // TODO: Handle this case
                            break;
                        case 'newItemBelow':
                            // Place new entity at the correct position
                            // or simply append if only one entity exists so far
                            if (1 < \count($dynamicGridConfig[$colPosKey]['containers'][$targetContainer]['items'][$targetItem]['entities'])) {
                                $dynamicGridConfig[$colPosKey]['containers'][$targetContainer]['items'][$targetItem]['entities'] = array_merge(
                                    array_slice(
                                        $dynamicGridConfig[$colPosKey]['containers'][$targetContainer]['items'][$targetItem]['entities'],
                                        0,
                                        $targetEntity + 1,
                                        false
                                    ),
                                    [$newEntity],
                                    array_slice(
                                        $dynamicGridConfig[$colPosKey]['containers'][$targetContainer]['items'][$targetItem]['entities'],
                                        $targetEntity + 1,
                                        count($dynamicGridConfig[$colPosKey]['containers'][$targetContainer]['items'][$targetItem]['entities']),
                                        false
                                    )
                                );
                            } else {
                                $dynamicGridConfig[$colPosKey]['containers'][$targetContainer]['items'][$targetItem]['entities'][] = $newEntity;
                            }
                            break;
                        case 'newItemAbove':
                            // Check if the existing element is in the same row
                            if (isset($dynamicGridConfig[$colPosKey]['containers'][$targetContainer]['items'][$targetItem + 1]['entities'])) {
                                // If yes, prepend new entity as new column in the next row
                                array_unshift(
                                    $dynamicGridConfig[$colPosKey]['containers'][$targetContainer]['items'][$targetItem + 1]['entities'],
                                    $newEntity
                                );
                            } else {
                                if (isset($dynamicGridConfig[$colPosKey]['containers'][$targetContainer + 1]['items'])) {
                                    // Otherwise, prepend new entity in the first column of next row
                                    array_unshift(
                                        $dynamicGridConfig[$colPosKey]['containers'][$targetContainer + 1]['items'][0]['entities'],
                                        $newEntity
                                    );
                                }
                            }
                            break;
                        case 'newColumnLeft':
                            // Prepend new entity as new column in the next row
                            array_unshift(
                                $dynamicGridConfig[$colPosKey]['containers'][$targetContainer + 1 ]['items'],
                                [
                                    'size' => 1,
                                    'entities' => [$newEntity]
                                ]
                            );
                            break;
                        case 'newColumnRight':
                            // Place new entity as new column
                            $dynamicGridConfig[$colPosKey]['containers'][$targetContainer]['items'] = array_merge(
                                array_slice(
                                    $dynamicGridConfig[$colPosKey]['containers'][$targetContainer]['items'],
                                    0,
                                    $targetItem + 1,
                                    false
                                ),
                                [
                                    [
                                        'size' => 1,
                                        'entities' => [$newEntity]
                                    ]
                                ],
                                array_slice(
                                    $dynamicGridConfig[$colPosKey]['containers'][$targetContainer]['items'],
                                    $targetItem + 1,
                                    count($dynamicGridConfig[$colPosKey]['containers'][$targetContainer]['items']),
                                    false
                                )
                            );
                            break;
                        default:
                            break;
                    }
                    break;
                }
            }

            // Write dynamic grid configuration to DB
            $connection->update(
                'pages',
                ['tx_dynamicgrid_grid' => json_encode($dynamicGridConfig)], // set
                ['uid' => $pageUid] // where
            );
        }
    }

    /**
     * Find predecessor of the new content element in the grid
     *
     * @param array $columnConfig Dynamic grid config of target colPos
     * @param int $existingElementUid Uid of predecessor of the new content element
     *
     * @return array Array of target keys in the dynamic grid
     */
    protected function findExistingItemInGrid(array $columnConfig, int $existingElementUid): array
    {
        $targetContainer = 0;
        $targetItem = 0;
        $targetEntity = 0;

        // Find row
        foreach ($columnConfig['containers'] as $containerKey => $container) {
            // Find column
            foreach ($container['items'] as $itemKey => $item) {
                // Find item
                foreach ($item['entities'] as $entityKey => $entity) {
                    if ((int)$entity['identifier'] === $existingElementUid) {
                        $targetContainer = $containerKey;
                        $targetItem = $itemKey;
                        $targetEntity = $entityKey;
                        break;
                    }
                }
            }
        }

        return [
            'targetContainer' => $targetContainer,
            'targetItem' => $targetItem,
            'targetEntity' => $targetEntity
        ];
    }
}
