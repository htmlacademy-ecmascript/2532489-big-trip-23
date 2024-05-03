import {offersList} from "../mock/offers";
export default class OffersModel{
  offersList = Array.from(offersList);

  getOffersList(){
    return this.offersList;
  }
}
