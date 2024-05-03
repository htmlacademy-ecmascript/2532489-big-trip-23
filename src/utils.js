import dayjs from 'dayjs';
export function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function createPointDate(date){
  return date ? dayjs(date).format('MMM DD') : '';
}

export function createTimeFormat(time){
  return time ? dayjs(time).format('HH:mm') : '...';
}
export function createDurationPeriod(start, end){
  const startTime = dayjs(start);
  const endTime = dayjs(end);
  const period = endTime.diff(startTime, 'minute');

  if (period < 60) {
    return `${period}M`;
  }
  else if (period > 60 && period < 1440) {
    return dayjs(period).format('HH[H] mm[M]');
  }
  else {
    return dayjs(period).format('DD[D] HH[H] mm[M]');
  }
}
