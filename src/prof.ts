import { Counter } from "./counter";

export class Prof {
  linkedDiv: HTMLElement;
  pictureSrc: string;
  name: string;
  cout: number;
  apport: number;

  owned: number = 0;
  counter: Counter;

  actifsElement: HTMLElement;

  constructor(linkedDiv: HTMLElement, linkedData: Profile) {
    this.counter = Counter.getInstance();

    this.linkedDiv = linkedDiv;

    this.pictureSrc = linkedData["photo"];
    this.name = linkedData["name"];
    this.cout = linkedData["cout"];
    this.apport = linkedData["apport"];

    this.actifsElement = this.linkedDiv.querySelector(
      ".prof-actifs"
    ) as HTMLElement;
    this.initProfInHTML();
  }

  initProfInHTML() {
    const imgElement = this.linkedDiv.querySelector(
      ".prof-photo"
    ) as HTMLImageElement;
    imgElement.src = this.pictureSrc;

    const nameElement = this.linkedDiv.querySelector(
      ".prof-nom"
    ) as HTMLElement;
    nameElement.innerText = this.name;

    const coutElement = this.linkedDiv.querySelector(
      ".prof-cout"
    ) as HTMLElement;
    coutElement.innerText = `Coût : ${this.cout} gobflouz`;

    const apportElement = this.linkedDiv.querySelector(
      ".prof-apport"
    ) as HTMLElement;
    apportElement.innerText = `Apport : ${this.apport}/5s`;

    const buttonElement = this.linkedDiv.querySelector(
      ".prof-button"
    ) as HTMLElement;
    buttonElement.addEventListener("click", this.buy.bind(this));

    this.actifsElement.innerText = `Profs actifs : ${this.owned}`;

    document.querySelector("#profs")?.appendChild(this.linkedDiv);
  }

  buy() {
    if (this.counter.gobflouz >= this.cout) {
      this.addOneProf();
      this.counter.payProf(this.cout);
      if (this.owned == 1) {
        this.initApport();
      }
    }
  }

  initApport() {
    this.profMakeMoney();
    setInterval(() => {
      this.profMakeMoney();
    }, 5000);
  }

  profMakeMoney() {
    this.counter.addMoney(this.apport * this.owned)
  }

  addOneProf() {
    this.owned += 1;
    this.actifsElement.innerText = `Profs actifs : ${this.owned}`;
  }
}

interface Profile {
  photo: string; // The URL of the photo (a string)
  name: string; // The name of the person (a string)
  cout: number; // The count (a number)
  apport: number; // The apport value (a number)
}
