import {destinationList} from "../mock/destination";

export default class DestinationModel {
  #destinationList = [...destinationList]

  get destinationList(){
    return this.#destinationList;
  }
}
