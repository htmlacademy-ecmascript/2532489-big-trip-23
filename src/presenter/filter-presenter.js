import FilterListView from "../view/filter-list-view";
import {FilterType, UpdateType} from "../const";
import {render, remove, replace} from "../framework/render";

export default class FilterPresenter {
  #filterContainer = null;
  #mainContainer = null;
  #pointsModel = null;
  #filtersModel = null;
  #filterComponent = null;
  constructor({headerContainer, pointsModel, filtersModel}) {
    this.#filterContainer = headerContainer;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get filters(){
    return Object.values(FilterType).map(item => item);
  }

  init(){
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterListView({
      filters,
      currentFilterType: this.#filtersModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    })

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
