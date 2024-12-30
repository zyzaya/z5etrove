export default class Detail {
  private parent: HTMLDivElement;
  private callback: (row: Record<string, string>) => void;

  constructor(parent: HTMLDivElement, callback: (row: Record<string, string>) => void) {
    this.parent = parent;
    this.callback = callback;
  }

  set(row: Record<string, string>) {
    this.parent.replaceChildren()
    let entries_div = document.createElement('div')
    for (const [key, value] of Object.entries(row)) {
      if (key !== "Text") {
        let div = document.createElement('div')
        let label = document.createElement('label')
        label.innerText = key
        div.appendChild(label)
        let input = document.createElement('input')
        input.type = "text"
        input.value = value;
        div.appendChild(input)
        
        entries_div.appendChild(div)  
      }
    }
    let text = document.createElement('textarea')
    text.value = row["Text"]

    let submit = document.createElement('input')
    submit.type = "submit"
    this.parent.appendChild(entries_div)
    this.parent.append(text)
    this.parent.appendChild(submit)
  }
}