const URL = 'https://22.javascript.pages.academy/keksobooking/data';

const getData = (onSucces) => {
  fetch(URL)
  .then((response) => response.json())
  .then((objects) => {
    onSucces(objects);
  })
  .catch(() => {  });
};

export {getData};
