import FilterListView from "../view/filter-list-view";
import DestinationListView from "../view/destination-list-view";
import DestinationItemView from "../view/destination-item-view";
import OffersModel from "../model/offers-model";
import SortListView from "../view/sort-list-view";
import EditDestinationForm from "../view/edit-destination-form";
import {render} from "../render";
export default class ListPresenter {
  filtersWrapper = new FilterListView();
  destinationWrapper = new DestinationListView();
  offersModel = new OffersModel();
  constructor({headerContainer, mainContainer, destinationModel}) {
    this.headerContainer = headerContainer;
    this.mainContainer = mainContainer;
    this.destinationModel = destinationModel;
  }
  init(){
    this.destinatonList = [...this.destinationModel.getDestinationList()];
    this.offers = [...this.offersModel.getOffersList()];

    render(this.filtersWrapper, this.headerContainer);

    render(this.destinationWrapper, this.mainContainer);
    render(new SortListView(), this.destinationWrapper.getElement());
    render(new EditDestinationForm({
      formData: this.destinatonList[1],
      allOffers: this.offers
    }), this.destinationWrapper.getElement());

    for(let i = 0; i < this.destinatonList.length; i++){
      render(new DestinationItemView({
        pointData: this.destinatonList[i],
        allOffers: this.offers
      }), this.destinationWrapper.getElement());
    }
  }
}
