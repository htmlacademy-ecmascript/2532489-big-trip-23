import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
  POST: 'POST'
};

export default class PointsApiService extends ApiService{
  get points(){
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations(){
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers(){
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async putPoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async postPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(pointId) {
    const response = await this._load({
      url: `points/${pointId}`,
      method: Method.DELETE,
    });

    return response;
  }
}
