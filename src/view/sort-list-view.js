import {createElement} from "../render";
import {sortList} from "../mock/filters";

const createSortList = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortList.map(item => `<div class="trip-sort__item  trip-sort__item--${item.title}">
              <input id="sort-${item.title}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${item.title}">
              <label class="trip-sort__btn" for="sort-${item.title}">${item.label}</label>
            </div>`).join('')}
          </form>`
}
export default class SortListView {
  getTemplate = () => {
    return createSortList();
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
