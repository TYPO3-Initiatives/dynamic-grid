# :warning: EXPERIMENTAL :warning:

## Dynamic Grids

## Assumptions & Principles

* separate structure from representation
  + keep entities (here `tt_content`, but entities in general) standalone (flat)
  + next to it, create & maintain representational information, pointing to entities
* representational information can be stored in JSON (or any other format)
  + it does not really matter, how and where it's serialized and stored
  + important is having an iterator, allowing to use (hierarchical) data
  + for table `tt_content` the page module, just store the information with table `pages`
  + if required(!), information can be stored in a dedicated table - upgrade wizards support migrating data
* context and command handling
  + hierarchical data representing dynamic grids is a special domain behavior
  + `DataHandler` does not know that automatically - albeit workspaces & localization get simpler
  + **anyway** a dedicated handler (hook, event, controller) needs to handle it, for e.g.
    + creating container
    + moving items inside container
    + adding new device (to all?) existing definitions
    + (... basically all dynamic grid actions ...)

## Data Example

```json
[
  {
    "device": "default",
    "items": [
      {
        "id": "i1234",
        "fractions": 2,
        "entities": [
          {"name":  "tt_content", "identifier": "123"},
          {"name":  "tt_content", "identifier": "234"}
        ]
      },
      {
        "id": "i5678",
        "fractions": 1,
        "entities": [
          {"name":  "tt_content", "identifier": "345"}
        ]
      }
    ]
  }
]
```
