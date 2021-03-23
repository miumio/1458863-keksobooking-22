import {sendData} from './data.js';
import {showErrorMessage, showSuccessMessage} from './message.js';
import {resetMap} from './map.js';
import {filter} from './filter.js';
import {reInit} from './main.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const Price = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
};

const RoomCapacity = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  HUNDRED: '100',
};

const QuestsCount = {
  ONE: '1',
  THREE: '3',
  ZERO: '0',
};

const savedAdverts = [];

const form = document.querySelector('.ad-form');
const fieldsets = document.querySelectorAll('fieldset');
const titleInput = form.querySelector('#title');
const typeSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const checkIn = form.querySelector('#timein');
const checkOut = form.querySelector('#timeout');
const roomsSelect = form.querySelector('#room_number');
const guestSelect = form.querySelector('#capacity');
const resetButton = form.querySelector('.ad-form__reset');

const deactivateForm = () => {
  form.classList.add('ad-form--disabled');
  fieldsets.forEach((element) => {
    element.setAttribute('disabled', '');
  });
};

deactivateForm();

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  fieldsets.forEach((element) => {
    element.removeAttribute('disabled', '');
  });
};

const submitForm = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => showSuccessMessage(),
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
};

const resetForm = () => {
  filter.reset();
  form.reset();
  resetMap();
  setPrice();
  reInit(savedAdverts);
};

submitForm(resetForm);

const setFormReset = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });
};

setFormReset();

const setPrice = () => {
  const MIN_PRICE = Price[typeSelect.value.toUpperCase()];
  priceInput.setAttribute('placeholder', MIN_PRICE);
  priceInput.min = MIN_PRICE;
};

typeSelect.addEventListener('change', () => {
  setPrice();
});

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
      priceInput.setCustomValidity('Максимальная цена: ' + MAX_PRICE + ' рублей.');
    } else {
      priceInput.setCustomValidity('');
    }

    priceInput.reportValidity();
  });
};

validatePrice();

const validateGuestsInRoom = () => {
  const roomsValue = roomsSelect.value;
  const guestsValue = guestSelect.value;

  if (roomsValue === RoomCapacity.ONE && guestsValue !== QuestsCount.ONE) {
    guestSelect.setCustomValidity('для 1 гостя');
  } else if (roomsValue === RoomCapacity.TWO && (guestsValue === QuestsCount.THREE || guestsValue === QuestsCount.ZERO)) {
    guestSelect.setCustomValidity('для 1-2 гостей');
  } else if (roomsValue === RoomCapacity.THREE && guestsValue === QuestsCount.ZERO) {
    guestSelect.setCustomValidity('для 1-3 гостей');
  } else if (roomsValue === RoomCapacity.HUNDRED && guestsValue !== QuestsCount.ZERO) {
    guestSelect.setCustomValidity('не для гостей');
  } else {
    guestSelect.setCustomValidity('');
  }

  guestSelect.reportValidity();
};

const changeRoomsSelect = () => validateGuestsInRoom();
const changeGuestsSelect = () => validateGuestsInRoom();
roomsSelect.addEventListener('change', changeRoomsSelect);
guestSelect.addEventListener('change', changeGuestsSelect);

export {activateForm, resetForm, savedAdverts};

