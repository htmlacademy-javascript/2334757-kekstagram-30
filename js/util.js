const REMOVE_MESSAGE_TIMEOUT = 5000;

const ErrorMessageTemplate = document.querySelector('#data-error')
  .content.querySelector('.data-error');

const ShowErrorMessage = () => {
  const errorElement = ErrorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { ShowErrorMessage, debounce };
