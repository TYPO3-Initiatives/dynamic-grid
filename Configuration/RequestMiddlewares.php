<?php
declare(strict_types=1);

use FriendsOfTYPO3\DynamicGrid\Http\AssetWrapper;

return [
    'backend' => [
        'friends-of-typo3/dynamic-grid/asset-wrapper' => [
            'target' =>  AssetWrapper::class,
            'after' => [
                'typo3/cms-backend/site-resolver',
            ],
            'before' => [
                'typo3/cms-core/response-propagation',
            ],
        ]
    ]
];
