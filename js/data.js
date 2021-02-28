import {getRandomNumber, getRandomCoordinates, getRandomArrayElement, getNotRepeatItem} from './util.js';

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
      price: getRandomNumber(0, 100000),
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

const QUANTITY_OBJECT = 10;

const createObjectsList = () => new Array(QUANTITY_OBJECT).fill(null).map(() => createObject());

export {createObjectsList};
