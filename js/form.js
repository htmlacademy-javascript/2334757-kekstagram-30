import { init as initEffect, reset as resetEffect } from './effect.js';
import { resetScale } from './scale.js';
import { sendPicture } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимальное количество хэштегов: ${MAX_HASHTAG_COUNT}`,
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
  INVALID_HASHTAG: 'Неправильный хэштег',
};

const SUBMIT_BUTTON_CAPTION = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Опубликовать',
};

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const inputHashtag = uploadForm.querySelector('.text__hashtags');
const inputComment = uploadForm.querySelector('.text__description');
const inputUpload = uploadForm.querySelector('.img-upload__input');
const modalUpload = uploadForm.querySelector('.img-upload__overlay');
const closeButtonModalUpload = uploadForm.querySelector('.img-upload__cancel');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const photoPreview = uploadForm.querySelector('.img-upload__default');
const effectsPreview = uploadForm.querySelectorAll('.effects__preview ');

// Валидация
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
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

  resetEffect();
  resetScale();
};

const isInputFocused = () =>
  document.activeElement === inputHashtag ||
  document.activeElement === inputComment;

const isRrrorMessageExist = () => (
  Boolean(document.querySelector('.error'))
);

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape' && !isInputFocused() && !isRrrorMessageExist()) {
    evt.preventDefault();
    hideModalUpload();
  }
}

const closeButtonModalUploadClick = () => {
  hideModalUpload();
};

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const onInputUploadChange = () => {
  const file = inputUpload.files[0];

  if (file && isValidType(file)) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreview.src}')`;
    });
  }
  openModalUpload();
};

// Отправка данных на сервер
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SUBMIT_BUTTON_CAPTION.SUBMITTING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SUBMIT_BUTTON_CAPTION.IDLE;
};

const sendForm = async (formElement) => {
  if (!pristine.validate()) {
    return;
  }

  try {
    blockSubmitButton();
    await sendPicture(new FormData(formElement));
    unblockSubmitButton();
    hideModalUpload();
    showSuccessMessage();
  } catch {
    unblockSubmitButton();
    showErrorMessage();
  }
};

const onUploadFormSubmit = async (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

const startForm = () => {
  inputUpload.addEventListener('change', (onInputUploadChange));
  closeButtonModalUpload.addEventListener('click', (closeButtonModalUploadClick));
  uploadForm.addEventListener('submit', (onUploadFormSubmit));
  initEffect();
};

startForm();
