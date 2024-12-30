export default class Detail {
  private parent: HTMLDivElement;
  private callback: (row: Record<string, string>) => void;

  constructor(parent: HTMLDivElement, callback: (row: Record<string, string>) => void) {
    this.parent = parent;
    this.callback = callback;
  }

  set(row: Record<string, string>) {
    let inputs: Record<string, HTMLInputElement | HTMLTextAreaElement> = {}
    this.parent.replaceChildren()
    let entries = document.createElement('div')
    entries.classList.add('entries_container')
    for (const [key, value] of Object.entries(row)) {
      if (key !== "id" && key !== "Text") {
        let div = document.createElement('div')
        let label = document.createElement('label')
        label.innerText = key
        div.appendChild(label)
        let input = document.createElement('input')
        input.type = "text"
        input.value = value;
        inputs[key] = input;
        div.appendChild(input)
        
        entries.appendChild(div)  
      }
    }
    let text = document.createElement('textarea')
    text.value = row["Text"]
    inputs["Text"] = text;

    let submit = document.createElement('input')
    submit.type = "submit"
    submit.onclick = () => {
      let modified_row: Record<string, string> = {}
      for (const [key, value] of Object.entries(inputs)) {
        modified_row[key] = value.value;
      }
      modified_row["id"] = row["id"]
      this.callback(modified_row);
    }
    this.parent.appendChild(entries)
    this.parent.append(text)
    this.parent.appendChild(submit)
  }
}