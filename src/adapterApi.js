import PointsApiService from "./points-api-service";

const AUTHORIZATION = 'Basic eo0w890ik29889a';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip'

export default class AdapterApi{
  #pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);
  async fetchDestinationsList(){
    let response;
    try {
      response = await this.#pointsApiService.destinations;
    }catch (err){
      response = [];
    }

    return response;
  }

  async fetchOffersList(){
    let response;
    try {
      response = await this.#pointsApiService.offers;
    }catch (err){
      response = [];
    }

    return response;
  }

  async fetchPointsList(destinations){
    let response;
    try {
      const points = await this.#pointsApiService.points;
      response = new Map(points.map(point => {
        let { name, description, pictures } = destinations.find(item => item.id === point.destination);

        return [point.id, {
          ...point,
          description,
          pictures,
          destinationName: name}]
      }))
    }catch (err){
      response = new Map();
    }

    return response;
  }

  async updatePoint(point){
    const response = await this.#pointsApiService.putPoint(this.#adaptToServer(point))
    return response;
  }

  async addPoint(point){
    const response = await this.#pointsApiService.postPoint(this.#adaptToServer(point))
    return response
  }

  async removePoint(pointId){
    const response = await this.#pointsApiService.deletePoint(pointId)
    return response
  }

  #adaptToServer(point){
    const pointAdapted = {...point, base_price: Number(point.base_price)};

    delete pointAdapted.destinationName;
    delete pointAdapted.description;
    delete pointAdapted.pictures;
    delete pointAdapted.new_date;

    return pointAdapted;
  }
}
