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

document.querySelector('.rsvp-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const error = form.querySelector('.form-error');
  const data = new FormData(form);

  button.disabled = true;
  button.textContent = 'Әвәтиливатиду…';
  error.hidden = true;

  try {
    const response = await fetch('https://tilda-2020123-copy.mashrapov.chatgpt.site/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submissionId: crypto.randomUUID(),
        name: String(data.get('name') || '').trim(),
        attendance: String(data.get('attendance') || ''),
        website: String(data.get('website') || ''),
      }),
    });
    if (!response.ok) throw new Error('submit_failed');
    form.querySelector('.form-fields').hidden = true;
    form.querySelector('.success-message').hidden = false;
    form.reset();
  } catch {
    error.hidden = false;
    button.disabled = false;
    button.textContent = 'Әвәтиш';
  }
});
