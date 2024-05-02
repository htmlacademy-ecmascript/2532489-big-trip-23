import {getRandomArrayElement} from '../utils.js';
import {TYPES} from "../const";

const destinationList = [
  {
    id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    type: getRandomArrayElement(TYPES),
    offers: [1, 3, 5],
    finishPoint: 'Amsterdam',
    startDate: new Date('2024-05-05'),
    timePeriod: '',
    price: 886,
    isFavourite: true,
    pictures: [],
  },
  {
    id: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    type: getRandomArrayElement(TYPES),
    offers: [1, 3, 5],
    finishPoint: 'Habmurg',
    startDate: new Date('2024-05-05'),
    timePeriod: '',
    price: 2225,
    isFavourite: true,
    pictures: [],
  },
  {
    id: 3,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    type: getRandomArrayElement(TYPES),
    offers: [1, 3, 5],
    finishPoint: 'Seoul',
    startDate: new Date('2024-05-05'),
    timePeriod: '',
    price: 89,
    isFavourite: true,
    pictures: [],
  },
  {
    id: 4,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    type: getRandomArrayElement(TYPES),
    offers: [1, 3, 5],
    finishPoint: 'Tokyo',
    startDate: new Date('2024-05-05'),
    timePeriod: '',
    price: 647,
    isFavourite: true,
    pictures: [],
  }
]

export const getRandomDestination = () => {
  return getRandomArrayElement(destinationList);
}
