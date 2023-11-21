const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const ServerRoutes = {
  GET_DATA: '/data',
  POST_DATA: '/',
};

const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [HttpMethods.GET]: 'Не удалось загрузить данные. Попробуйте еще раз',
  [HttpMethods.POST]: 'Не удалось отправить данные формы',
};

const request = async (url, method = HttpMethods.GET, body = null) => {
  const response = await fetch(url, {method, body});
  if (!response.ok) {
    throw new Error(ErrorText[method]);
  }

  return response.json();
};

const loadPictures = async () => (
  request(SERVER_URL + ServerRoutes.GET_DATA)
);

const sendPicture = async (picturesData) => (
  request(
    SERVER_URL + ServerRoutes.POST_DATA,
    HttpMethods.POST,
    picturesData,
  )
);

export { loadPictures, sendPicture };
