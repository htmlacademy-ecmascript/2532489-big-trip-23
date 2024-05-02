import ListPresenter from "./presenter/list-presenter";
import DestinationModel from "./model/destination-model";

const destinationModel = new DestinationModel();
const siteBody = document.querySelector('.page-body')
const siteMainElement = siteBody.querySelector('.trip-events')
const siteHeaderElement = siteBody.querySelector('.trip-main')
const listPresenter = new ListPresenter({
  headerContainer: siteHeaderElement,
  mainContainer: siteMainElement,
  destinationModel
});

listPresenter.init();

