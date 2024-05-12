import FilterListView from "../view/filter-list-view";
import DestinationListView from "../view/destination-list-view";
import OffersModel from "../model/offers-model";
import SortListView from "../view/sort-list-view";
import ListEmptyView from "../view/list-empty-view";
import { render } from "../framework/render";
import DestinationPresenter from "./destination-presenter";
import {updateItem} from "../utils/common";
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

  constructor({headerContainer, mainContainer, destinationModel}) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#destinationModel = destinationModel;
  }
  init(){
    this.#destinatonList = [...this.#destinationModel.destinationList];
    this.#offers = [...this.#offersModel.offersList];

    render(this.#filtersWrapper, this.#headerContainer);

    if(this.#destinatonList.length > 0){
      this.#renderDestinationsList();
    }else{
      this.#renderEmptyList();
    }
  }

  #renderEmptyList(){
    render(new ListEmptyView, this.#mainContainer);
  }

  #renderDestinationsList(){
    render(this.#destinationWrapper, this.#mainContainer);
    render(new SortListView(), this.#destinationWrapper.element);

    for(let i = 0; i < this.#destinatonList.length; i++){
      this.#renderDestinationsItem(this.#destinatonList[i], this.#offers)
    }
  }
  #handleModeChange = () => {
    this.#destinationsCollection.forEach((point) => point.resetView());
  };

  #handleDestinationChange = (modifiedPoint) => {
    this.#destinatonList = updateItem(this.#destinatonList, modifiedPoint);
    this.#destinationsCollection.get(modifiedPoint.id).init(modifiedPoint, this.#offers);
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
}
