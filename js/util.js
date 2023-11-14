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

export { ShowErrorMessage };
