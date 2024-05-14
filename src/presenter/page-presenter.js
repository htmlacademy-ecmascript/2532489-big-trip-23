import FilterListView from "../view/filter-list-view";
import DestinationListView from "../view/destination-list-view";
import OffersModel from "../model/offers-model";
import SortListView from "../view/sort-list-view";
import ListEmptyView from "../view/list-empty-view";
import { render } from "../framework/render";
import DestinationPresenter from "./destination-presenter";
import {updateItem} from "../utils/common";
import {SortType} from "../const";
import {sortByDay, sortByName, sortByPrice} from "../utils/sort";
export default class PagePresenter {
  #headerContainer = null;
  #mainContainer = null;
  #destinationModel = null;
  #filtersWrapper = new FilterListView();
  #destinationWrapper = new DestinationListView();
  #offersModel = new OffersModel();
  #offers = [];
  #destinatonList = [];
  #destinationsCollection = new Map();
  #currentSortType = SortType.DAY;

  constructor({headerContainer, mainContainer, destinationModel}) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#destinationModel = destinationModel;
  }
  init(){
    this.#destinatonList = [...this.#destinationModel.destinationList].sort(sortByDay);
    this.#offers = [...this.#offersModel.offersList];

    if(this.#destinatonList.length > 0){
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
    this.#destinatonList.forEach(point => this.#renderDestinationsItem(point, this.#offers))
  }
  #renderDestinationsItem(point, offers){
    const destinationPresenter = new DestinationPresenter({
      destinationWrapper: this.#destinationWrapper.element,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handleDestinationChange
    })
    destinationPresenter.init(point, offers);
    this.#destinationsCollection.set(point.id, destinationPresenter)
  }

  #sortList = (sortType) => {
    switch (sortType){
      case SortType.DAY:
        this.#destinatonList.sort(sortByDay);
        break;
      case SortType.EVENT:
        this.#destinatonList.sort(sortByName);
        break;
      case SortType.PRICE:
        this.#destinatonList.sort(sortByPrice);
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
    this.#destinationsCollection.forEach((point) => point.resetView());
  };

  #handleDestinationChange = (modifiedPoint) => {
    this.#destinatonList = updateItem(this.#destinatonList, modifiedPoint);
    this.#destinationsCollection.get(modifiedPoint.id).init(modifiedPoint, this.#offers);
  }

  #clearDestinationsList() {
    this.#destinationsCollection.forEach((point) => point.destroy());
    this.#destinationsCollection.clear();
  }
}
