import { renderGallery } from './gallery';
import { debounce } from './util';

const imageFilters = document.querySelector('.img-filters');

const filterForm = document.querySelector('.img-filters__form');
const defaultButton = filterForm.querySelector('#filter-default');
const randomButton = filterForm.querySelector('#filter-random');
const discussedButton = filterForm.querySelector('#filter-discussed');

const Filters = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const MAX_RANDOM_FILTER = 10;

const getRandomIndex = (min, max) => (
  Math.floor(Math.random() * (max - min))
);

// Изменение фильтров.
const filterHandlers = {
  [Filters.DEFAULT]: (pictures) => (
    pictures
  ),
  [Filters.RANDOM]: (pictures) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, pictures.length);
    while(randomIndexList.length < max) {
      const index = getRandomIndex(0, pictures.length);
      if(!randomIndexList.includes(index)){
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => pictures[index]);
  },
  [Filters.DISCUSSED]: (pictures) => (
    [...pictures].sort((item1, item2) => (
      item2.comments.length - item1.comments.length
    ))
  ),
};

const repaint = (evt, filter, pictures) => {
  const filteredPictures = filterHandlers[filter](pictures);
  const picture = document.querySelectorAll('.picture');
  picture.forEach((item) => item.remove());
  renderGallery(filteredPictures);
  const activeFilter = filterForm.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const debouncedRepaint = debounce(repaint);

const onFilterButtonClick = (evt) => {
  const filtersButton = filterForm.querySelectorAll('.img-filters__button');
  filtersButton.forEach((item) => {
    item.classList.remove('img-filters__button--active');
  });
  if (evt.target.matches('.img-filters__button')) {
    evt.target.classList.add('img-filters__button--active');
  }
};


// Показ фильтра при загрузке данных с сервера.
const initFilter = (pictures) => {
  imageFilters.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', onFilterButtonClick);

  defaultButton.addEventListener('click', (evt) => {
    debouncedRepaint(evt, Filters.DEFAULT, pictures);
  });
  randomButton.addEventListener('click', (evt) => {
    debouncedRepaint(evt, Filters.RANDOM, pictures);
  });
  discussedButton.addEventListener('click', (evt) => {
    debouncedRepaint(evt, Filters.DISCUSSED, pictures);
  });
};

export { initFilter };
