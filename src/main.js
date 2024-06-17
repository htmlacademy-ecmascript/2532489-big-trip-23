import PagePresenter from "./presenter/page-presenter";
import PointsModel from "./model/points-model";
import {FiltersModel} from "./model/filters-model";
import FilterPresenter from "./presenter/filter-presenter";
import NewPointButton from "./view/new-point-button";
import {render} from "./framework/render";
import PointsApiService from "./points-api-service";
import OffersModel from "./model/offers-model";
const filtersModel = new FiltersModel();
const siteBody = document.querySelector('.page-body');
const siteMainElement = siteBody.querySelector('.trip-events');
const siteHeaderElement = siteBody.querySelector('.trip-main');

const pointsModel = new PointsModel();

const pagePresenter = new PagePresenter({
  mainContainer: siteMainElement,
  pointsModel,
  filtersModel,
  onNewPointFormClose: handleNewPointFormClose
});
const newPointButton= new NewPointButton({
  onClick: handleNewPointCreation
});
const filterPresenter = new FilterPresenter({
  headerContainer: siteHeaderElement,
  pointsModel,
  filtersModel
});

function handleNewPointCreation(){
  pagePresenter.createNewPoint();
  newPointButton.element.disabled = true;
}

function handleNewPointFormClose(){
  newPointButton.element.disabled = false;
}

render(newPointButton, siteHeaderElement);

pointsModel.init();
pagePresenter.init();
filterPresenter.init();

