const filter = document.querySelector ('.map__filters');
const typeSelect = document.querySelector('#housing-type');
const roomsSelect = document.querySelector('#housing-rooms');
const questsSelect = document.querySelector('#housing-guests');
const priceSelect = document.querySelector('#housing-price');

const priceRange = {
  low: {
    min: 0,
    max: 9999,
  },
  middle: {
    min: 10000,
    max: 49999,
  },
  high: {
    min: 50000,
    max: 1000000,
  },
};

const getFilteredObjects = (object) => {
  const filterObjectsbyType = object.offer.type === typeSelect.value || typeSelect.value === 'any';
  const filterObjectsbyRooms = object.offer.rooms === +roomsSelect.value || roomsSelect.value === 'any';
  const filterObjectsbyGuests = object.offer.guests === +questsSelect.value || questsSelect.value === 'any';
  const filterObjectbyPrice = priceSelect.value === 'any' || (object.offer.price >= priceRange[priceSelect.value].min && object.offer.price <= priceRange[priceSelect.value].max);

  return filterObjectsbyType && filterObjectsbyRooms && filterObjectsbyGuests && filterObjectbyPrice;
};

const changeFilter = (cb) => {
  filter.addEventListener('change', () => {
    cb();
  });
};


export {changeFilter, getFilteredObjects};

