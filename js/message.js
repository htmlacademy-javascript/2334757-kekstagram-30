import { isEscapeKey } from './util.js';

const successMessageTemplate = document.querySelector('#success')
  .content.querySelector('.success');

const errorMessageTemplate = document.querySelector('#error')
  .content.querySelector('.error');

const hideMessage = () => {
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  existElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

function onBodyClick (evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

const onCloseButtonClick = () => {
  hideMessage();
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

const showMessage = (element, classButton) => {
  document.body.append(element);
  const button = element.querySelector(classButton);
  button.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.addEventListener('click', onBodyClick);
};

const showSuccessMessage = () => {
  showMessage(successMessageTemplate, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageTemplate, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
