<?php
declare(strict_types=1);

namespace FriendsOfTYPO3\DynamicGrid\Model;

use TYPO3\CMS\Core\DataHandling\Model\EntityPointer;
use TYPO3\CMS\Core\DataHandling\Model\EntityUidPointer;

class GridItem implements \JsonSerializable
{
    /**
     * @var string
     */
    protected $id;

    /**
     * @var int
     */
    protected $fractions = 1;

    /**
     * @var EntityPointer
     */
    protected $entities = [];

    public static function fromArray(array $data): self
    {
        $target = new self();
        $target->id = $data['id'] ?? null;
        $target->fractions = $data['fractions'] ?? 1;
        $target->entities = array_map(
            [self::class, 'createEntityPointer'],
            array_values($data['entities'] ?? [])
        );
        return $target;
    }

    protected static function createEntityPointer(array $data): EntityPointer
    {
        $name = $data['name'] ?? null;
        $identifier = $data['identifier'] ?? null;
        if (is_string($name) && (is_string($identifier) || is_int($identifier))) {
            return new EntityUidPointer($name, (string)$identifier);
        }
        throw new \LogicException('Invalid `name` or `identifier` property value', 1627205308);
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'fractions' => $this->fractions,
            'entities' => array_map([$this, 'serializeEntityPointer'], $this->entities),
        ];
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return int
     */
    public function getFractions(): int
    {
        return $this->fractions;
    }

    /**
     * @return EntityPointer
     */
    public function getEntities()
    {
        return $this->entities;
    }

    protected function serializeEntityPointer(EntityPointer $entity): array
    {
        // @todo Add to core
        return [
            'name' => $entity->getName(),
            'identifier' => $entity->getIdentifier(),
        ];
    }
}
