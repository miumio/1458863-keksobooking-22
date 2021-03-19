/* global _:readonly */

import {createPins} from './map.js';
import {getData} from './data.js';
import {changeFilter} from './filter.js';
import {activateForm, resetForm} from './form.js';

const RERENDER_DELAY = 500;

getData((objects) => {
  createPins(objects);
  activateForm();
  resetForm (() => createPins(objects))
  changeFilter(
    _.debounce(() => createPins(objects), RERENDER_DELAY));
});
