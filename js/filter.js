const filter = document.querySelector ('.map__filters');
const typeSelect = document.querySelector('#housing-type');
const roomsSelect = document.querySelector('#housing-rooms');
const questsSelect = document.querySelector('#housing-guests');

const getFilteredObjects = (object) => {
  const filterObjectsbyType = object.offer.type === typeSelect.value || typeSelect.value === 'any';
  const filterObjectsbyRooms = object.offer.rooms === +roomsSelect.value || roomsSelect.value === 'any';
  const filterObjectsbyGuests = object.offer.guests === +questsSelect.value || questsSelect.value === 'any';
  return filterObjectsbyType && filterObjectsbyRooms && filterObjectsbyGuests;
};

const changeFilter = (cb) => {
  filter.addEventListener('change', () => {
    cb();
  });
};


export {changeFilter, getFilteredObjects};

