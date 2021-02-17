import './similar-objects-list.js';

const form = document.querySelector('.ad-form');
form.classList.add('ad-form--disabled');

const fieldset = form.querySelectorAll('fieldset');

for (let i = 0; i < fieldset.length; i++) {
  fieldset[i].setAttribute('disabled', '')
}
