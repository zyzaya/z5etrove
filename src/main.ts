import './style.css'
import './zgrid_default.css'
import { zGrid } from './zGrid.js'
import Papa from "papaparse";

let results: any = [];

let container = document.getElementById("zgrid_container")
let grid = new zGrid({
  parent: document.createElement('div'),
  data: [],
  columns: [
    "Name",
    "Source",
    "Cost",
    "Attunement",
    "Rarity",
    "Include?",
    "Reason",
    "Quantity",
    "Text"
  ],
  pagination: 20,
})

if (container != null) {
  grid.reconfigure({
    parent: container
  })
}

let file = document.getElementById("load_file")
if (file != null) {
  file.addEventListener('change', (event) => {
    if (event.target == null) return;
    Papa.parse(event.target.files[0], {
      header: true,
      complete: (results) => {
        console.log(results)
        let data = []
        results.data.forEach((e, i) => {
          let row = e;
          row["id"] = i;
          data.push(row)
        })
        grid.reconfigure({ data: data })
      }
    })
  })
}

