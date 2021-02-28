/* global L:readonly */

import {similarObjects, getObject} from './similar-objects-list.js';

const forms = document.querySelector('.ad-form, map__filters');
const fieldset = forms.querySelectorAll('fieldset');
const adress = document.querySelector('#address');

const CITY_CENTER = {
  lat: '35.4137',
  lng: '139.4150',
};

forms.classList.add('ad-form--disabled');

fieldset.forEach((element) => {
  element.setAttribute('disabled', '');
});

adress.setAttribute('readonly', '');
const map = L.map('map-canvas')
  .on('load', () => {
    adress.value = `${CITY_CENTER.lat}, ${CITY_CENTER.lng}`;
    forms.classList.remove('ad-form--disabled');
    fieldset.forEach((element) => {
      element.removeAttribute('disabled', '');
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

const MAIN_PIN_ICON = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const PIN_ICON = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
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

similarObjects.forEach((object) => {
  const pin = L.marker(
    {
      lat: object.location.x,
      lng: object.location.y,
    },
    {
      icon: PIN_ICON,
    },
  );

  pin
    .addTo(map)
    .bindPopup(getObject(object));
});
