const Effects = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const EffectsToFilter = {
  [Effects.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effects.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effects.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [Effects.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [Effects.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const EffectsToSliderOptions = {
  [Effects.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effects.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effects.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [Effects.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [Effects.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [Effects.HEAT]: {
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

let chosenEffect = Effects.DEFAULT;

const isDefault = () => chosenEffect === Effects.DEFAULT;

const setImageStyle = () => {
  if (isDefault()) {
    imageUpload.style.filter = null;
    return;
  }

  const { value } = imageEffectLevel;
  const { style, unit} = EffectsToFilter[chosenEffect];
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
  if (chosenEffect === Effects.DEFAULT) {
    hideSlider();
  } else {
    updateSlider(EffectsToSliderOptions[chosenEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};

const reset = () => {
  setEffect(Effects.DEFAULT);
};

const onEffectChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  createSlider(EffectsToSliderOptions[chosenEffect]);
  imageEffects.addEventListener('change', onEffectChange);
};

export { init, reset };
