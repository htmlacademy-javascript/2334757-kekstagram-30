const fullPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const closeButtonFullPicture = fullPicture.querySelector('.big-picture__cancel');

const COMMENTS_COUNT_SHOW = 5;
const commentTemplate = document.querySelector('#comment')
  .content.querySelector('.social__comment');
const commentList = document.querySelector('.social__comments');

const commentCount = document.querySelector('.social__comment-shown-count');
const totalCommentCount = document.querySelector('.social__comment-total-count');
const commentsLoader = document.querySelector('.comments-loader');

let commentsCountShow = 0;
let comments = [];

// Комментарии
const createComment = ({avatar, name, message}) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};


const renderComments = () => {
  commentsCountShow += COMMENTS_COUNT_SHOW;

  if(commentsCountShow >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsCountShow = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsCountShow; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);

  commentCount.textContent = commentsCountShow;
  totalCommentCount.textContent = comments.length;
};

const onCommentsLoaderClick = () => renderComments();

// Создание полноэкранного изображения
const renderPicture = ({ url, description, likes }) => {
  fullPicture.querySelector('.big-picture__img img').src = url;
  fullPicture.querySelector('.big-picture__img img').alt = description;
  fullPicture.querySelector('.likes-count').textContent = likes;
  fullPicture.querySelector('.social__caption').textContent = description;
};

const showFullPicture = (pictureData) => {
  fullPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);

  comments = pictureData.comments;
  if (comments.length > 0) {
    renderComments();
  }

  renderPicture(pictureData);
};

// Закрытие полноэкранного изображения
const hideFullPicture = () => {
  commentsCountShow = 0;
  fullPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const oncloseButtonFullPictureClick = () => {
  hideFullPicture();
};

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideFullPicture();
  }
}

closeButtonFullPicture.addEventListener('click', (oncloseButtonFullPictureClick));
commentsLoader.addEventListener('click', (onCommentsLoaderClick));

export { showFullPicture };
