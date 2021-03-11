const filter = document.querySelector ('.map__filters');
const typeSelect = document.querySelector('#housing-type');

const filterObjectsbyType = (object) => (object.offer.type === typeSelect.value || typeSelect.value === 'any') ?  true : false;

const changeFilter = (cb) => {
  filter.addEventListener('change', () => {
    cb();
  });
};


export {changeFilter, filterObjectsbyType};

