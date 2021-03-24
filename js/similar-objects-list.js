const PHOTO_WIDTH = 45;

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
  const objectFragment = document.createDocumentFragment();

  const objectElement = similarObjectTemplate.cloneNode(true);

  objectElement.querySelector('.popup__title').textContent = object.offer.title;
  objectElement.querySelector('.popup__text--address').textContent = object.offer.address;
  objectElement.querySelector('.popup__text--price').textContent = `${object.offer.price}  ₽/ночь`;
  objectElement.querySelector('.popup__type').textContent = ObjectsType[object.offer.type.toUpperCase()];
  objectElement.querySelector('.popup__text--capacity').textContent = `${object.offer.rooms} ${getTextInRooms(object.offer.rooms)} для ${object.offer.guests} ${getTextInGuests(object.offer.guests)}`;
  objectElement.querySelector('.popup__text--time').textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;

  const objectElementFeatures = objectElement.querySelector('.popup__features');
  objectElementFeatures.innerHTML = '';
  object.offer.features.forEach((element) => {
    const container = document.createElement('li');
    const featureClass = `popup__feature--${element}`;
    container.classList.add('popup__feature');
    container.classList.add(featureClass);
    objectElementFeatures.appendChild(container);
  });

  objectElement.querySelector('.popup__description').textContent = object.offer.description;

  const objectPhotos = objectElement.querySelector('.popup__photos');
  objectPhotos.innerHTML = '';
  object.offer.photos.forEach((src) => {
    const photo = document.createElement('img');
    photo.src = src;
    photo.classList.add('popup__photo');
    photo.width = PHOTO_WIDTH;
    objectPhotos.appendChild(photo);
  });

  objectElement.querySelector('.popup__avatar').src = object.author.avatar;

  objectFragment.appendChild(objectElement);

  return objectFragment;
};

export {getObject};
