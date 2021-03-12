import {createPins} from './map.js';
import {getData} from './data.js';
import {changeFilter} from './filter.js';
import {getOn, formReset} from './form.js';

getData((objects) => {
  createPins(objects);
  getOn();
  formReset (() => createPins(objects))
  changeFilter(() => createPins(objects));
});
