/* global _:readonly */

import {createPins} from './map.js';
import {getData} from './data.js';
import {activateFilter, changeFilter, resetFilter} from './filter.js';
import {activateForm} from './form.js';

const RERENDER_DELAY = 500;

getData((objects) => {
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
