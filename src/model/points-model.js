import {pointsList} from "../mock/points";
import Observable from "../framework/observable";

export default class PointsModel extends Observable{
  // #pointsList = new Map();
  #pointsList = pointsList.reduce((map, point) => {
    map.set(point.id, point);
    return map;
  }, new Map())

  get pointsList(){
    return Array.from(this.#pointsList.values());
  }

  updatePoint(updateType, updateData){
    this.#pointsList.set(updateData.id, updateData);
    this._notify(updateType, updateData);
  }

  deletePoint(updateType, pointId){
    this.#pointsList.delete(pointId);
    this._notify(updateType, pointId);
  }
}
