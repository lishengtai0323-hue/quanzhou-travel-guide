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
