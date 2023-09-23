const images = document.querySelectorAll('.photo-item-hs img');
let currentImageIndex = 0;
function showNextImage() {
  images[currentImageIndex].style.animation = '';
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].style.animation = 'fade 10s infinite';
}
setInterval(showNextImage, 10000);
const headerTitle = document.getElementById('headerTitle');
function rotateHeaderTitle() {
  headerTitle.style.transform = `rotate(${Math.random() * 6 - 3}deg)`;
}
function openModal(imageSrc) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    currentPhotoIndex = allPhotos.findIndex(photo => photo.src === imageSrc);
    modalImage.src = imageSrc;
    modal.style.display = 'block';
    modalImageIndex = Array.from(images).findIndex(image => image.src === imageSrc);
    prevButton.onclick = () => changeModalImage(modalImageIndex - 1);
    nextButton.onclick = () => changeModalImage(modalImageIndex + 1);
  }
  let modalImageIndex = 0;
  function changeModalImage(offset) {
    modalImageIndex += offset;
    if (modalImageIndex < 0) {
      modalImageIndex = images.length - 1;
    } else if (modalImageIndex >= images.length) {
      modalImageIndex = 0;
    }
    const modalImage = document.getElementById('modalImage');
    modalImage.src = images[modalImageIndex].src;
  }
setInterval(rotateHeaderTitle, 1000);
function openModal(imageSrc) {
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');
  modalImage.src = imageSrc;
  modal.style.display = 'block';
}
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}