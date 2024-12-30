import { zGrid } from './zGrid/zGrid.js'
import './zGrid/zgrid_default.css'
import './style.css'
import { load } from './load.js';
import Detail from './Detail.js';

import('./zGrid/zGrid')

let container = document.getElementById("zgrid_container")
let detail_container = document.getElementById("detail_container") as HTMLDivElement
let next_id = 0;

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

//
let detail: Detail;

if (container != null && detail_container != null) {
  detail = new Detail(
    detail_container, 
    (row) => {
      grid.setRow(row["id"], row)
    }
  )
  grid.reconfigure({
    parent: container,
    onClick: (c, r, n, row) => detail.set(row)
  })
}
let new_item = document.getElementById('new_item')
if (new_item != null) {
  new_item.onclick = () => {
    console.log("new item")
    grid.addRow([next_id, "new item"])
    grid.page = grid.totalPages;
    grid.setSelected(next_id)
    detail?.set(grid.getRow(next_id))
    next_id += 1;
  }
}

let file = document.getElementById("load_file")
if (file != null) {
  file.addEventListener('change', (event) => {
    let target = event.target as HTMLInputElement
    if (event.target == null || target.files == null) return;
    load(target.files[0], grid)
    next_id = grid.getRawData().length + 1;
  })
}

