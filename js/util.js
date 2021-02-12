const getRandomNumber = function (min, max) {
  if (min < 0 || min > max) {
    return -1;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomCoordinates = function (x, y, digits) {
  if (x >= y) {
    return -1;
  }

  return (Math.random() * (y - x) + x).toFixed(digits);
}

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

export {getRandomNumber, getRandomCoordinates, shuffle, getRandomArrayElement, getNotRepeatItem};
