import Papa from "papaparse";
import { zGrid } from "./zGrid/zGrid";

// from DMG'24 pg 217
let costs: Record<string, number> = {
  "common": 100,
  "uncommon": 400,
  "rare": 4000,
  "very rare": 40000,
  "legendary": 200000,
  // "artifact": priceless,
  // "varies": priceless
}

function load(file: any, grid: zGrid) {
  Papa.parse(file, {
    header: true,
    complete: (results) => {
      let data: Array<Record<string, any>> = [];
      results.data.forEach((e, i) => {
        let row = e as Record<string, any>
        row["id"] = i.toString();
        // Value
        if (row["Value"] === "" || row["Include?"] === undefined) {
          if (row["Rarity"] !== "artifact" && row["Rarity"] !== "varies") {
            let rarity = row["Rarity"]
            let cost = costs[rarity]
            row["Value"] = cost
          }
        }
        // include
        if (row["Include?"] === "" || row["Include?"] === undefined) {
          if (row["Rarity"] === "artifact") {
            row["Include?"] = "no"
            row["Reason"] = "artifact"
          } else if (row["Rarity"] === "varies") {
            row["Include?"] = "no"
            row["Reason"] = "varies"
          } else {
            row["Include?"] = "yes"
          }
        }
        // quantity
        if (row["Quantity"] === "" || row["Quantity"] === undefined) {
          row["Quantity"] = 1
        }
        // attunement
        if (row["Attunement"] !== "" && row["Attunement"] !== undefined) {
          if (row["Attunement"] === "requires attunement") {
            row["Attunement"] = "yes"
          } else {
            row["Attunement"] = row["Attunement"].replace("requires attunement ", "")
          }
        }
        data.push(row)
      })
      grid.reconfigure({
        data: data
      })
    }
  })
}

function save(grid: zGrid) {
  let data = grid.getRawData();
  let csv = Papa.unparse(data)
  let blob = new Blob([csv], { type: 'text/plain'})
  let fileURL = URL.createObjectURL(blob)
  let download_link = document.createElement('a')
  download_link.href = fileURL;
  download_link.download = 'item.csv'
  download_link.click()
  URL.revokeObjectURL(fileURL);
}

export { load, save }