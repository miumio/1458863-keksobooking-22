import {createErrorMessage} from './util.js';

const URL_GET = 'https://22.javascript.pages.academy/keksobooking/data';
const URL_SEND = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSucces) => {
  fetch(URL_GET)
    .then((response) => response.json())
    .then((objects) => {
      onSucces(objects);
    })
    .catch(() => {createErrorMessage('connection error')});
};

const sendData = (onSuccess, onFail, body) => {
  fetch(URL_SEND,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
