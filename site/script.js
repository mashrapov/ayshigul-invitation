const audio = document.querySelector('#invitation-audio');
const musicButton = document.querySelector('.music-button');
let playing = false;

musicButton.addEventListener('click', async () => {
  if (playing) {
    audio.pause();
    playing = false;
    musicButton.textContent = '🔇';
    musicButton.classList.remove('is-playing');
    musicButton.setAttribute('aria-label', 'Включить музыку');
    return;
  }
  try {
    audio.volume = 0.5;
    await audio.play();
    playing = true;
    musicButton.textContent = '♫';
    musicButton.classList.add('is-playing');
    musicButton.setAttribute('aria-label', 'Выключить музыку');
  } catch {
    playing = false;
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.28 });
document.querySelectorAll('.scene').forEach((scene) => observer.observe(scene));

document.querySelector('.rsvp-form').addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.querySelector('.form-fields').hidden = true;
  event.currentTarget.querySelector('.success-message').hidden = false;
});

