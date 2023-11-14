const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [Effect.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effect.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effect.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [Effect.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [Effect.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOptions = {
  [Effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Effect.HEAT]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
};

const modalUpload = document.querySelector('.img-upload');
const imageUpload = modalUpload.querySelector('.img-upload__preview img');
const imageEffects = modalUpload.querySelector('.effects');
const slider = modalUpload.querySelector('.effect-level__slider');
const sliderContainer = modalUpload.querySelector('.img-upload__effect-level');
const imageEffectLevel = modalUpload.querySelector('.effect-level__value');

let chosenEffect = Effect.DEFAULT;

const isDefault = () => chosenEffect === Effect.DEFAULT;

const setImageStyle = () => {
  if (isDefault()) {
    imageUpload.style.filter = null;
    return;
  }

  const { value } = imageEffectLevel;
  const { style, unit} = effectToFilter[chosenEffect];
  imageUpload.style.filter = `${style}(${value}${unit})`;
};

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const onSliderUpdate = () => {
  imageEffectLevel.value = slider.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(slider, {
    range: { min,max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });
  slider.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = ({ min, max, step}) => {
  slider.noUiSlider.updateOptions({
    range: { min, max},
    step,
    start: max,
  });
};

const setSlider = () => {
  if (chosenEffect === Effect.DEFAULT) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOptions[chosenEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};

const reset = () => {
  setEffect(Effect.DEFAULT);
};

const onEffectChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  createSlider(effectToSliderOptions[chosenEffect]);
  imageEffects.addEventListener('change', onEffectChange);
};

export { init, reset };
