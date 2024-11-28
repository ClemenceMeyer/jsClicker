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

  clickButton() {
    this.gobflouz += 1;
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
