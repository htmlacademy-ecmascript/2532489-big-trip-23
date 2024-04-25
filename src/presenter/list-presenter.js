import FilterListView from "../view/filter-list-view";
import FilterItemView from "../view/filter-item-view";
import {render} from "../render";
export default class ListPresenter {
  filtersWrapper = new FilterListView();
  constructor({bodyContainer}) {
    this.bodyContainer = bodyContainer;
  }
  init(){
    render(this.filtersWrapper, this.bodyContainer);

    for(let i = 0; i < 3; i++){
      render(new FilterItemView(), this.filtersWrapper.getElement());
    }
  }
}
