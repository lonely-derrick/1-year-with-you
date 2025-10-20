// Basic gallery lightbox + small interactions
(() => {
  const galleryButtons = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const openLove = document.getElementById('openLove');

  // Keep a list of sources
  const sources = galleryButtons.map(b => b.dataset.src || b.getAttribute('data-src')).filter(Boolean);
  let curIndex = 0;

  function showLightbox(index){
    if (!sources[index]) return;
    curIndex = index;
    lbImage.src = sources[index];
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden','false');
  }
  function hideLightbox(){
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden','true');
  }
  function prev(){
    showLightbox((curIndex - 1 + sources.length) % sources.length);
  }
  function next(){
    showLightbox((curIndex + 1) % sources.length);
  }

  galleryButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => showLightbox(i));
  });

  lbClose.addEventListener('click', hideLightbox);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);

  // keyboard nav
  window.addEventListener('keydown', (e) => {
    if (lightbox.style.display !== 'flex') return;
    if (e.key === 'Escape') hideLightbox();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // open love letter scroll
  if (openLove) openLove.addEventListener('click', () => {
    document.getElementById('love-letter').scrollIntoView({behavior:'smooth'});
  });

  // fallback: ensure images exist (simple)
  window.addEventListener('load', () => {
    galleryButtons.forEach(btn => {
      const img = btn.querySelector('img');
      img.addEventListener('error', () => {
        img.src = 'data:image/svg+xml;charset=UTF-8,' +
          encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#f4f2f3"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#b9a1a6" font-family="Inter, Arial" font-size="20">Image not found</text></svg>');
      });
    });
  });
})();
