import Observable from "../framework/observable";
import AdapterApi from "../adapterApi";

export default class DestinationsModel extends Observable{
  #adapterApi = new AdapterApi();

  async getDestinations(){
    let response;
    try {
      response = await this.#adapterApi.fetchDestinationsList();
    }catch (err){
      console.log('Error', err)
    }

    return response;
  }
}
