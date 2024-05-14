export const sortByDay = (a, b) => {
  const dateA = new Date(a.date_from);
  const dateB = new Date(b.date_from);

  return dateA - dateB;
}

export const sortByPrice = (a, b) => {
  return a.base_price - b.base_price;
}

export const sortByName = (a, b) => {
  return a.destination.localeCompare(b.destination);
}
