import {pointsList} from "../mock/points";

export default class PointsModel {
  #pointsList = [...pointsList]

  get pointsList(){
    return this.#pointsList;
  }
}
