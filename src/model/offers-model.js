import AdapterApi from "../adapterApi";
import Observable from "../framework/observable";
export default class OffersModel extends Observable{
  #adapterApi = new AdapterApi();

  async getOffers(){
    let response;
    try {
      response = await this.#adapterApi.fetchOffersList();
    }catch (err){
      console.log('Error', err)
    }

    return response
  }
}
