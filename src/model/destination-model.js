import {getRandomDestination} from "../mock/destination";

const DESTINATION_COUNT = 4;

export default class DestinationModel {
  destinationList = Array.from({length: DESTINATION_COUNT}, getRandomDestination);

  getDestinationList(){
    return this.destinationList;
  }
}
