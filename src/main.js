import PagePresenter from "./presenter/page-presenter";
import PointsModel from "./model/points-model";

const pointsModel = new PointsModel();
const siteBody = document.querySelector('.page-body')
const siteMainElement = siteBody.querySelector('.trip-events')
const siteHeaderElement = siteBody.querySelector('.trip-main')
const listPresenter = new PagePresenter({
  headerContainer: siteHeaderElement,
  mainContainer: siteMainElement,
  pointsModel
});

listPresenter.init();

