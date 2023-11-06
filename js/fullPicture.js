import { renderComments } from './comment.js';
import { isEscapeKey } from './util.js';

const fullPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closeButtonFullPictureElement = fullPictureElement.querySelector('.big-picture__cancel');

const hideFullPicture = () => {
  fullPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const oncloseButtonFullPictureElementClick = () => {
  hideFullPicture();
};

function onDocumentKeydown (evt) {
  if (isEscapeKey) {
    evt.preventDefault();
    hideFullPicture();
  }
}

const renderPicture = ({ url, description, likes }) => {
  fullPictureElement.querySelector('.big-picture__img img').src = url;
  fullPictureElement.querySelector('.big-picture__img img').alt = description;
  fullPictureElement.querySelector('.likes-count').textContent = likes;
  fullPictureElement.querySelector('.social__caption').textContent = description;
};

const showFullPicture = (pictureData) => {
  fullPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);

  renderComments(pictureData.comments);
  renderPicture(pictureData);
};

closeButtonFullPictureElement.addEventListener('click', (oncloseButtonFullPictureElementClick));

export { showFullPicture };
