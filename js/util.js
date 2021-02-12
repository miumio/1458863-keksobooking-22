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
shuffle();

export {getRandomNumber, getRandomCoordinates, shuffle};
