import {filtersList} from "../mock/filters";
import AbstractView from "../framework/view/abstract-view";

const createFilterItem = (item, currentFilter) => {
  return `<div class="trip-filters__filter">
            <input id="filter-${item}"
                    class="trip-filters__filter-input  visually-hidden"
                    type="radio"
                    name="trip-filter"
                    value="${item}" ${item === currentFilter && `checked`}>
            <label class="trip-filters__filter-label" for="filter-${item}" data-filter-type="${item}">${item}</label>
          </div>`
}
const createFilterList = (filtersList, currentFilter) => {
  return `<form class="trip-filters" action="#" method="get">
            ${filtersList && filtersList.map(item => createFilterItem(item, currentFilter)).join('')}
          </form>`
}
export default class FilterListView extends AbstractView{
  #filtersList = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;
  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filtersList = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.element.addEventListener('click', this.#filterTypeChangeHandler)
  }
  get template () {
    return createFilterList(this.#filtersList, this.#currentFilter);
  }

  #filterTypeChangeHandler = (e) => {
    if (e.target.tagName !== 'LABEL') {
      return;
    }

    this.#handleFilterTypeChange(e.target.dataset.filterType);
  }
}
