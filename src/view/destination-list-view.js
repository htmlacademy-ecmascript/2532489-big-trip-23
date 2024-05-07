import AbstractView from "../framework/view/abstract-view";
const createDestinationList = () => {
  return `<ul class="trip-events__list"></ul>`
}

export default class DestinationListView extends AbstractView {
  get template() {
    return createDestinationList();
  }
}
