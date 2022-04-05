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
        )
            ->fetchAssociative();

        if (!empty($page['tx_dynamicgrid_grid'])) {
            $dynamicGridConfig = json_decode($page['tx_dynamicgrid_grid'], true);
            // Update dynamic grid configuration
            foreach ($dynamicGridConfig as $colPosKey => $columnConfig) {
                if ((int)$columnConfig['colPos'] === $colPos) {
                    switch ($gridPlacement) {
                        case 'newRow':
                            break;
                        case 'newItemBelow':
                            // Find row
                            foreach ($columnConfig['containers'] as $containerKey => $container) {
                                // Find column
                                foreach ($container['items'] as $itemKey => $item) {
                                    foreach ($item['entities'] as $entityKey => $entity) {
                                        if ((int)$entity['identifier'] === $existingElementUid) {
                                            // Place new entity at the correct position
                                            // or simply append if only one entity exists so far
                                            if (1 < \count($item['entities'])) {
                                                $dynamicGridConfig[$colPosKey]['containers'][$containerKey]['items'][$itemKey]['entities'] = array_merge(
                                                    array_slice($item['entities'], 0, $entityKey + 1, false),
                                                    [['name' => $table, 'identifier' => $newElementUid]],
                                                    array_slice($item['entities'], $entityKey + 1, count($item['entities']), false)
                                                );
                                            } else {
                                                $dynamicGridConfig[$colPosKey]['containers'][$containerKey]['items'][$itemKey]['entities'][] =
                                                    ['name' => $table, 'identifier' => $newElementUid];
                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                            break;
                        case 'newItemAbove':
                            break;
                        case 'newColumnLeft':
                            break;
                        case 'newColumnRight':
                            // Find row
                            foreach ($columnConfig['containers'] as $containerKey => $container) {
                                // Find column
                                foreach ($container['items'] as $itemKey => $item) {
                                    foreach ($item['entities'] as $entityKey => $entity) {
                                        if ((int)$entity['identifier'] === $existingElementUid) {
                                            // Place new entity as new column
                                            $dynamicGridConfig[$colPosKey]['containers'][$containerKey]['items'] = array_merge(
                                                array_slice($container['items'], 0, $itemKey + 1, false),
                                                [
                                                    [
                                                        'size' => 1,
                                                        'entities' => [
                                                            ['name' => $table, 'identifier' => $newElementUid]
                                                        ]
                                                    ]
                                                ],
                                                array_slice($container['items'], $itemKey + 1, count($container['items']), false)
                                            );
                                            break;
                                        }
                                    }
                                }
                            }
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
}
