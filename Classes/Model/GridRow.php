<?php
declare(strict_types=1);

namespace FriendsOfTYPO3\DynamicGrid\Model;

class GridRow implements \JsonSerializable
{
    /**
     * @var GridItem[]
     */
    protected $items = [];

    public static function fromArray(array $data): self
    {
        $target = new self();
        $target->items = array_map(
            [GridItem::class, 'fromArray'],
            array_values($data['items'] ?? [])
        );
        return $target;
    }

    public function jsonSerialize()
    {
        return [
            'items' => $this->items,
        ];
    }

    /**
     * @return GridItem[]
     */
    public function getItems(): array
    {
        return $this->items;
    }

    public function countFractions(): int
    {
        $fractions = array_map(
            function (GridItem $item) {
                return $item->getFractions();
            },
            $this->items
        );
        return array_sum(...$fractions);
    }
}
