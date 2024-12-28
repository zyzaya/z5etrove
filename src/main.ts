import './style.css'
import './zGrid/zgrid_default.css'
import { zGrid } from './zGrid/zGrid.js'
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
    {
      id: "include",
      name: "Include?",
      visible: false
    },
    {
      id: "reason",
      name: "Reason",
      visible: false,
    },
    {
      id: "quantity",
      name: "Quantity",
      visible: false
    },
    {
      id: "Text",
      name: "Text",
      visible: false
    }
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

