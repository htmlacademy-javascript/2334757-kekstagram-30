const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимальное количество хэштегов: ${MAX_HASHTAG_COUNT}`,
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
  INVALID_HASHTAG: 'Неправильный хэштег',
};

const inputUpload = document.querySelector('.img-upload__input');
const modalUpload = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButtonModalUpload = document.querySelector('.img-upload__cancel');

const uploadForm = document.querySelector('.img-upload__form');
const inputHashtag = document.querySelector('.text__hashtags');
const inputComment = document.querySelector('.text__description');

// Валидация
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const normilizeHashtag = (string) => string
  .trim()
  .split(' ')
  .filter((hashtag) => Boolean(hashtag.length));

const hasValidHashtag = (value) => normilizeHashtag(value).every((hashtag) => VALID_SYMBOLS.test(hashtag));

const hasValidCount = (value) => normilizeHashtag(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueHashtag = (value) => {
  const lowerCaseHashtag = normilizeHashtag(value).map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtag.length === new Set(lowerCaseHashtag).size;
};

pristine.addValidator(
  inputHashtag,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);

pristine.addValidator(
  inputHashtag,
  hasUniqueHashtag,
  ErrorText.NOT_UNIQUE,
  2,
  true
);

pristine.addValidator(
  inputHashtag,
  hasValidHashtag,
  ErrorText.INVALID_HASHTAG,
  1,
  true
);

// Открытие и закрытие модального окна
const openModalUpload = () => {
  modalUpload.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModalUpload = () => {
  uploadForm.reset();
  pristine.reset();

  modalUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isInputFocused = () =>
  document.activeElement === inputUpload ||
  document.activeElement === inputComment;


function onDocumentKeydown (evt) {
  if (evt.key === 'Escape' && !isInputFocused()) {
    evt.preventDefault();
    hideModalUpload();
  }
}

const closeButtonModalUploadClick = () => {
  hideModalUpload();
};

const inputUploadChange = () => {
  openModalUpload();
};

const onuploadFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

inputUpload.addEventListener('change', (inputUploadChange));
closeButtonModalUpload.addEventListener('click', (closeButtonModalUploadClick));
uploadForm.addEventListener('submit', (onuploadFormSubmit));
