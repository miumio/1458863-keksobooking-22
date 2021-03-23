const ANY = 'any';

const filter = document.querySelector ('.map__filters');
const typeSelect = filter.querySelector('#housing-type');
const roomsSelect = filter.querySelector('#housing-rooms');
const questsSelect = filter.querySelector('#housing-guests');
const priceSelect = filter.querySelector('#housing-price');
const selects = filter.querySelectorAll('select');

const PriceRange = {
  LOW: {
    MIN: 0,
    MAX: 9999,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 49999,
  },
  HIGH: {
    MIN: 50000,
    MAX: 1000000,
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
  const filterObjectsByType = object.offer.type === typeSelect.value || typeSelect.value === ANY;
  const filterObjectsByRooms = object.offer.rooms === +roomsSelect.value || roomsSelect.value === ANY;
  const filterObjectsByGuests = object.offer.guests === +questsSelect.value || questsSelect.value === ANY;
  const filterObjectByPrice = priceSelect.value === ANY || (object.offer.price >= PriceRange[priceSelect.value.toUpperCase()].MIN && object.offer.price <= PriceRange[priceSelect.value.toUpperCase()].MAX);
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
