/* global L:readonly */
/* global _:readonly */

import {getObject} from './similar-objects-list.js';
import {activateForm} from './form.js';
import {getData} from './data.js';
import {activateFilter, changeFilter, resetFilter, getFilteredObjects} from './filter.js';

const RERENDER_DELAY = 500;
const SIMILAR_OBJECT_COUNT = 10;
const MAIN_PIN_WIDTH = 52;
const PIN_WIDTH = 40;
const savedAdverts = [];

const CITY_CENTER = {
  lat: '35.68783',
  lng: '139.75662',
};

const PIN_ICON = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [PIN_WIDTH, PIN_WIDTH],
  iconAnchor: [PIN_WIDTH/2, PIN_WIDTH],
});

const MAIN_PIN_ICON = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_PIN_WIDTH, MAIN_PIN_WIDTH],
  iconAnchor: [MAIN_PIN_WIDTH/2, MAIN_PIN_WIDTH],
});

const map = L.map('map-canvas');
const adress = document.querySelector('#address');
adress.setAttribute('readonly', '');

const initMap = () => {
  map.on('load', () => {
    adress.value = `${CITY_CENTER.lat}, ${CITY_CENTER.lng}`;
    getData((objects) => {
      objects.forEach((item) => {
        savedAdverts.push(item)
      });
      reInit(objects);
    });
  })
    .setView({
      lat: CITY_CENTER.lat,
      lng: CITY_CENTER.lng,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  return map
};

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

const mainPin = L.marker(
  {
    lat: CITY_CENTER.lat,
    lng: CITY_CENTER.lng,
  },
  {
    draggable: true,
    icon: MAIN_PIN_ICON,
  },
).addTo(map);

mainPin.on('moveend', (evt) => {
  adress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

let pins = [];

const createPins = (data) => {
  pins.forEach((pin) => pin.remove());

  data
    .slice()
    .filter(getFilteredObjects)
    .slice(0, SIMILAR_OBJECT_COUNT)
    .forEach((object) => {
      const pin = L.marker(
        {
          lat: object.location.lat,
          lng: object.location.lng,
        },
        {
          icon: PIN_ICON,
        },
      );
      pin
        .addTo(map)
        .bindPopup(getObject(object).cloneNode(true));

      pins.push(pin)
    });
};

const resetMap = () => {
  map.setView(CITY_CENTER, 10);
  mainPin.setLatLng(CITY_CENTER);
  adress.value = `${CITY_CENTER.lat}, ${CITY_CENTER.lng}`;
};

export {resetMap, createPins, reInit, savedAdverts, initMap};
