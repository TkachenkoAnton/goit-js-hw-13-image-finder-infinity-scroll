import apiService from './apiService';
import refs from './refs';
import { updatePhotoMarkup, clearUl } from './markup';
import { success, info, error } from './pnotify.js';

async function dataFromServer() {
  await apiService
    .axiosPixabayApi()
    .then(fullObj => {
      updatePhotoMarkup(fullObj);

      observer.observe(refs.gallery.lastElementChild);
    })
    .catch(axiosError => {
      refs.loadMoreBtn.classList.add('is-hiden');
      error({
        title: 'Sorry',
        text: axiosError,
      });
    });
}

const options = {
  rootMargin: '-10px',
};

const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      dataFromServer();
      observer.unobserve(refs.gallery.lastElementChild);
      info({
        text: 'More cute pictures uploaded!',
      });
    }
  });
};

const observer = new IntersectionObserver(callback, options);

function render(e) {
  e.preventDefault();
  if (apiService.query === '') {
    refs.loadMoreBtn.classList.add('is-hiden');
    return;
  }
  if (e.type === 'submit') {
    success({
      title: 'Success!',
      text: 'Look! Cute pictures uploaded!',
    });
  }

  dataFromServer();
}

function submitRender(e) {
  apiService.resetPage();

  clearUl();

  apiService.query = e.currentTarget.elements.query.value;

  render(e);
}

refs.searchForm.addEventListener('submit', e => {
  submitRender(e);
});
