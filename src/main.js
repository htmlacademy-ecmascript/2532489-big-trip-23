import ListPresenter from "./presenter/list-presenter";

const siteMainElement = document.querySelector('.page-body');
const siteHeaderElement = siteMainElement.querySelector('.trip-main')
const listPresenter = new ListPresenter({bodyContainer: siteHeaderElement});

listPresenter.init();

