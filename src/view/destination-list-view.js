import {createElement} from "../render";

const createDestinationList = () => {
  return `<ul class="trip-events__list"></ul>`
}

export default class DestinationListView {
  getTemplate = () => {
    return createDestinationList();
  }

  getElement = () => {
    if(!this.element){
      this.element = createElement(this.getTemplate())
    }
    return this.element
  }

  removeElement = () => {
    this.element = null;
  }
}
