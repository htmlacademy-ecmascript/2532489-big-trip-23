import {remove, render, replace} from "../framework/render";
import DestinationItemView from "../view/destination-item-view";
import EditDestinationForm from "../view/edit-destination-form";

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class DestinationPresenter {
  #destinationItem = null;
  #destinationItemEdited = null;
  #destinationWrapper = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #point = null;
  #offers = null;
  #mode = Mode.DEFAULT;
  constructor({destinationWrapper, onModeChange, onDataChange}) {
    this.#destinationWrapper = destinationWrapper;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(point, offers){
    this.#point = point;
    this.#offers = offers;

    const prevTaskComponent = this.#destinationItem;
    const prevTaskEditComponent = this.#destinationItemEdited;

    this.#destinationItem = new DestinationItemView({
      pointData: this.#point,
      allOffers: this.#offers,
      onFavoriteClick: this.#handleFavoriteClick,
      onEditForm: this.#handleEditClick
    })

    this.#destinationItemEdited = new EditDestinationForm({
      formData: this.#point,
      allOffers: this.#offers,
      onSubmitForm: this.#handleFormSubmit
    })

    if (prevTaskComponent === null || prevTaskEditComponent === null){
      render(this.#destinationItem, this.#destinationWrapper);
      return;
    }

    if(this.#mode === Mode.DEFAULT){
      replace(this.#destinationItem, prevTaskComponent);
    }
    if(this.#mode === Mode.EDITING){
      replace(this.#destinationItemEdited, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#destinationItemEdited.reset(this.#point);
      this.#replaceFormToCard();
    }
  }
  destroy(){
    remove(this.#destinationItem);
    remove(this.#destinationItemEdited);
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, is_favorite: !this.#point.is_favorite});
  };

  #replaceCardToForm() {
    replace(this.#destinationItemEdited, this.#destinationItem);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }
  #replaceFormToCard() {
    replace(this.#destinationItem, this.#destinationItemEdited);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }
  #escKeyDownHandler = (e) => {
    if(e.key === 'Escape'){
      e.preventDefault();
      this.#replaceFormToCard();
    }
  }
  #handleEditClick = () => {
    this.#replaceCardToForm();
  }

  #handleFormSubmit = (modifiedPoint) => {
    this.#handleDataChange(modifiedPoint);
    this.#replaceFormToCard();
  };
}
