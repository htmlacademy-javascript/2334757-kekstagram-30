const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const modalScale = document.querySelector('.img-upload');
const scaleInput = modalScale.querySelector('.scale__control--value');
const image = modalScale.querySelector('.img-upload__preview img');
const smallerButton = modalScale.querySelector('.scale__control--smaller');
const biggerButton = modalScale.querySelector('.scale__control--bigger');

const scaleImage = (value) => {
  image.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  scaleImage(
    Math.max(parseInt(scaleInput.value, 10) - SCALE_STEP, MIN_SCALE)
  );
};

const onBiggerButtonClick = () => {
  scaleImage(
    Math.min(parseInt(scaleInput.value, 10) + SCALE_STEP, MAX_SCALE)
  );
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

smallerButton.addEventListener('click', (onSmallerButtonClick));
biggerButton.addEventListener('click',(onBiggerButtonClick));

export { resetScale };
