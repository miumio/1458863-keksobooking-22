import {similarObjects, similarListFragment} from './similar-objects-list.js';

const forms = document.querySelector('.ad-form, map__filters');
const fieldset = forms.querySelectorAll('fieldset');
const adress = document.querySelector('#address');

const cityCenter = {
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
  console.log('Карта инициализирована');
  adress.value = `${cityCenter.lat}, ${cityCenter.lng}`;
  forms.classList.remove('ad-form--disabled');
  fieldset.forEach((element) => {
    element.removeAttribute('disabled', '');
  });
})
  .setView({
    lat: cityCenter.lat,
    lng: cityCenter.lng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPin = L.marker(
  {
    lat: cityCenter.lat,
    lng: cityCenter.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

mainPin.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
  adress.value = evt.target.getLatLng();
});

similarObjects.forEach((object) => {
  const pin = L.marker(
    {
      lat: object.location.x,
      lng: object.location.y,
    },
    {
      icon: pinIcon,
    },
  );

  pin
  .addTo(map)
  .bindPopup(similarListFragment);
});
