import gsap from "gsap";
import { Counter } from "./counter";

export class Prof {
  linkedDiv: HTMLElement;
  pictureSrc: string;
  name: string;
  cout: number;
  apport: number;

  owned: number = 0;
  counter: Counter;

  buttonElement: HTMLButtonElement;
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
    this.buttonElement = this.linkedDiv.querySelector(
        ".prof-button"
      ) as HTMLButtonElement;
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
    apportElement.innerText = `Apport : ${this.apport}/s`;

    this.buttonElement.addEventListener("click", this.buy.bind(this));

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
      
      //animation button
      const tlButton = gsap.timeline({});
      tlButton.to(this.buttonElement, {scale: 1.3, duration: 1, backgroundColor: '#16ad16', ease: "elastic"})
      tlButton.to(this.buttonElement, {scale: 1, duration: 0.1, backgroundColor: 'rgb(239 239 239)'})

      //animation ajoute gobelin
      const appElement = document.querySelector('#app');
      const gobelinImg = document.createElement('img');
      gobelinImg.classList.add('gobelin');
      gobelinImg.src = '/goblinWalk.gif'
      gobelinImg.style.left = '2vw';
      gobelinImg.style.bottom = '0px';
      appElement?.appendChild(gobelinImg);

      const tlGob = gsap.timeline({repeat: -1});
      tlGob.fromTo(gobelinImg, {scaleX: 1}, {scaleX: 1, x: "88vw", duration: 12, ease: "none"})
      tlGob.fromTo(gobelinImg, {scaleX: -1}, {scaleX: -1, x: "2vw", duration: 12, ease: "none"})

    } else {
      //animation
      const tl = gsap.timeline({});
      tl.to(this.buttonElement, {scale: 1.3, rotation: 4, duration: 0.1, backgroundColor: '#ad1616', color: '#FFFFFF'})
      tl.to(this.buttonElement, {rotation: -6, duration: 0.2})
      tl.to(this.buttonElement, {rotation: 4, duration: 0.1})
      tl.to(this.buttonElement, {rotation: -6, duration: 0.2})
      tl.to(this.buttonElement, {rotation: 4, duration: 0.1})
      tl.to(this.buttonElement, {rotation: -6, duration: 0.2})
      tl.to(this.buttonElement, {scale: 1, rotation: 0, duration: 0.1, backgroundColor: 'rgb(239 239 239)', color: '#000000'})
    }
  }

  initApport() {
    this.profMakeMoney();
    setInterval(() => {
      this.profMakeMoney();
    }, 1000);
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
