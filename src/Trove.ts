import { zGrid } from "./zGrid/zGrid";

function getRandomInt(max: number) {
  // 0 - max (exclusive)
  return Math.floor(Math.random() * max);
}

let rarities = [
  "common",
  "uncommon",
  "rare",
  "very rare",
  "legendary",
  "artifact",
]

export default class Trove {
  private rarity_input: Array<HTMLInputElement>;
  private gold_input: HTMLInputElement;
  private grid: zGrid;

  constructor(grid: zGrid) {
    this.rarity_input = [];
    this.grid = grid;
    rarities.forEach((r) => {
      let input = document.getElementById(r) as HTMLInputElement;
      this.rarity_input.push(input);
    })
    this.gold_input = document.getElementById('max gold') as HTMLInputElement
    // 
    let roll_trove = document.getElementById('roll_trove')
    if (roll_trove != null) {
      roll_trove.onclick = () => {
        let data = this.filterData();
        let remaining_gold = parseInt(this.gold_input.value)
        let trove = [];
        while(data.length > 0 && remaining_gold > 0) {
          let i = getRandomInt(data.length)
          let item = data[i];
          trove.push(item);
          remaining_gold -= parseInt(item["Value"])
          data = data.filter((r) => parseInt(r["Value"]) <= remaining_gold)
        }
        console.log(trove)
      }
    }
    let roll_item = document.getElementById('roll_item')
    if (roll_item != null) {
      roll_item.onclick = () => {
        let data = this.filterData();
        let i = getRandomInt(data.length)
        console.log(data[i])
      }
    }
  }

  private filterData(): Array<Record<string, string>> {
    let valid_rarity: Array<string> = [];
    this.rarity_input.forEach((r) => {
      if (r.checked) valid_rarity.push(r.name)
    })
    let max_gold = parseInt(this.gold_input.value);
    
    let data = this.grid.getRawData().filter((r) => {
      // has a gold value set
      let has_value = r["Value"] !== "" && r["Value"] !== undefined
      if (!has_value) return false;
      // Include? is true
      if (r["Include?"] !== "yes") return false;
      // value is less than or equal to max gold
      let value = parseInt(r["Value"])
      if (value > max_gold) return false
      // rarity is included in setting
      if (!valid_rarity.includes(r["Rarity"])) return false
      return true;
    })
    return data;
  }
}