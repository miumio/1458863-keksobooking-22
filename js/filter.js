const filter = document.querySelector ('.map__filters');

const changeFilter = (cb) => {
  filter.addEventListener('change', () => {
    cb();
  });
};


export {changeFilter};

