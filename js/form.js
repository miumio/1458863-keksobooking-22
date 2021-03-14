import {sendData} from './data.js';
import {createErrorMessage} from './util.js';
import {mapReset} from './map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const forms = document.querySelector('.ad-form, map__filters');
const fieldset = forms.querySelectorAll('fieldset');
const objectTitle = document.querySelector('#title');
const objectType = document.querySelector('#type');
const objectPrice = document.querySelector('#price');
const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');



const getOff = () => {
  forms.classList.add('ad-form--disabled');
  fieldset.forEach((element) => {
    element.setAttribute('disabled', '');
  });
};

getOff();

const getOn = () => {
  forms.classList.remove('ad-form--disabled');
  fieldset.forEach((element) => {
    element.removeAttribute('disabled', '');
  });
};

const createMessage = () => {
  const main = document.querySelector('main');
  const template = document.querySelector('#success')
    .content;

  const message = template.cloneNode(true);
  main.body.appendChild(message);
}

const formSubmit = (onSucces) => {
  forms.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSucces(createMessage()),
      () => createErrorMessage('Не удалось отправить форму. Попробуйте ещё раз'),
      new FormData(evt.target),
    );
  });
};

const formReset = () => {
  forms.reset();
  mapReset();
};

formSubmit(formReset);

const buttonReset = document.querySelector('.ad-form__reset');
buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  forms.reset();
});

// const errorTemplate = document.querySelector('#error')
// .content
// .querySelector('.error');

// const showError = () => {
//   const errorMessage = errorTemplate.cloneNode(true);

//   document.body.append(errorMessage);
// }


const Price = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const setPrice = () => {
  objectType.addEventListener('change', () => {
    const MIN_PRICE = Price[objectType.value];
    objectPrice.setAttribute('placeholder', MIN_PRICE);
    objectPrice.min = MIN_PRICE;
  });
};
setPrice();

const setTime = () => {
  checkIn.addEventListener('change', () =>
    checkOut.value = checkIn.value);
  checkOut.addEventListener('change', () =>
    checkIn.value = checkOut.value);
};

setTime();

const validateTitle = () => {
  objectTitle.addEventListener('input', () => {
    const valueLength = objectTitle.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      objectTitle.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) +' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      objectTitle.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) +' симв.');
    } else {
      objectTitle.setCustomValidity('');
    }

    objectTitle.reportValidity();
  });
};

validateTitle();

export {getOn, formReset};

