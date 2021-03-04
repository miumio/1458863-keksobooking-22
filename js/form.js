const forms = document.querySelector('.ad-form, map__filters');
const fieldset = forms.querySelectorAll('fieldset');

const getOff = () => {
  forms.classList.add('ad-form--disabled');
  fieldset.forEach((element) => {
    element.setAttribute('disabled', '');
  });
};

getOff();

const getOn = () => {
  forms.classList.remove('ad-form--disabled');
  fieldset.forEach((element) => {
    element.removeAttribute('disabled', '');
});
};

export {getOn};

