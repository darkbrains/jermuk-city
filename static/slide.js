let currentImageIndex = 0;
const images = ['templates/hotels_en.html', '//static/hotels/armenia/arm20.jpg', '/static/hotels/armenia/arm21.jpg'];
const captions = ['Photo 1', 'Photo 2', 'Photo 3'];
function openLightbox(imageSrc, caption) {
    document.getElementById('lightboxImage').src = imageSrc;
    document.getElementById('lightboxCaption').innerHTML = caption;
    document.getElementById('lightbox').style.display = 'block';
    currentImageIndex = images.indexOf(imageSrc);
    updateLightboxButtons();
  }
  function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
  }
  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxContent();
  }
  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxContent();
  }
  function updateLightboxContent() {
    document.getElementById('lightboxImage').src = images[currentImageIndex];
    document.getElementById('lightboxCaption').innerHTML = captions[currentImageIndex];
    updateLightboxButtons();
  }
  function updateLightboxButtons() {
    document.querySelector('.prev-button').style.display = currentImageIndex === 0 ? 'none' : 'block';
    document.querySelector('.next-button').style.display = currentImageIndex === images.length - 1 ? 'none' : 'block';
  }
