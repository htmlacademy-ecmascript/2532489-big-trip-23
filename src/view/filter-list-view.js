import {createElement} from "../render";
import {filtersList} from "../mock/filters";

const createFilterItem = filtersList.map(item => {
  return `<div class="trip-filters__filter">
            <input id="filter-${item.title}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item.title}">
            <label class="trip-filters__filter-label" for="filter-${item.title}">${item.label}</label>
          </div>`
})
const createFilterList = () => {
  return `<form class="trip-filters" action="#" method="get">
            ${createFilterItem.join('')}
          </form>`
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
