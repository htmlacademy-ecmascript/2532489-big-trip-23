import EditPointForm from "../view/edit-point-form";
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from "../const";
import {remove, render, RenderPosition} from "../framework/render";

export default class NewPointPresenter {
  #offers = null;
  #destinations = null;
  #destinationWrapper = null;
  #editPointComponent = null;
  #destroyHandler = null;
  #handleDataChange = null;
  constructor({container, onDataChange, onDestroy}) {
    this.#destinationWrapper = container;
    this.#destroyHandler = onDestroy;
    this.#handleDataChange = onDataChange;
  }

  init(offers, destinations){
    this.#offers = offers;
    this.#destinations = destinations;

    if(this.#editPointComponent !== null){
      return;
    }

    this.#editPointComponent = new EditPointForm({
      allOffers: this.#offers,
      allDestinations: this.#destinations,
      onSubmitForm: this.#handleFormSubmit,
      onRejectForm: this.destroy,
      newForm: true
    })

    render(this.#editPointComponent, this.#destinationWrapper.element, RenderPosition.AFTERBEGIN);
  }

  destroy = () => {
    if(this.#editPointComponent === null){
      return
    }

    this.#destroyHandler();

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
