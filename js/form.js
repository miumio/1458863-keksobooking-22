import {sendData} from './data.js';
import {createErrorMessage} from './util.js';
import {mapReset} from './map.js';

const forms = document.querySelector('.ad-form, map__filters');
const fieldset = forms.querySelectorAll('fieldset');

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

export {getOn};

