import {TYPES} from "../const";
import AbstractStatefulView from "../framework/view/abstract-stateful-view";
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const DEFAULT_FORM = {
  type: 'flight',
  offers: [],
  destinationName: '',
  destination: null,
  description: '',
  date_from: new Date(),
  date_to: new Date(),
  base_price: 1,
  is_favorite: false,
  pictures: [],
}

const renderTypeSelect = (type) => {
  return `<div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
              <div class="event__type-list">
                  <fieldset class="event__type-group">
                      ${TYPES.map(type => {
                        return `<div class="event__type-item">
                                  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
                                  <label class="event__type-label  event__type-label--${type}"
                                         for="event-type-${type}-1"
                                         data-current-type="${type}">${type}</label>
                                </div>`}).join('')}
                  </fieldset>
              </div>
          </div>`
}
const createEditForm = (formData, allOffers, allDestinations, newForm, isDateValid) => {

  const {
    id,
    currentType,
    base_price,
    date_from,
    date_to,
    description,
    pictures,
    destinationName,
    offers
  } = formData;

  const offersByType = allOffers && allOffers.find(item => item.type === currentType);

  return `<li class="trip-events__item">
                <form class="event event--edit" action="#" method="post">
                    <header class="event__header">
                        ${renderTypeSelect(currentType)}
                        <div class="event__field-group  event__field-group--destination">
                            <label class="event__label  event__type-output" for="event-destination-1">${currentType}</label>
                            <input class="event__input  event__input--destination"
                                   id="event-destination-1"
                                   type="text"
                                   name="event-destination"
                                   value="${destinationName ? destinationName : allDestinations[0].name}"
                                   list="destination-list-1">
                            <datalist id="destination-list-1">
                              ${allDestinations.map(item => {
                                      return`<option value="${item.name}">${item.name}</option>`
                                  })}
                            </datalist>
                        </div>

                        <div class="event__field-group  event__field-group--time">
                          <label class="visually-hidden" for="event-start-time-1">From</label>
                          <input class="event__input  event__input--time"
                                 id="event-start-time-1"
                                 type="text"
                                 name="event-start-time"
                                 value="${date_from}">
                          &mdash;
                          <label class="visually-hidden" for="event-end-time-1">To</label>
                          <input class="event__input  event__input--time"
                                 id="event-end-time-1"
                                 type="text"
                                 name="event-end-time"
                                 value="${date_to}">
                        </div>

                        <div class="event__field-group  event__field-group--price">
                          <label class="event__label" for="event-price-1">
                            <span class="visually-hidden">Price</span>
                            &euro;
                          </label>
                          <input class="event__input  event__input--price"
                                 id="event-price-1"
                                 type="text"
                                 name="event-price"
                                 value="${base_price}">
                        </div>

                        <button class="event__save-btn  btn  btn--blue" type="button" ${!isDateValid && "disabled"}>Save</button>
                        <button class="event__reset-btn"
                                type="button"
                                data-current-id="${newForm ? '' : id}">${newForm ? 'Cancel' : 'Delete'}</button>
                        <button class="${newForm ? 'visually-hidden' : 'event__rollup-btn'}" type="button">
                          <span class="visually-hidden">Open event</span>
                        </button>
                    </header>

                    <section class="event__details">
                        <section class="event__section  event__section--offers">
                          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                          <div class="event__available-offers">
                              ${offersByType && offersByType.offers.map(offer => `
                                  <div class="event__offer-selector">
                                      <input class="event__offer-checkbox
                                              visually-hidden"
                                              id="event-${offer.title}-1"
                                              type="checkbox"
                                              name="event-${offer.title}"
                                              ${offers.includes(offer.id) ? 'checked' : ''}>
                                      <label class="event__offer-label" data-current-offer="${offer.id}"
                                             for="event-${offer.title}-1">
                                        <span class="event__offer-title" data-current-offer="${offer.id}">${offer.title}</span>
                                        &plus;&euro;&nbsp;
                                        <span class="event__offer-price">${offer.price}</span>
                                      </label>
                                  </div>`).join('')}
                          </div>
                        </section>

                        <section class="event__section  event__section--destination">
                          <h3 class="event__section-title  event__section-title--destination">Destination</h3>

                          <p class="event__destination-description">${description}</p>

                          <div class="event__photos-container">
                            <div class="event__photos-tape">
                               ${pictures.map(item => {
                                    return `<img class="event__photo" src="${item.src}" alt="${item.description}">`
                                  })}
                            </div>
                          </div>
                        </section>
                    </section>
                </form>
            </li>`
}
export default class EditPointForm extends AbstractStatefulView {
  #allOffers;
  #allDestinations;
  #onSubmitForm;
  #handleToggle;
  #datepicker;
  #rejectHandler;
  #isNewForm;
  #currentPrice;
  #storePrice;
  #isDateValid;
  constructor({formData = DEFAULT_FORM, allOffers, allDestinations, onSubmitForm, onRejectForm, newForm, onToggleForm}) {
    super();
    this._setState(EditPointForm.parseStoreToState({
      ...formData,
      destination: this._state.destination ? this._state.destination : allDestinations[0].id
    }));
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#onSubmitForm = onSubmitForm;
    this.#rejectHandler = onRejectForm;
    this.#storePrice = formData.base_price;
    this.#isNewForm = newForm;
    this.#handleToggle = onToggleForm;
    this.#isDateValid = new Date(this._state.date_from) < new Date(this._state.date_to) && -1;
    this._restoreHandlers();
  }

  get template() {
    return createEditForm(this._state, this.#allOffers, this.#allDestinations, this.#isNewForm, this.#isDateValid);
  }

  removeElement() {
    super.removeElement();
    if(this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  reset(formData){
    this.updateElement(EditPointForm.parseStoreToState(formData));
  }

  #clickSubmitHandler = (e) => {
    let price = this.#currentPrice ? this.#currentPrice : this.#storePrice;
    e.preventDefault();
    this.#onSubmitForm(EditPointForm.parseStateToStore({
      ...this._state,
      base_price: price,
    }));
  }

  #toggleActiveForm = (e) => {
    e.preventDefault();
    this.#handleToggle()
  }

  #setStartDatepicker(){
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: "d/m/Y H:i",
        enableTime: true,
        defaultDate: this._state.date_from,
        onChange: (d) => this.#onChangeStartDate(d)
      }
    )
    this.#validateDate();
  }

  #setEndDatepicker(){
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: "d/m/Y H:i",
        enableTime: true,
        defaultDate: this._state.date_to,
        minDate: new Date(60 * 60 * 1000),
        onChange: (d) => this.#onChangeEndDate(d)
      }
    )
    this.#validateDate();
  }

  #onChangeStartDate([date]){
    this.updateElement({date_from: date})
  }

  #onChangeEndDate([date]){
    this.updateElement({date_to: date})
  }

  static parseStoreToState = (storeData) => {
    return {
      ...storeData,
      currentType: storeData.type,
      new_date: storeData.date_to,
      isSaving: false,
      isUnsaved: false,
      isDeleting: false
    }
  }

  static parseStateToStore = (state) => {
    const store = {...state};
    store.type = state.currentType;
    store.date_from = state.date_from;
    store.date_to = state.date_to;
    delete store.currentType;
    delete store.isSaving;
    delete store.isUnsaved;
    delete store.isDeleting;

    return store;
  }

  #setCurrentDestination = (e) => {
    e.preventDefault();
    let checkedDestination = this.#allDestinations.find(item => item.name === e.target.value);
    checkedDestination && this.updateElement({
      destinationName: checkedDestination.name,
      destination: checkedDestination.id
    });
  }

  #validateNumber = (e) => {
    const idValidValue = e.target.value.replace(/[^0-9]/g, '').replace(/^0+/, '');;
    e.target.value = idValidValue;
  }

  #validateDate = () => {
    this.#isDateValid = new Date(this._state.date_from) < new Date(this._state.date_to) && -1
  }

  #setCurrentPrice = (e) => {
    let isValidNumber = /^\d+$/.test(e.target.value);
    if(isValidNumber){
      this.#currentPrice = e.target.value;
    }
  }

  #setCurrentType = (e) => {
    let checkedType = e.target.dataset.currentType;

    this.updateElement({
      currentType: checkedType,
      offers: []
    });
  }

  #clickOfferOption = (e) => {
    let checkedOffer = e.target.dataset.currentOffer;
    let idx = this._state.offers.findIndex(offer => offer === checkedOffer);
    if(idx === -1){
      this.updateElement({offers: [...this._state.offers, checkedOffer]});
    }else{
      let newOffers = [
        ...this._state.offers.slice(0, idx),
        ...this._state.offers.slice(idx + 1)
      ];
      this.updateElement({offers: [...newOffers]});
    }
  }

  #clickRejectHandler = (e) => {
    let currentFormId = e.target.dataset.currentId;

    this.#rejectHandler(currentFormId)
  }

  _restoreHandlers() {
    let el = !this.#isNewForm && this.element.querySelector('.event__rollup-btn');
    el && el.addEventListener('click', this.#toggleActiveForm);
    this.element.querySelector('.event__save-btn')
      .addEventListener('click', this.#clickSubmitHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('input', this.#setCurrentDestination);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#setCurrentPrice);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#validateNumber);
    this.element.querySelector('.event__type-group')
      .addEventListener('click', this.#setCurrentType);
    this.element.querySelector('.event__available-offers')
      .addEventListener('click', this.#clickOfferOption)
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#clickRejectHandler)

    this.#setStartDatepicker();
    this.#setEndDatepicker();
  }
}
