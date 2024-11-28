import gsap from "gsap";

export class Counter {
  private static instance: Counter;

  counterElement: HTMLElement;
  buttonElement: HTMLButtonElement;
  gobflouz: number;

  constructor() {
    this.gobflouz = 0;
    this.buttonElement = document.querySelector(
      "#counter-button"
    ) as HTMLButtonElement;
    this.counterElement = document.querySelector("#counter") as HTMLElement;

    this.buttonElement.addEventListener("click", this.clickButton.bind(this));

    this.updateCount();
  }

  static getInstance(): Counter {
    if (!Counter.instance) {
      Counter.instance = new Counter();
    }
    return Counter.instance;
  }

  clickButton(e : any) {//TODO: Find type of e
    this.gobflouz += 1;

    //+1 animation
    const appElement = document.querySelector('#app');
    const plus1Element = document.createElement('span');
    plus1Element.classList.add('appearingElement');
    plus1Element.innerText = "+1";
    plus1Element.style.left = e.clientX+'px';
    plus1Element.style.top = e.clientY+'px';
    appElement?.appendChild(plus1Element);

    gsap.to(plus1Element, {y: -32, opacity: 0, duration: 1, onComplete: () => plus1Element.remove()})
    //goes up
    //keeps going up and opacity goes down to 0
    //delete element
  }

  payProf(cout : number) {
    this.gobflouz -= cout;
  }

  addMoney(apport : number) {
    this.gobflouz += apport;
  }

  updateCount() {
    this.counterElement.innerText = `You have ${this.gobflouz} Gobflouz.`;
    window.requestAnimationFrame(() => this.updateCount());
  }
}
