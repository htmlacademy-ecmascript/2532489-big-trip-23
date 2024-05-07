import FilterListView from "../view/filter-list-view";
import DestinationListView from "../view/destination-list-view";
import DestinationItemView from "../view/destination-item-view";
import OffersModel from "../model/offers-model";
import SortListView from "../view/sort-list-view";
import EditDestinationForm from "../view/edit-destination-form";
import {render, replace} from "../framework/render";
export default class ListPresenter {
  #headerContainer = null;
  #mainContainer = null;
  #destinationModel = null;
  #filtersWrapper = new FilterListView();
  #destinationWrapper = new DestinationListView();
  #offersModel = new OffersModel();

  constructor({headerContainer, mainContainer, destinationModel}) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#destinationModel = destinationModel;
  }
  init(){
    this.destinatonList = [...this.#destinationModel.destinationList];
    this.offers = [...this.#offersModel.offersList];

    render(this.#filtersWrapper, this.#headerContainer);
    render(this.#destinationWrapper, this.#mainContainer);
    render(new SortListView(), this.#destinationWrapper.element);

    for(let i = 0; i < this.destinatonList.length; i++){
      this.#renderDestinationsItem(this.destinatonList[i], this.offers)
    }
  }

  #renderDestinationsItem(point, offers){
    const destinationItem = new DestinationItemView({
      pointData: point,
      allOffers: offers,
      onEditForm: () => {
        replaceCardToForm();
      }
    })
    const destinationItemEdited = new EditDestinationForm({
      formData: point,
      allOffers: offers,
      onSubmitForm: () => {
        replaceFormToCard();
      }
    })

    function replaceCardToForm() {
      replace(destinationItemEdited, destinationItem)
    }
    function replaceFormToCard() {
      replace(destinationItem, destinationItemEdited)
    }

    render(destinationItem, this.#destinationWrapper.element);
  }
}
