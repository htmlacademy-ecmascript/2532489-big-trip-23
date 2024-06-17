import PointsListView from "../view/points-list-view";
import OffersModel from "../model/offers-model";
import SortListView from "../view/sort-list-view";
import ListEmptyView from "../view/list-empty-view";
import LoadingView from "../view/loading-view";
import {remove, render, RenderPosition} from "../framework/render";
import PointPresenter from "./point-presenter";
import {FilterType, SortType, UpdateType, UserAction} from "../const";
import {filter} from "../utils/filter";
import {sortByDay, sortByName, sortByPrice} from "../utils/sort";
import DestinationsModel from "../model/destinations-model";
import NewPointPresenter from "./new-point-presenter";
export default class PagePresenter {
  #mainContainer = null;
  #pointsModel = null;
  #filtersModel = null;
  #destinationWrapper = new PointsListView();
  #loadingComponent = new LoadingView();
  #offersModel = new OffersModel();
  #destinationsModel = new DestinationsModel();
  #sortComponent = null;
  #emptyListComponent = null;
  #offers = [];
  #destinations = [];
  #pointsCollection = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #newPointPresenter = null;
  #isLoading = true;

  constructor({mainContainer, pointsModel, filtersModel, onNewPointFormClose}) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#destinationWrapper,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointFormClose
    })

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get pointsList(){
    this.#filterType = this.#filtersModel.filter;
    const pointsList = this.#pointsModel.pointsList;
    const pointsFilters = filter[this.#filterType](pointsList);

    switch (this.#currentSortType){
      case SortType.DAY:
        return pointsFilters.sort(sortByDay);
      case SortType.TIME:
        return pointsFilters.sort(sortByDay);
      case SortType.EVENT:
        return pointsFilters.sort(sortByName);
      case SortType.OFFERS:
        return pointsFilters.sort(sortByName);
      case SortType.PRICE:
        return pointsFilters.sort(sortByPrice);
    }

    return pointsFilters;
  }
  async init(){
    this.#offers = await this.#offersModel.getOffers();
    this.#destinations = await this.#destinationsModel.getDestinations();

    this.#renderSortMenu();
    this.#renderPage();
  }

  #renderPage(){
    render(this.#destinationWrapper, this.#mainContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if(this.pointsList.length === 0){
      this.#currentSortType = SortType.DAY;
      this.#renderEmptyList();
    }

    // this.#renderSortMenu();
    this.#renderPointsList();
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#mainContainer);
  }

  #renderEmptyList(){
    this.#emptyListComponent = new ListEmptyView({
      filterType: this.#filterType
    });
    render(this.#emptyListComponent, this.#mainContainer);
  }

  #renderSortMenu = () => {
    this.#sortComponent = new SortListView({
      onSortTypeChange: this.#handleSortList,
      currentSortType: this.#currentSortType
    });
    render(this.#sortComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  }
  #renderPointsList = () => {
    this.pointsList.forEach(point => this.#renderDestinationsItem(point, this.#offers, this.#destinations))
  }
  #renderDestinationsItem(point, offers){
    const destinationPresenter = new PointPresenter({
      destinationWrapper: this.#destinationWrapper.element,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handleViewAction
    })
    destinationPresenter.init(point, offers, this.#destinations);
    this.#pointsCollection.set(point.id, destinationPresenter)
  }

  #handleSortList = (sortType) => {
    if(this.#currentSortType === sortType){
      return
    }

    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderPage();
  }

  createNewPoint = () => {
    this.#newPointPresenter.init(this.#offers, this.#destinations);
    this.#pointsCollection.forEach(point => point.resetView());
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointsCollection.forEach(point => point.resetView());
  }

  #handleViewAction = (actionType, updateType, updateData) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, updateData);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, updateData);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, updateData);
        break;
    }
  }
  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsCollection.get(data.id).init(data, this.#offers, this.#destinations);
        break;
      case UpdateType.MINOR:
        this.#clearPointsList();
        this.#renderPage();
        break;
      case UpdateType.MAJOR:
        this.#clearPointsList();
        this.#renderPage();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPage();
        break;
    }
  }

  #clearPointsList() {
    this.#pointsCollection.forEach((point) => point.destroy());
    this.#pointsCollection.clear();

    // remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }
  }
}
