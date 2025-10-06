// Swipe for mobile
let startX = 0;
track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
track.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if(endX < startX - 50 && currentSlide < slides.length-1) moveSlide(1);
  if(endX > startX + 50 && currentSlide > 0) moveSlide(-1);
});
