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
