import {getRandomInteger} from './util.js';
import {getRandomArrayElement} from './util.js';
import {createIdGenerator} from './util.js';

const PICTURE_COUNT = 25;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENTS_COUNT = 20;
const AVATAR_COUNT = 6;
const DESCRIPTION = [
  'Не откладывай на завтра, откладывай сразу навсегда.',
  'Моя речь бывает блестящей, а бывает и с матовым покрытием.',
  'Скажите: откуда в шкафу берутся вещи, которые мне не нравятся?',
  'В доме, где есть котлетки, всегда уютно.',
  'Каждый человек ближе к 30-ти годам подсознательно готов к конфликту в супермаркете.',
  'А вот если бы ты родила в 16-ть, твой ребенок мог бы уже обеспечивать всю семью, танцуя в Тик-Токе.',
  'Я назову собаку именем твоим…',
  'Спорт нужен только для того, чтобы хорошо выглядеть голым.',
  'Если бы я знал, что когда вырасту все будет именно так, я бы намочил в детстве Манту.',
];
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAME = [
  'Петя',
  'Вася',
  'Коля',
  'Ваня',
  'Саша',
  'Сережа'
];

const generateCommentId = createIdGenerator();

const createMessage = () => Array.from (
  { length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(MESSAGE),
).join('');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAME),
});

const generatePhotoId = createIdGenerator();

const createPicture = (index) => ({
  id: generatePhotoId(),
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from(
    { length: getRandomInteger(0, COMMENTS_COUNT) },
    createComment,
  )
});

const createPictures = () => Array.from (
  { length: PICTURE_COUNT },
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);

export {createPictures};
