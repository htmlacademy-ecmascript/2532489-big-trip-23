import {TYPES} from "../const";
import AbstractStatefulView from "../framework/view/abstract-stateful-view";

const DEFAULT_FORM = {
  description: '',
  type: 'flight',
  offers: [],
  destination: '',
  date_from: '',
  date_to: '',
  base_price: 0,
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
                                </div>`
                      }).join('')}
                  </fieldset>
              </div>
          </div>`
}
const createEditForm = (formData, allOffers, allDestinations) => {

  const { currentType, currentDestination, base_price } = formData;
  const offersByType = allOffers && allOffers.find(item => item.type === currentType);
  const destinationByName = allDestinations &&
    allDestinations.find(item => item.name.toLowerCase() === currentDestination.toLowerCase());

  return `<li class="trip-events__item">
                <form class="event event--edit" action="#" method="post">
                    <header class="event__header">
                        ${renderTypeSelect(currentType)}
                        <div class="event__field-group  event__field-group--destination">
                            <label class="event__label  event__type-output" for="event-destination-1">${currentType}</label>
                            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationByName && destinationByName.name}" list="destination-list-1">
                            <datalist id="destination-list-1">
                              ${allDestinations.map(item => {
                                return`<option value="${item.name}">${item.name}</option>`
                              })}
                            </datalist>
                        </div>

                        <div class="event__field-group  event__field-group--time">
                          <label class="visually-hidden" for="event-start-time-1">From</label>
                          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
                          &mdash;
                          <label class="visually-hidden" for="event-end-time-1">To</label>
                          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
                        </div>

                        <div class="event__field-group  event__field-group--price">
                          <label class="event__label" for="event-price-1">
                            <span class="visually-hidden">Price</span>
                            &euro;
                          </label>
                          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${base_price}">
                        </div>

                        <button class="event__save-btn  btn  btn--blue" type="button">Save</button>
                        <button class="event__reset-btn" type="reset">Delete</button>
                        <button class="event__rollup-btn" type="button">
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
                                            ${formData.offers.includes(offer.id) ? 'checked' : ''}>
                                    <label class="event__offer-label" for="event-${offer.title}-1">
                                      <span class="event__offer-title">${offer.title}</span>
                                      &plus;&euro;&nbsp;
                                      <span class="event__offer-price">${offer.price}</span>
                                    </label>
                                </div>`).join('')}
                        </div>
                        </section>

                        <section class="event__section  event__section--destination">
                          <h3 class="event__section-title  event__section-title--destination">Destination</h3>

                          <p class="event__destination-description">${destinationByName && destinationByName.description}</p>

                          <div class="event__photos-container">
                            <div class="event__photos-tape">
                               ${destinationByName && destinationByName.pictures.map(item => {
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
  constructor({formData = DEFAULT_FORM, allOffers, allDestinations, onSubmitForm}) {
    super();
    this._setState(EditPointForm.parseStoreToState(formData));
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#onSubmitForm = onSubmitForm;
    this._restoreHandlers();
  }

  get template() {
    return createEditForm(this._state, this.#allOffers, this.#allDestinations);
  }

  reset(formData){
    this.updateElement(EditPointForm.parseStoreToState(formData));
  }

  #clickSubmitHandler = (e) => {
    e.preventDefault();
    this.#onSubmitForm(EditPointForm.parseStateToStore(this._state));
  }

  static parseStoreToState = (stateData) => {
    return {
      ...stateData,
      currentType: stateData.type,
      currentDestination: stateData.destination
    }
  }

  static parseStateToStore = (state) => {
    const store = {...state};
    store.type = state.currentType;
    store.destination = state.currentDestination;
    delete store.currentType;
    delete  store.currentDestination;

    return store;
  }

  #setCurrentDestination = (e) => {
    let checkedDestination = this.#allDestinations.find(item => item.name === e.target.value);

    checkedDestination && this.updateElement({currentDestination: checkedDestination.name})
  }

  #setCurrentType = (e) => {
    if (e.target.tagName !== 'LABEL') {
      return;
    }
    let checkedType = e.target.dataset.currentType;

    this.updateElement({
      currentType: checkedType
    });
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#clickSubmitHandler);
    this.element.querySelector('.event__save-btn')
      .addEventListener('click', this.#clickSubmitHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('input', this.#setCurrentDestination);
    this.element.addEventListener('click', this.#setCurrentType);
  }
}
