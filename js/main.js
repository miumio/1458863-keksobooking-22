'use strict';

const getRandomNumber = function (min, max) {
  if (min < 0 || min > max) {
    alert('Неправильный ввод данных');
  }

  return Math.floor(Math.random() * (max - min)) + min;
}

getRandomNumber();

const getRandomCoordinates = function (x, y, digits) {
  let number = Math.random() * (y - x) + x;
  if (x === y || x > y) {
    alert('Неправильный ввод данных');
  }

  return number.toFixed(digits);
}

getRandomCoordinates();
