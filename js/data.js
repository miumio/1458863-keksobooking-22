const URL = 'https://22.javascript.pages.academy/keksobooking/data';

const createErrorMessage = () => {
  const popup = document.createElement('div');

  popup.textContent = '!WARNING! conection error';
  popup.classList.add('error__getdata');

  document.body.appendChild(popup);

  setTimeout (() => {
    popup.remove();
  }, 3000)
};

const getData = (onSucces) => {
  fetch(URL)
  .then((response) => response.json())
  .then((objects) => {
    onSucces(objects);
  })
  .catch(() => {createErrorMessage()});
};


export {getData};
