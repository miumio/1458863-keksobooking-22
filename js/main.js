/* global _:readonly */

import {createPins} from './map.js';
import {getData} from './data.js';
import {activateFilter, changeFilter, resetFilter} from './filter.js';
import {activateForm, savedAdverts} from './form.js';

const RERENDER_DELAY = 500;

getData((objects) => {
  objects.forEach((item) => {
    savedAdverts.push(item)
  });
  reInit(objects);
});

const reInit = ((objects) => {
  createPins(objects);
  activateForm();
  activateFilter();
  resetFilter (
    () => createPins(objects))
  changeFilter(
    _.debounce(
      () => createPins(objects),
      RERENDER_DELAY));
});

export {reInit};
