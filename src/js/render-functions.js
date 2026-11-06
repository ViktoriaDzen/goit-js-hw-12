import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a');
const loadMoreBtn = document.querySelector('.btn-load-more');

export function createGallery(images) {
  const markup = images
    .map(
      image => `
        <li class="gallery-item">
          <a class="gallery-link" href="${image.largeImageURL}">
            <img
              class="gallery-image"
              src="${image.webformatURL}"
              alt="${image.tags}"
            />
          </a>
          <div class="info">
            <p class="info-item"><b>Likes</b> ${image.likes}</p>
            <p class="info-item"><b>Views</b> ${image.views}</p>
            <p class="info-item"><b>Comments</b> ${image.comments}</p>
            <p class="info-item"><b>Downloads</b> ${image.downloads}</p>
          </div>
        </li>
      `
    )
    .join('');

  galleryList.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryList.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
