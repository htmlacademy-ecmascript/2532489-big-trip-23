import {getRandomDestination} from "../mock/destination";

const DESTINATION_COUNT = 4;

export default class DestinationModel {
  #destinationList = Array.from({length: DESTINATION_COUNT}, getRandomDestination);

  get destinationList(){
    return this.#destinationList;
  }
}
