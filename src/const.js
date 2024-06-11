export const TYPES = ['flight', 'taxi', 'bus', 'train', 'ship', 'drive', 'restaurant', 'sightseeing', 'check-in'];

export const FilterType = {
  'EVERYTHING': 'everything',
  'FUTURE': 'future',
  'PRESENT': 'present',
  'PAST': 'past'
}

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

export const PointMode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  CREATING: 'CREATING'
};
