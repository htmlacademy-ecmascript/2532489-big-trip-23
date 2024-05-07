import {offersList} from "../mock/offers";
export default class OffersModel{
  #offersList = Array.from(offersList);

  get offersList(){
    return this.#offersList;
  }
}
