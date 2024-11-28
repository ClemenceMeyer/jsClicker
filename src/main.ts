import profsData from "./profsData.json";
import { Prof } from "./prof"

export class App {

  constructor() {
    this.createProfs()
  }

  createProfs() {
    const ogProf = document.querySelector('.prof')
    const profModel = ogProf?.cloneNode(true)
    ogProf?.remove()

    profsData.forEach(profData => {
      new Prof(profModel?.cloneNode(true) as HTMLDivElement, profData)
    });
  }

}

window.addEventListener("load", () => new App);