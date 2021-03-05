/* global L:readonly */

import {getObject} from './similar-objects-list.js';
import {getData} from './data.js';
import {getOn} from './form.js';

const CITY_CENTER = {
  lat: '35.68783',
  lng: '139.75662',
};

const adress = document.querySelector('#address');
adress.setAttribute('readonly', '');

const map = L.map('map-canvas')
  .on('load', () => {
    adress.value = `${CITY_CENTER.lat}, ${CITY_CENTER.lng}`;
    getOn();
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

const MAIN_PIN_ICON = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const MAIN_PIN = L.marker(
  {
    lat: CITY_CENTER.lat,
    lng: CITY_CENTER.lng,
  },
  {
    draggable: true,
    icon: MAIN_PIN_ICON,
  },
).addTo(map);

MAIN_PIN.on('moveend', (evt) => {
  adress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const PIN_ICON = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createPins = (data) => {
  data.forEach((object) => {
    const PIN = L.marker(
      {
        lat: object.location.lat,
        lng: object.location.lng,
      },
      {
        icon: PIN_ICON,
      },
    );
    PIN
      .addTo(map)
      .bindPopup(getObject(object));
  });
};

getData((objects) => {
  createPins(objects);
});
