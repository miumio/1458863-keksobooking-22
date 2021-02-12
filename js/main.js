'use strict';

const getRandomNumber = function (min, max) {
  if (min < 0 || min > max) {
    return -1;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber(1, 11);

const getRandomCoordinates = function (x, y, digits) {
  if (x >= y) {
    return -1;
  }

  return (Math.random() * (y - x) + x).toFixed(digits);
}

getRandomCoordinates(1, 100, 2);

const TYPES_OF_OBJECT = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECK_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const OBJECT_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const OBJECT_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const getRandomArrayElement = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

const shuffle = (arr) => {
  let temp;
  for (let i = arr.length - 1; i > 0; i--) {
    let k = Math.floor(Math.random() * (i + 1));
    temp = arr[k];
    arr[k] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

const getNotRepeatItem = (arr) => {
  const randomNumber = getRandomNumber(0, arr.length - 1);
  const newArray = arr.slice(0, randomNumber);
  shuffle(newArray);
  return newArray;
};

const createObject = () => {
  const locationX = getRandomCoordinates(35.65000, 35.70000, 5);
  const locationY = getRandomCoordinates(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png',
    },
    offer: {
      title: 'строка — заголовок предложения',
      address: 'x: ' + locationX  + ', y: ' + locationY,
      price: getRandomNumber(0, 1000000000),
      type: getRandomArrayElement(TYPES_OF_OBJECT),
      rooms: getRandomNumber(0, 100),
      guests: getRandomNumber(0, 100),
      checkin: getRandomArrayElement(CHECK_TIMES),
      checkout: getRandomArrayElement(CHECK_TIMES),
      features: getNotRepeatItem(OBJECT_FEATURES),
      description: 'строка — описание помещения',
      photos: getNotRepeatItem(OBJECT_PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
};

const createObjectList = new Array(10).fill(null).map(() => createObject());
createObjectList;
// console.log(createObjectList);
