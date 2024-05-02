import FilterListView from "../view/filter-list-view";
import FilterItemView from "../view/filter-item-view";
import DestinationListView from "../view/destination-list-view";
import DestinationItemView from "../view/destination-item-view";
import {render} from "../render";
export default class ListPresenter {
  filtersWrapper = new FilterListView();
  destinationWrapper = new DestinationListView();
  constructor({headerContainer, mainContainer, destinationModel}) {
    this.headerContainer = headerContainer;
    this.mainContainer = mainContainer;
    this.destinationModel = destinationModel;
  }
  init(){
    this.destinatonList = [...this.destinationModel.getDestinationList()];

    render(this.filtersWrapper, this.headerContainer);

    for(let i = 0; i < 3; i++){
      render(new FilterItemView(), this.filtersWrapper.getElement());
    }

    render(this.destinationWrapper, this.mainContainer);

    for(let i = 0; i < this.destinatonList.length; i++){
      render(new DestinationItemView({pointData: this.destinatonList[i]}), this.destinationWrapper.getElement());
    }
  }
}
