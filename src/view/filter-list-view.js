import {createElement} from "../render";

const createFilterList = () => {
  return '<form class="trip-filters" action="#" method="get"></form>'
}
export default class FilterListView {
  getTemplate = () => {
    return createFilterList();
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
