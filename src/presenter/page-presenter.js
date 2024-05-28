import FilterListView from "../view/filter-list-view";
import PointsListView from "../view/points-list-view";
import OffersModel from "../model/offers-model";
import SortListView from "../view/sort-list-view";
import ListEmptyView from "../view/list-empty-view";
import { render } from "../framework/render";
import DestinationPresenter from "./destination-presenter";
import {updateItem} from "../utils/common";
import {SortType} from "../const";
import {sortByDay, sortByName, sortByPrice} from "../utils/sort";
import DestinationsModel from "../model/destinations-model";
export default class PagePresenter {
  #headerContainer = null;
  #mainContainer = null;
  #pointsModel = null;
  #filtersWrapper = new FilterListView();
  #destinationWrapper = new PointsListView();
  #offersModel = new OffersModel();
  #destinationsModel = new DestinationsModel();
  #offers = [];
  #pointsList = [];
  #destinations = [];
  #pointsCollection = new Map();
  #currentSortType = SortType.DAY;

  constructor({headerContainer, mainContainer, pointsModel}) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
  }
  init(){
    this.#pointsList = [...this.#pointsModel.pointsList].sort(sortByDay);
    this.#destinations = [...this.#destinationsModel.destinationsList];
    this.#offers = [...this.#offersModel.offersList];

    if(this.#pointsList.length > 0){
      this.#renderPage();
    }else{
      this.#renderEmptyList();
    }
  }

  #renderEmptyList(){
    render(new ListEmptyView, this.#mainContainer);
  }

  #renderPage(){
    render(this.#destinationWrapper, this.#mainContainer);
    this.#renderFiltersMenu();
    this.#renderSortMenu();
    this.#renderDestinationsList();
  }

  #renderFiltersMenu = () => {
    render(this.#filtersWrapper, this.#headerContainer);
  }
  #renderSortMenu = () => {
    render(new SortListView({
      onSortTypeChange: this.#handleSortList
    }), this.#destinationWrapper.element);
  }
  #renderDestinationsList = () => {
    this.#pointsList.forEach(point => this.#renderDestinationsItem(point, this.#offers, this.#destinations))
  }
  #renderDestinationsItem(point, offers, destinations){
    const destinationPresenter = new DestinationPresenter({
      destinationWrapper: this.#destinationWrapper.element,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handleDestinationChange
    })
    destinationPresenter.init(point, offers, destinations);
    this.#pointsCollection.set(point.id, destinationPresenter)
  }

  #sortList = (sortType) => {
    switch (sortType){
      case SortType.DAY:
        this.#pointsList.sort(sortByDay);
        break;
      case SortType.EVENT:
        this.#pointsList.sort(sortByName);
        break;
      case SortType.PRICE:
        this.#pointsList.sort(sortByPrice);
        break;
    }
    this.#currentSortType = sortType;
  }

  #handleSortList = (sortType) => {
    if(this.#currentSortType === sortType){
      return
    }

    this.#sortList(sortType);
    this.#clearDestinationsList();
    this.#renderDestinationsList();
  }
  #handleModeChange = () => {
    this.#pointsCollection.forEach((point) => point.resetView());
  };

  #handleDestinationChange = (modifiedPoint) => {
    this.#pointsList = updateItem(this.#pointsList, modifiedPoint);
    this.#pointsCollection.get(modifiedPoint.id).init(modifiedPoint, this.#offers);
  }

  #clearDestinationsList() {
    this.#pointsCollection.forEach((point) => point.destroy());
    this.#pointsCollection.clear();
  }
}
