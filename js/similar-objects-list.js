const RoomsWords = {
  MANY: 'комнат',
  ONE: 'комната',
  FOUR: 'комнаты',
}

const ObjectsType = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
}

const similarObjectTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const getTextInRooms = (number) => {
  let string = RoomsWords.MANY;

  switch (number) {
    case 1:
      string = RoomsWords.ONE;
      break;
    case 2:
    case 3:
    case 4:
      string = RoomsWords.FOUR;
      break;
  }
  return string;
}

const getTextInGuests = (number) => number === 1 ? 'гостя' : 'гостей';

const getObject = (object) => {
  const objectElement = similarObjectTemplate.cloneNode(true);

  objectElement.querySelector('.popup__title').textContent = object.offer.title;
  objectElement.querySelector('.popup__text--address').textContent = object.offer.address;
  objectElement.querySelector('.popup__text--price').textContent = `${object.offer.price}  ₽/ночь`;
  objectElement.querySelector('.popup__type').textContent = ObjectsType[object.offer.type.toUpperCase()];
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

export {getObject};
