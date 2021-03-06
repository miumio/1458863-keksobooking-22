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
// const sendData = (formData) => {
//   fetch(URL_SEND,
//     {
//       method: 'POST',
//       body: formData,
//       credentials: 'same-origin',
//     })
//     .then((response) => {
//       console.log(response.status);
//       console.log(response.ok);
//       return response.json();
//     })
//     .then((json) => {
//       console.log('Результат', json);
//     })
//     .catch((err) => {
//       console.error(err);
//     })};


export {getData, sendData};
// export {getData};
