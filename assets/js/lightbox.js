/* 極簡 Lightbox：套在 <a data-lightbox> 上，支援左右切換與 ESC 關閉 */
(function () {
  const links = Array.from(document.querySelectorAll('a[data-lightbox]'));
  const lb     = document.querySelector('.lightbox');
  const lbImg  = document.querySelector('.lb-img');
  const lbCap  = document.querySelector('.lb-cap');
  const btnX   = document.querySelector('.lb-close');
  const btnL   = document.querySelector('.lb-prev');
  const btnR   = document.querySelector('.lb-next');
  if (!links.length || !lb) return;

  function openAt(idx){
    const a = links[idx]; if (!a) return;
    lbImg.src = a.getAttribute('href');
    lbImg.alt = a.querySelector('img')?.alt || '';
    lbCap.textContent = a.getAttribute('data-caption') || '';
    lb.dataset.index = String(idx);
    lb.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function close(){ lb.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }
  function goto(delta){
    const cur = Number(lb.dataset.index || 0);
    const next = (cur + delta + links.length) % links.length;
    openAt(next);
  }

  links.forEach((a, i) => {
    a.addEventListener('click', (e) => { e.preventDefault(); openAt(i); });
  });

  btnX?.addEventListener('click', close);
  btnL?.addEventListener('click', () => goto(-1));
  btnR?.addEventListener('click', () => goto(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

  window.addEventListener('keydown', (e) => {
    if (lb.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') goto(-1);
    if (e.key === 'ArrowRight') goto(1);
  });
})();
