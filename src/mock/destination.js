import {getRandomArrayElement} from '../utils.js';
import {TYPES} from "../const";

const randomStartDates = ['2024-05-20T08:02:17-05:00', '2024-05-11T08:02:17-05:00', '2024-05-15T08:02:17-05:00', '2024-05-02T08:02:17-05:00']

const destinationList = [
  {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    type: getRandomArrayElement(TYPES),
    offers: [2],
    finishPoint: 'Amsterdam',
    startDate: new Date(getRandomArrayElement(randomStartDates)),
    startTime: '2024-04-10T10:30:00',
    endTime: '2024-04-10T11:30:00',
    timePeriod: '',
    base_price: 886,
    isFavourite: true,
    pictures: [],
  },
  {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    type: getRandomArrayElement(TYPES),
    offers: [4],
    finishPoint: 'Habmurg',
    startDate: new Date(getRandomArrayElement(randomStartDates)),
    startTime: '2024-04-10T10:30:00',
    endTime: '2024-04-10T13:30:00',
    base_price: 2225,
    isFavourite: true,
    pictures: [],
  },
  {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    type: getRandomArrayElement(TYPES),
    offers: [1, 3],
    finishPoint: 'Seoul',
    startDate: new Date(getRandomArrayElement(randomStartDates)),
    startTime: '2024-04-10T10:30:00',
    endTime: '2024-04-11T13:30:00',
    base_price: 89,
    isFavourite: true,
    pictures: [],
  },
  {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    type: getRandomArrayElement(TYPES),
    offers: [3],
    finishPoint: 'Tokyo',
    startDate: new Date(getRandomArrayElement(randomStartDates)),
    startTime: '2024-04-10T10:30:00',
    endTime: '2024-04-10T10:45:00',
    base_price: 647,
    isFavourite: true,
    pictures: [],
  }
]

export const getRandomDestination = () => {
  return getRandomArrayElement(destinationList);
}
