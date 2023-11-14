import { renderGallery } from './gallery.js';
import { loadPictures } from './api.js';
import { ShowErrorMessage } from './util.js';
import './form.js';


const bootstrap = async () => {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
  } catch (error) {
    ShowErrorMessage();
  }
};

bootstrap();
