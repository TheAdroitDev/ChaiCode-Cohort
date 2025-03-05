/**
 * Write your challenge solution here
 */
// Image data
const images = [
  {
    url: 'https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Beautiful Mountain Landscape',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Ocean Sunset View',
  },
  {
    url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Autumn Forest Path',
  },
  {
    url: 'https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Urban City Skyline',
  },
];

const carouselTrack = document.getElementById('carouselTrack');
const caption = document.getElementById('caption');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const carouselNav = document.getElementById('carouselNav');
const autoPlayButton = document.getElementById('autoPlayButton');
const timerDisplay = document.getElementById('timerDisplay');

let activeIndex = 0;
let autoPlayInterval;
let timeLeft = 3000;

// create slides
function populateCarousel() {
  images.forEach((image, index) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
    slide.style.backgroundImage = `url(${image.url})`;
    carouselTrack.appendChild(slide);

    // Create indicators or navigation dots
    const indicator = document.createElement('div');
    indicator.classList.add('carousel-indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => moveToSlide(index));
    carouselNav.appendChild(indicator);
  });
  updateCaption();
}

function updateCaption() {
  caption.textContent = images[activeIndex].caption;
}

// Move to a specific slide
function moveToSlide(index) {
  activeIndex = index;
  carouselTrack.style.transform = `translateX(-${activeIndex * 100}%)`;
  updateCaption();
  updateIndicators();
}

// Move to next slide
function nextSlide() {
  activeIndex = (activeIndex + 1) % images.length;
  moveToSlide(activeIndex);
}

// Move to previous slide
function prevSlide() {
  activeIndex = (activeIndex - 1 + images.length) % images.length;
  moveToSlide(activeIndex);
}

// Update active indicator
function updateIndicators() {
  document.querySelectorAll('.carousel-indicator').forEach((dot, index) => {
    dot.classList.toggle('active', index === activeIndex);
  });
}

// Auto-play functionality
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, timeLeft);
  autoPlayButton.textContent = 'Stop Auto Play';
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlayButton.textContent = 'Start Auto Play';
}

// Toggle auto-play
autoPlayButton.addEventListener('click', () => {
  if (autoPlayInterval) {
    stopAutoPlay();
    autoPlayInterval = null;
  } else {
    startAutoPlay();
  }
});

// Pause auto-play on hover
carouselTrack.addEventListener('mouseenter', stopAutoPlay);
carouselTrack.addEventListener('mouseleave', startAutoPlay);

// Event Listeners
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Initialize the carousel
populateCarousel();

