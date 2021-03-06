# :warning: EXPERIMENTAL :warning:

* current state does NOT provide any useful functionality
* this extension currently just kick starts the basic structures and models
* more functionality to be added step by step

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

## Setting up the Dynamic Grid testing example

1. Create 5 content elements (best with uids 1-5) on the target page
2. Add the following PageTSconfig to your root page:
```
mod.web_layout.BackendLayouts {
  dynamic {
    title = Dynamic Grid
    config {
      backend_layout {
        colCount = 1
        rowCount = 1
        rows {
          1 {
            columns {
              1 {
                name = dynamic grid
                colPos = 0
                dynamicGrid = 1
              }
            }
          }
        }
      }
    }
  }
}
```
3. Add the following dynamic grid json in the page properties (tab Resources) of the target page
```json
[
    {
        "colPos":"0",
        "containers": [
            {
                "items": [
                    {
                        "size": 1,
                        "entities": [
                            {"name":  "tt_content", "identifier": "1"}
                        ]
                    }
                ]
            },
            {
                "items": [
                    {
                        "size": 1,
                        "entities": [
                            {"name":  "tt_content", "identifier": "2"},
                            {"name":  "tt_content", "identifier": "3"}
                        ]
                    },
                    {
                        "size": 1,
                        "entities": [
                            {"name":  "tt_content", "identifier": "4"}
                        ]
                    }
                ]
            },
            {
                "items": [
                    {
                        "size": 1,
                        "entities": [
                            {"name":  "tt_content", "identifier": "5"}
                        ]
                    }
                ]
            }
        ]
    }
]
```
4. Select the Dynamic Grid backend layout for the target page

## Local development environment

There are several possibilities:

### You can check out this extension into your existing TYPO3 v11 and handle it as you would with a local package.

The recommended way is to use a [composer `path` repository](https://getcomposer.org/doc/05-repositories.md#path).

### You can use this extension as your root `composer` package and use the included DDEV configuration:

```
ddev start
ddev launch /typo3
```

This installs a TYPO3 v11 into `./typo3`. The backend admin user is `admin`, password `adminadmin`.



## License

GNU General Public License version 2 or later

The GNU General Public License can be found at http://www.gnu.org/copyleft/gpl.html.

Icons used are provided by https://material.io/resources
