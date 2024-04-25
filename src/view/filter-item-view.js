import {createElement} from "../render";

const createFilterItem = () => {
  return '<div class="trip-filters__filter">\n' +
    '                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n' +
    '                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n' +
    '                </div>'
}
export default class FilterItemView {
  getTemplate = () => {
    return createFilterItem();
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
