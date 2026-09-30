const dates = [...document.querySelectorAll('.nav > a')];
const days = [...document.querySelectorAll('section.day')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) dates.forEach(link => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-110px 0px -55% 0px', threshold: 0});
  days.forEach(day => observer.observe(day));
}

// Retry each failed image once, including failures that happened before this script ran.
document.querySelectorAll('.day-photo img').forEach(image => {
  const retry = () => {
    if (image.dataset.retried === '1') return;
    image.dataset.retried = '1';
    setTimeout(() => {
      const url = new URL(image.src, document.baseURI);
      url.searchParams.set('retry', '1');
      image.src = url.href;
    }, 1000);
  };
  image.addEventListener('error', retry);
  if (image.complete && image.naturalWidth === 0) retry();
});
