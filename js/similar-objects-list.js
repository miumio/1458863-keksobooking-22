const similarObjectTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const getTextInRooms = (number) => {
  let string = ' комнат';

  switch (number) {
    case 1:
      string = 'комната';
      break;
    case 2:
    case 3:
    case 4:
      string = 'комнаты';
      break;
  }
  return string;
}

const getRussianTypesOfObject = (value) => {
  switch (value) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
}

const getTextInGuests = (number) => number === 1 ? 'гостя' : 'гостей';

const getObject = (object) => {
  const objectElement = similarObjectTemplate.cloneNode(true);

  objectElement.querySelector('.popup__title').textContent = object.offer.title;
  objectElement.querySelector('.popup__text--address').textContent = object.offer.address;
  objectElement.querySelector('.popup__text--price').textContent = `${object.offer.price}  ₽/ночь`;
  objectElement.querySelector('.popup__type').textContent = getRussianTypesOfObject(object.offer.type);
  objectElement.querySelector('.popup__text--capacity').textContent = `${object.offer.rooms} ${getTextInRooms(object.offer.rooms)} для ${object.offer.guests} ${getTextInGuests(object.offer.guests)}`;
  objectElement.querySelector('.popup__text--time').textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
  objectElement.querySelector('.popup__features').innerHTML = '';
  objectElement.querySelector('.popup__features').insertAdjacentHTML('beforeend', object.offer.features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`).join(' '));
  objectElement.querySelector('.popup__description').textContent = object.offer.description;
  objectElement.querySelector('.popup__photos').innerHTML = '';
  objectElement.querySelector('.popup__photos').insertAdjacentHTML('beforeend', object.offer.photos.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>`).join(' '));
  objectElement.querySelector('.popup__avatar').src = object.author.avatar;

  return objectElement;
}

// const Default = {
//   type: 'Квартира',
//   price: '10000 - 50000₽',
//   rooms: '2',
// };

// const getObjectRank = (data) => {
//   const typeSelect = document.querySelector('#housing-type');
//   const priceSelect = document.querySelector('#housing-price');
//   const roomsSelect = document.querySelector('#housing-rooms');

//   let rank = 0;

//   if (data.offer.type === (typeSelect.value || Default.type)) {
//     rank += 3;
//   }

//   if (data.offer.price === (priceSelect.value || Default.price)) {
//     rank +=2;
//   }

//   if (data.offer.rooms === (roomsSelect.value || Default.rooms)) {
//     rank +=1;
//   }

//   return rank;
// };

// const sortObjects = (objectA, objectB) => {
//   const rankA = getObjectRank(objectA);
//   const rankB = getObjectRank(objectB);

//   return rankB - rankA;
// };

export {getObject};
