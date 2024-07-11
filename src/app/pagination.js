const itemsPerPage = 10;

const getTotalPages = (filteredArr) => {
  return Math.ceil(filteredArr.length / itemsPerPage);
};

const paginate = (array, pageNumber) => {
  const start = (pageNumber - 1) * itemsPerPage;
  return array.slice(start, start + itemsPerPage);
};

export { getTotalPages, paginate };
