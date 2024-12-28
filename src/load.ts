import Papa from "papaparse";
import { zGrid } from "./zGrid/zGrid";

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

// from DMG'24 pg 217
let costs: Record<string, number> = {
  "common": 100,
  "uncommon": 400,
  "rare": 4000,
  "very rare": 40000,
  "legendary": 200000,
  // "artifact": 0,
  // "varies": 0
}

function load(file: any, grid: zGrid) {
  Papa.parse(file, {
    header: true,
    complete: (results) => {
      let data: Array<Record<string, any>> = [];
      console.log(results)
      results.data.forEach((e) => {
        let row = e as Record<string, any>
        row["id"] = row["Name"]
        // Value
        if (row["Rarity"] !== "artifact" && row["Rarity"] !== "varies") {
          let rarity = row["Rarity"]
          let cost = costs[rarity]
          row["Value"] = cost
        }
        // include
        console.log(`${row["Rarity"]}, ${row["Rarity"] === "artifact"}`)
        if (row["Rarity"] === "artifact") {
          row["Include?"] = "no"
          row["Reason"] = "artifact"
        } else if (row["Rarity"] === "varies") {
          row["Include?"] = "no"
          row["Reason"] = "varies"
        } else {
          row["Include?"] = "yes"
        }
        // quantity
        row["Quantity"] = 1
        data.push(row)
      })
      grid.reconfigure({
        data: data
      })
    }
  })
}

// loads from a csv file
// updates existing data
// returns data in a format readable by zGrid
// method: determines how the data/csv are merged
// replace: data rows are replaced by csv (with default values)
// add: data rows are untouched, only additional rows are added
// function merge(data, filename, method) {

// }

// takes getRawData from zgrid
// saves to csv
// function save(data) {

// }

export { load }