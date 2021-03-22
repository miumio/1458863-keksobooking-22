const filter = document.querySelector ('.map__filters');
const typeSelect = filter.querySelector('#housing-type');
const roomsSelect = filter.querySelector('#housing-rooms');
const questsSelect = filter.querySelector('#housing-guests');
const priceSelect = filter.querySelector('#housing-price');
const selects = filter.querySelectorAll('select');

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

const deactivateFilter = () => {
  filter.classList.add('map__filters--disabled');
  selects.forEach((select) => {
    select.setAttribute('disabled', '');
  });
};

deactivateFilter();

const activateFilter = () => {
  filter.classList.remove('map__filters--disabled');
  selects.forEach((select) => {
    select.removeAttribute('disabled', '');
  });
};

const filterObjectByFeature = (object) => {
  const checked = filter.querySelectorAll('input:checked');

  return Array.from(checked)
    .map((checkbox) => checkbox.value)
    .every((checkbox) => object.offer.features.includes(checkbox));
};

const getFilteredObjects = (object) => {
  const filterObjectsByType = object.offer.type === typeSelect.value || typeSelect.value === 'any';
  const filterObjectsByRooms = object.offer.rooms === +roomsSelect.value || roomsSelect.value === 'any';
  const filterObjectsByGuests = object.offer.guests === +questsSelect.value || questsSelect.value === 'any';
  const filterObjectByPrice = priceSelect.value === 'any' || (object.offer.price >= priceRange[priceSelect.value].min && object.offer.price <= priceRange[priceSelect.value].max);
  const filterObjectByFeatures = filterObjectByFeature(object);

  return filterObjectsByType && filterObjectsByRooms && filterObjectsByGuests && filterObjectByPrice && filterObjectByFeatures;
};

const changeFilter = (cb) => {
  filter.addEventListener('change', () => {
    cb();
  });
};

const resetFilter = (cb) => {
  filter.addEventListener('reset', () => {
    cb();
  });
};

export {filter, resetFilter, changeFilter, getFilteredObjects, activateFilter};
