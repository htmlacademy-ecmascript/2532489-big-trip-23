import {getRandomArrayElement} from '../utils/common';
import {TYPES} from "../const";

const randomStartDates = ['2024-05-09T23:30:56.845Z', '2024-05-07T06:30:56.845Z', '2024-05-08T23:30:56.845Z', '2024-05-10T10:55:56.845Z']

export const destinationList = [
  {
    id: '767678687',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    type: getRandomArrayElement(TYPES),
    offers: [2],
    destination: 'Amsterdam',
    date_from: new Date(getRandomArrayElement(randomStartDates)),
    date_to: '2024-05-10T23:30:56.845Z',
    base_price: 886,
    is_favorite: true,
    pictures: [],
  },
  {
    id: '76909080',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    type: getRandomArrayElement(TYPES),
    offers: [4],
    destination: 'Habmurg',
    date_from: new Date(getRandomArrayElement(randomStartDates)),
    date_to: '2024-05-11T23:30:56.845Z',
    base_price: 2225,
    is_favorite: false,
    pictures: [],
  },
  {
    id: '08076685',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    type: getRandomArrayElement(TYPES),
    offers: [1, 3],
    destination: 'Seoul',
    date_from: new Date(getRandomArrayElement(randomStartDates)),
    date_to: '2024-05-10T23:30:56.845Z',
    base_price: 89,
    is_favorite: true,
    pictures: [],
  },
  {
    id: '080789696',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    type: getRandomArrayElement(TYPES),
    offers: [3],
    destination: 'Tokyo',
    date_from: new Date(getRandomArrayElement(randomStartDates)),
    date_to: '2024-05-10T23:45:56.845Z',
    base_price: 647,
    is_favorite: false,
    pictures: [],
  }
]
