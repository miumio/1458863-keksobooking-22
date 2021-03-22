import {resetForm} from './form.js'

const SHOW_TIME = 3000;

const main = document.querySelector('main');
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const getAlert = (message) => {
  const popup = document.createElement('div');

  popup.textContent = message;
  popup.classList.add('error__getdata');

  main.appendChild(popup);

  setTimeout (() => {
    popup.remove();
  }, SHOW_TIME)
};

const showPopup = (template) => {
  const popup = template.cloneNode(true);
  popup.style.zIndex = '1000000';

  main.appendChild(popup);

  closePopup(popup);
};

const closePopup = (message) => {

  document.addEventListener('click', () => {
    message.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      message.remove();
    }
  });
};

const showSuccessMessage = () => {
  showPopup(successTemplate);
  resetForm();
};

const showErrorMessage = () => {
  showPopup(errorTemplate);
};

export {getAlert, showSuccessMessage, showErrorMessage}
