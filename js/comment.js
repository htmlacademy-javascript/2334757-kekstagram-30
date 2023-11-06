const commentTemplate = document.querySelector('#comment')
  .content.querySelector('.social__comment');
const commentList = document.querySelector('.social__comments');


const createComment = ({avatar, name, message}) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};


const renderComments = (comments) => {
  commentList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  commentList.append(fragment);
};

export { renderComments };
