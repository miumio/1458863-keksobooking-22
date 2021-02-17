const form = document.querySelector('.ad-form');
form.classList.add('ad-form--disabled');

const fieldset = form.querySelectorAll('fieldset');

for (let i = 0; i < fieldset.length; i++) {
  fieldset[i].setAttribute('disabled', '');
};

const filters = document.querySelector('.map__filters');
filters.classList.add('ad-form--disabled');

const input = filters.querySelectorAll('select, fieldset');
for (let i = 0; i < input.length; i++) {
  input[i].setAttribute('disabled', '');
}
