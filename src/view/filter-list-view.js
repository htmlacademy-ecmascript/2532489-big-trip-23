import {filtersList} from "../mock/filters";
import AbstractView from "../framework/view/abstract-view";

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
export default class FilterListView extends AbstractView{
  get template () {
    return createFilterList();
  }
}
