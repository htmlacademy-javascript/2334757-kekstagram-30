import { createPictures } from './data.js';
import { renderGallery } from './gallery.js';
import { startForm } from './form.js';

renderGallery(createPictures());

startForm();
