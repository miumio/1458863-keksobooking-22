'use strict';

const getRandomNumber = function (min, max) {
  if (min < 0 || min > max) {
    alert('Неправильный ввод данных');
    return -1;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber(1, 11);

const getRandomCoordinates = function (x, y, digits) {
  if (x >= y) {
    alert('Неправильный ввод данных');
    return -1;
  }

  return (Math.random() * (y - x) + x).toFixed(digits);
}

getRandomCoordinates(1, 100, 2);

const typeOfObject = [
  'palace',
  'flat',
  'house',
  'bungalow',
]

let checkTime = String(getRandomNumber(12, 14)) + ':00';

let objectFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

let objectPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const getNotRepeatItem = (arr) => {
  return arr.slice(0, getRandomNumber(0, arr.length - 1));
};

const createObject = () => {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png',
    },
    offer: {
      title: 'строка — заголовок предложения',
      address: 'x: ' + getRandomCoordinates(35.65000, 35.70000, 5)  + ' y: ' + getRandomCoordinates(139.70000, 139.80000, 5),
      price: getRandomNumber(0, 1000000000),
      type: getRandomArrayElement(typeOfObject),
      rooms: getRandomNumber(0, 100),
      guests: getRandomNumber(0, 100),
      checkin: checkTime,
      checkout: checkTime,
      features: getNotRepeatItem(objectFeatures),
      description: 'строка — описание помещения',
      photos: getRandomArrayElement(objectPhotos),
    },
    location: {
      x: getRandomCoordinates(35.65000, 35.70000, 5),
      y: getRandomCoordinates(139.70000, 139.80000, 5),
    },
  };
};

const createObjectList = new Array(10).fill(null).map(() => createObject());
createObjectList;
