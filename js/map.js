const forms = document.querySelector('.ad-form, map__filters');
const fieldset = forms.querySelectorAll('fieldset');

forms.classList.add('ad-form--disabled');

fieldset.forEach((element) => {
  element.setAttribute('disabled', '');
});

const map = L.map('map-canvas')
.on('load', () => {
  console.log('Карта инициализирована');
  forms.classList.remove('ad-form--disabled');
  fieldset.forEach((element) => {
    element.removeAttribute('disabled', '');
  });})
  .setView({
    lat: 35.4137,
    lng: 139.415026,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

