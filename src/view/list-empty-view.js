import AbstractView from "../framework/view/abstract-view";
import {FilterType} from "../const";

const TextByCurrentFilter = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};
const createListEmptyView = (currentFilter) => {
  const textByFilter = TextByCurrentFilter[currentFilter];
  return `<p class="trip-events__msg">${textByFilter}</p>`
}

export default class ListEmptyView extends AbstractView{
  #currentFilter = null;
  constructor({filterType}) {
    super();
    this.#currentFilter = filterType;
  }
  get template(){
    return createListEmptyView(this.#currentFilter);
  }
}
