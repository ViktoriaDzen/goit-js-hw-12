import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
let searchQuery = '';
let page = 1;
const loadMoreBtn = document.querySelector('.btn-load-more');

const toastOptions = {
  position: 'topRight',
  backgroundColor: '#ef4040',
  messageColor: '#fff',
  iconColor: '#fff',
  titleColor: '#fff',
  progressBarColor: '#b51b1b',
  maxWidth: 432,
};

function scrollGallery() {
  const card = document.querySelector('.gallery-item');
  const cardHeight = card.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    return;
  }

  searchQuery = query;
  clearGallery();
  hideLoadMoreButton();
  page = 1;
  loadImages();
}

async function loadImages() {
  showLoader();
  hideLoadMoreButton();
  try {
    const data = await getImagesByQuery(searchQuery, page);
    if (data.hits.length === 0) {
      iziToast.error({
        ...toastOptions,
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    createGallery(data.hits);

    if (page > 1) {
      scrollGallery();
    }

    const totalPages = Math.ceil(data.totalHits / 15);
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.error({
        ...toastOptions,
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      ...toastOptions,
      message: 'Something went wrong. Please try again later!',
    });
    if (page > 1) {
      page -= 1;
      showLoadMoreButton();
    }
  } finally {
    hideLoader();
  }
}

function handleLoadMore() {
  page += 1;
  loadImages();
}

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);
