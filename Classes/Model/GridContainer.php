<?php
declare(strict_types=1);

namespace FriendsOfTYPO3\DynamicGrid\Model;

class GridContainer implements \JsonSerializable
{
    /**
     * @var GridRow[]
     */
    protected $rows = [];

    public static function fromArray(array $data): self
    {
        // @todo device (desktop, tablet, ...) assignments are still missing
        $target = new self();
        $target->rows = array_map(
            [GridRow::class, 'fromArray'],
            array_values($data['rows'] ?? [])
        );
        return $target;
    }

    public function jsonSerialize()
    {
        return [
            'rows' => $this->rows,
        ];
    }

    /**
     * @return GridRow[]
     */
    public function getRows(): array
    {
        return $this->rows;
    }
}
