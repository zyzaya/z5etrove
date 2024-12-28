import './style.css'
import './zGrid/zgrid_default.css'
import { zGrid } from './zGrid/zGrid.js'
import Papa from "papaparse";
import { load } from './load.js';

import('./zGrid/zGrid')

let results: any = [];

let container = document.getElementById("zgrid_container")
let grid = new zGrid({
  parent: document.createElement('div'),
  data: [],
  columns: [
    "Name",
    "Source",
    "Value",
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
    let target = event.target as HTMLInputElement
    if (event.target == null || target.files == null) return;
    load(target.files[0], grid)
  })
}

