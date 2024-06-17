import {remove, render, replace} from "../framework/render";
import PointItemView from "../view/point-item-view";
import EditPointForm from "../view/edit-point-form";
import {UserAction, UpdateType, PointMode} from "../const";


export default class PointPresenter {
  #pointItem = null;
  #pointItemEdited = null;
  #destinationWrapper = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #point = null;
  #offers = null;
  #destinations = null;
  #mode = PointMode.DEFAULT;
  constructor({destinationWrapper, onModeChange, onDataChange}) {
    this.#destinationWrapper = destinationWrapper;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(point, offers, destinations){
    this.#destinations = destinations;
    this.#point = point;
    this.#offers = offers;

    const prevTaskComponent = this.#pointItem;
    const prevTaskEditComponent = this.#pointItemEdited;

    this.#pointItem = new PointItemView({
      pointData: this.#point,
      allOffers: this.#offers,
      onFavoriteClick: this.#handleFavoriteClick,
      onEditForm: this.#handleEditClick
    })

    this.#pointItemEdited = new EditPointForm({
      formData: this.#point,
      allOffers: this.#offers,
      allDestinations: this.#destinations,
      onSubmitForm: this.#handleFormSubmit,
      onRejectForm: this.#handlePointRemove,
      newForm: false,
      onToggleForm: this.#replaceFormToCard
    })

    if (prevTaskComponent === null || prevTaskEditComponent === null){
      render(this.#pointItem, this.#destinationWrapper);
      return;
    }

    if(this.#mode === PointMode.DEFAULT){
      replace(this.#pointItem, prevTaskComponent);
    }
    if(this.#mode === PointMode.EDITING){
      replace(this.#pointItemEdited, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }

  resetView() {
    if (this.#mode !== PointMode.DEFAULT) {
      this.#pointItemEdited.reset(this.#point);
      this.#replaceFormToCard();
    }
  }
  destroy(){
    remove(this.#pointItem);
    remove(this.#pointItemEdited);
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, is_favorite: !this.#point.is_favorite},
    );
  };

  #replaceCardToForm = () => {
    replace(this.#pointItemEdited, this.#pointItem);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = PointMode.EDITING;
  }
  #replaceFormToCard = () => {
    replace(this.#pointItem, this.#pointItemEdited);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = PointMode.DEFAULT;
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
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      modifiedPoint
    );
    this.#replaceFormToCard();
  };

  #handlePointRemove = (pointId) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      pointId
    );
  };
}
