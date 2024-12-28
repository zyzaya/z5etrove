import './style.css'
import './zgrid_default.css'
import { zGrid } from './zGrid.js'

let container = document.getElementById("zgrid_container")

if (container != null) {
  let grid = new zGrid({
    parent: container,
    data: [],
    columns: [
      "Name", 
      "Source", 
      "Cost", 
      "Attunement", 
      "Rarity",
      "Include?",
      "Reason",
      "Quantity"
    ]
  })
}