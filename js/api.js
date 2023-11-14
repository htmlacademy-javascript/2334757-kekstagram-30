const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const SERVER_ROUTE = {
  GET_DATA: '/data',
  POST_DATA: '/',
};

const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
};

const ERROR_TEXT = {
  [HTTP_METHOD.GET]: 'Не удалось загрузить данные. Попробуйте еще раз',
  [HTTP_METHOD.POST]: 'Не удалось отправить данные формы',
};

const request = async (url, method = HTTP_METHOD.GET, body = null) => {
  const response = await fetch(url, {method, body});
  if (!response.ok) {
    throw new Error(ERROR_TEXT[method]);
  }

  return response.json();
};

const loadPictures = async () => (
  request(SERVER_URL + SERVER_ROUTE.GET_DATA)
);

const sendPicture = async (picturesData) => (
  request(
    SERVER_URL + SERVER_ROUTE.POST_DATA,
    HTTP_METHOD.POST,
    picturesData,
  )
);

export { loadPictures, sendPicture };
