// loads from a csv file
// returns data in a format readable by zGrid
// name: also zgrid id
// source
// cost: defaults to DMG'24 values based on rarity
// attunement:
// rarity:
// include: unless rarity is artifact
// reason:
// quantity: a max count for trove rolls (default 1)
// text: 
function load(filename) {

}

// loads from a csv file
// updates existing data
// returns data in a format readable by zGrid
// method: determines how the data/csv are merged
// replace: data rows are replaced by csv (with default values)
// add: data rows are untouched, only additional rows are added
function merge(data, filename, method) {

}

// takes getRawData from zgrid
// saves to csv
function save(data) {

}

export { load, merge, save }