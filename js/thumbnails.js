import {createPictures} from './data.js';

const container = document.querySelector('.pictures');
const thumbnailsTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnails = createPictures();

const thumbnailsFragment = document.createDocumentFragment();

createThumbnails.forEach(({url, description, likes, comments}) => {
  const thumbnailsElement = thumbnailsTemplate.cloneNode(true);
  thumbnailsElement.querySelector('.picture__img').src = url;
  thumbnailsElement.querySelector('.picture__img').alt = description;
  thumbnailsElement.querySelector('.picture__likes').textContent = likes;
  thumbnailsElement.querySelector('.picture__comments').textContent = comments.length;
  thumbnailsFragment.appendChild(thumbnailsElement);
});

container.appendChild(thumbnailsFragment);

