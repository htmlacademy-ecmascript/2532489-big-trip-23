import {createElement} from "../render";

const createHeader = () => {
  return '<header class="page-header"></header>'
}
export default class HeaderView {
  getTemplate = () => {
    return createHeader();
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
