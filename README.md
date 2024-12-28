- *a way of quickly generating magic item rolls / troves for 5e D&D*
- *mimics the functionality of the Treasure tab of RavWorks, but with 5e magic items*

Features
Grid (use zGrid)
- a grid/table with the following columns: Name, Source, Cost, Attunement, Rarity, Include in rolls, reason (for not including), quantity
- allow the manipulation of the values of each record
Save/Load/Merge
- load data from CSV
- save modified data to CSV
- load and merge data - either ignoring existing records, replacing existing records, or only setting non-empty values of existing records
Trove Rolls
- limit by rarity
- limit by gold, unset costs default to rarity value (as in DMG)
- single rolls
- trove rolls: up to gold amount, each roll an amount from 1% to 100% of max gold

# versioning
*loosely uses semvar (https://semver.org/)*

- *MAJOR.MINOR.PATCH*
- *PATCH* must be incremented if only backwards compatible bugfixes are introduced. A bugfix is defined as an internal change that fixes incorrect behaviour.
- *MINOR* must be incremented if new, backwards compatible functionality is introduced. 
  - It must be incremented if any public functionality is marked as deprecated. 
  - It may be incremented if substantial new functionality or improvements are introduced to private code. 
  - It may also include PATCH level changes. 
  - PATCH version must be reset to 0 when MINOR version is incremented.
- *MAJOR* must be incremented if any backwards incompatible changes are introduced 
  - It may also include MINOR and PATCH level changes.
  - MINOR and PATCH versions must be reset to 0 when MAJOR version is incremented.  

# git branches
- *main* - only contains snapshots of release versions
- *develop* - represents a state with the latest delivered development changes
- *feature* - used when developing a new feature or enhancement. Named as feature#-name. # is only added if applicable
- *issue* - used when fixing an existing issue. Named as issue#-summary

- *tag* - git tag vX.X.X
- *update package.json* - version

# test
```how to run tests```

# build
```how to build or deploy```