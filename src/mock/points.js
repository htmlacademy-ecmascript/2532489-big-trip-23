import {getRandomArrayElement} from '../utils/common';
import {TYPES} from "../const";

const randomStartDates = ['2024-05-09T23:30:56.845Z', '2024-05-07T06:30:56.845Z', '2024-05-08T23:30:56.845Z', '2024-05-10T10:55:56.845Z']

export const pointsList = [
  {
    id: '767678687',
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
    type: getRandomArrayElement(TYPES),
    offers: [4],
    destination: 'Hamburg',
    date_from: new Date(getRandomArrayElement(randomStartDates)),
    date_to: '2024-05-11T23:30:56.845Z',
    base_price: 2225,
    is_favorite: false,
    pictures: [],
  },
  {
    id: '08076685',
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
