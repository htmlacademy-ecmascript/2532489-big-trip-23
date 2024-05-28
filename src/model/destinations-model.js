import {destinationsList} from "../mock/destinations";

export default class DestinationsModel {
  #destinationsList = [...destinationsList]

  get destinationsList(){
    return this.#destinationsList;
  }
}
