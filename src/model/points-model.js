import Observable from "../framework/observable";
import {UpdateType} from "../const";
import AdapterApi from "../adapterApi";
import DestinationsModel from "./destinations-model";
import OffersModel from "./offers-model";

export default class PointsModel extends Observable{
  #adapterApi = new AdapterApi();
  #destinationsModel = new DestinationsModel();
  #pointsList = new Map();

  get pointsList(){
    return Array.from(this.#pointsList.values());
  }

  async init(){
    const destinationsList = await this.#destinationsModel.getDestinations();
    this.#pointsList = await this.#adapterApi.fetchPointsList(destinationsList);

    this._notify(UpdateType.INIT, this.#pointsList)
  }

  updatePoint(updateType, updateData){
    this.#adapterApi.updatePoint(updateData);
    this.#pointsList.set(updateData.id, updateData);
    this._notify(updateType, updateData);
  }

  addPoint(updateType, updateData){
    this.#adapterApi.addPoint(updateData);
    this.#pointsList.set(updateData.id, updateData);
    this._notify(updateType, updateData);
  }

  deletePoint(updateType, pointId){
    this.#adapterApi.removePoint(pointId);
    this.#pointsList.delete(pointId);
    this._notify(updateType, pointId);
  }
}
