import AbstractView from "../framework/view/abstract-view";

const createListEmptyView = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`
}

export default class ListEmptyView extends AbstractView{
  get template(){
    return createListEmptyView();
  }
}
