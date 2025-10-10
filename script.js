// Carousel Script
const track = document.getElementById('carousel-track');
const slides = Array.from(track.children);
const dots = document.querySelectorAll('.dot');
let currentSlide = 1; // Start from the second slide to avoid initial clone issues

// Clone the first and last slides for infinite loop effect
const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides[slides.length - 1].cloneNode(true);

// Append the clones to the track
track.appendChild(firstSlide); // Add clone of the first slide at the end
track.insertBefore(lastSlide, slides[0]); // Add clone of the last slide at the beginning

// Update the slide array with the cloned slides
const updatedSlides = Array.from(track.children);
const totalSlides = updatedSlides.length;

// Function to show the slide based on current index
function showSlide(index) {
  const slideWidth = updatedSlides[0].getBoundingClientRect().width;
  track.style.transition = "transform 0.4s ease"; // Smooth transition for each move
  track.style.transform = `translateX(-${slideWidth * index}px)`; // Move the carousel
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index)); // Update dots
  currentSlide = index;
}

// Function to move the carousel slide in either direction (next or previous)
function moveSlide(direction) {
  currentSlide += direction;

  if (currentSlide <= 0) {
    // If we're at the first slide, jump to the last slide (second-to-last slide)
    currentSlide = totalSlides - 2; // Move to second-to-last slide
    setTimeout(() => showSlide(currentSlide), 400); // Wait for transition to finish before showing last
  }

  if (currentSlide >= totalSlides) {
    // If we're at the last slide, jump to the first slide (second slide)
    currentSlide = 1; // Move to second slide (don't show cloned first yet)
    setTimeout(() => showSlide(currentSlide), 400); // Wait for transition to finish before showing first
  }

  showSlide(currentSlide); // Display the new slide immediately after moving
}

// Handling touch events for swipe functionality on mobile
let startX = 0;
let endX = 0;
let swipeThreshold = 50; // Minimum swipe distance for detection

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX; // Capture the starting position
});

track.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX; // Capture the ending position
  
  // Swipe left (move to next slide)
  if (endX < startX - swipeThreshold) {
    moveSlide(1);
  }
  
  // Swipe right (move to previous slide)
  else if (endX > startX + swipeThreshold) {
    moveSlide(-1);
  }
});

// Button handlers for previous and next arrows
document.querySelector('.left-arrow').addEventListener('click', () => moveSlide(-1)); // Move to previous slide
document.querySelector('.right-arrow').addEventListener('click', () => moveSlide(1));  // Move to next slide
