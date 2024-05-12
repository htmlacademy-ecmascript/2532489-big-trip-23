import {FilterType} from "../const";

const currentDate = new Date();
export const filter = {
  [FilterType.EVERYTHING]: (list) => list,
  [FilterType.PAST]: (list) => list.filter(item => new Date(item.date_to) < currentDate),
  [FilterType.FUTURE]: (list) => list.filter(item => new Date(item.date_to) > currentDate),
  [FilterType.PRESENT]: (list) => list.filter(item => new Date(item.date_to).getDate() === currentDate.getDate() && new Date(item.date_to).getMonth() === currentDate.getMonth() && new Date(item.date_to).getFullYear() === currentDate.getFullYear())
}
