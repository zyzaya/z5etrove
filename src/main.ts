import { zGrid } from './zGrid/zGrid.js'
import './zGrid/zgrid_default.css'
import './style.css'
import { load } from './load.js';
import Detail from './Detail.js';

import('./zGrid/zGrid')

let container = document.getElementById("zgrid_container")
let detail_container = document.getElementById("detail_container") as HTMLDivElement

let grid = new zGrid({
  parent: document.createElement('div'),
  className: {
    th: "header",
    td: "cell"
  },
  data: [],
  columns: [
    "Name",
    "Source",
    "Value",
    {
      id: "Attunement",
      name: "A."
    },
    "Rarity",
    {
      id: "include",
      name: "in?",
      visible: false
    },
    {
      id: "reason",
      name: "why",
      visible: false,
    },
    {
      id: "quantity",
      name: "#",
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



if (container != null && detail_container != null) {
  let detail = new Detail(detail_container, (row) => {})
  grid.reconfigure({
    parent: container,
    onClick: (c, r, n, row) => detail.set(row)
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

