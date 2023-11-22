const REMOVE_MESSAGE_TIMEOUT = 5000;

const ErrorMessageTemplate = document.querySelector('#data-error')
  .content.querySelector('.data-error');

const isEscapeKey = (evt) => evt.key === 'Escape';

const showErrorMessage = () => {
  const errorElement = ErrorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showErrorMessage, debounce };
