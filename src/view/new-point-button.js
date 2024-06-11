import AbstractView from "../framework/view/abstract-view";

const createButton = () => {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
}
export default class NewPointButton extends AbstractView{
  #clickHandler = null;
  constructor({onClick}) {
    super();
    this.#clickHandler = onClick;
    this.element.addEventListener('click', this.#handleClick)
  }

  get template(){
    return createButton();
  }

  #handleClick = (e) => {
    e.preventDefault();
    this.#clickHandler();
  }
}
