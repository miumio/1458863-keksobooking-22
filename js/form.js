import {sendData} from './data.js';
import {createErrorMessage} from './util.js';
import {mapReset} from './map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const Price = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const forms = document.querySelector('.ad-form, map__filters');
const fieldset = forms.querySelectorAll('fieldset');
const titleInput = document.querySelector('#title');
const typeSelect = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');
const roomsSelect = document.querySelector('#room_number');
const guestSelect = document.querySelector('#capacity');

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


const setPrice = () => {
  typeSelect.addEventListener('change', () => {
    const MIN_PRICE = Price[typeSelect.value];
    typeSelect.setAttribute('placeholder', MIN_PRICE);
    typeSelect.min = MIN_PRICE;
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
  titleInput.addEventListener('input', () => {
    const valueLength = titleInput.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
    } else {
      titleInput.setCustomValidity('');
    }

    titleInput.reportValidity();
  });
};

validateTitle();

const validatePrice = () => {
  priceInput.addEventListener('input', () => {
    const value = priceInput.value;
    const MAX_PRICE = 1000000;

    if (value > MAX_PRICE) {
      priceInput.setCustomValidity(`Максимальная цена: ${MAX_PRICE} + рублей.`);
    } else {
      priceInput.setCustomValidity('');
    }

    priceInput.reportValidity();
  });
};

validatePrice();

const getGuestsForRooms = () => {
  const roomsValue = Number(roomsSelect.value);
  const guestsValue = Number(guestSelect.value);

  if (roomsValue === 1 && guestsValue !== 1) {
    guestSelect.setCustomValidity('для 1 гостя');
  } else if (roomsValue === 2 && (guestsValue === 3 || guestsValue ===0)) {
    guestSelect.setCustomValidity('для 1-2 гостей');
  } else if (roomsValue === 3 && guestsValue === 0) {
    guestSelect.setCustomValidity('для 1-3 гостей');
  } else if (roomsValue === 100 && guestsValue !== 0) {
    guestSelect.setCustomValidity('не для гостей');
  } else {
    guestSelect.setCustomValidity('');
  }

  guestSelect.reportValidity();
};

const changeRoomsSelect = () => getGuestsForRooms();
const changeGuestsSelect = () => getGuestsForRooms();
roomsSelect.addEventListener('change', changeRoomsSelect);
guestSelect.addEventListener('change', changeGuestsSelect);

export {getOn, formReset};

