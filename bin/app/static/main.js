const images = document.querySelectorAll('.photo-item img');
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
function openModal(imageSrc) {
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  modalImage.src = imageSrc;
  modal.style.display = 'block';
  modalImageIndex = Array.from(images).findIndex(image => image.src === imageSrc);
  prevButton.onclick = () => changeModalImage(-1);
  nextButton.onclick = () => changeModalImage(1);
  if (imageSrc.includes('jermuk-hotel-spa') || imageSrc.includes('resort') || imageSrc.includes('armenia')) {
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
  } else {
    prevButton.style.display = 'block';
    nextButton.style.display = 'block';
  }
}
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
setInterval(rotateHeaderTitle, 1000);
const birdsContainer = document.querySelector('.birds');
function createBird() {
    const bird = document.createElement('div');
    bird.classList.add('bird');
    bird.style.left = Math.random() * 100 + 'vw';
    bird.style.top = Math.random() * 100 + 'vh';
    bird.style.animationDuration = Math.random() * 2 + 3 + 's';
    bird.innerText = '🕊️';
    birdsContainer.appendChild(bird);
    setTimeout(() => {
        bird.remove();
    }, 5000);
}
setInterval(createBird, 3000);
const leavesContainer = document.querySelector('.leaves');
function createLeaf() {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.top = Math.random() * 100 + 'vh';
    leaf.style.animationDuration = Math.random() * 2 + 3 + 's';
    leaf.innerText = '🌿';
    leavesContainer.appendChild(leaf);
    setTimeout(() => {
        leaf.remove();
    }, 5000);
}
setInterval(createLeaf, 3000); 
function showLanguageOptions() {
document.querySelector('.language-options').style.display = 'block';
}
function hideLanguageOptions() {
    document.querySelector('.language-options').style.display = 'none';
}
function changeLanguage(lang) {
    console.log(`Selected language: ${lang}`);
    document.querySelector('.language-options').style.display = 'none';
}
function changeLanguage(language) {
    var url;
    if (language === 'ARM') {
        url = '/am';
    } else if (language === 'RUS') {
        url = '/ru';
    } else if (language === 'ENG') {
        url = '/en';
    }
    window.location.href = url;
} 
