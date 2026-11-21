/* ===== TeddyPups Clone – Main Script ===== */

document.addEventListener('DOMContentLoaded', () => {
  // ── Curtain intro ──
  const curtain = document.getElementById('curtain');
  if (curtain) {
    setTimeout(() => {
      curtain.dataset.state = 'done';
    }, 1800);
  }

  // ── Header scroll behavior ──
  const header = document.getElementById('site-header');
  let lastY = 0;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    if (header) {
      header.dataset.scrolled = y > 40 ? 'true' : 'false';
      header.dataset.hidden = y > 300 && y > lastY ? 'true' : 'false';
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // ── Mobile menu ──
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (menuClose && mobileMenu) {
    menuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  // Close menu on link click
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Intersection Observer for card animations ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.tp-door').forEach(door => {
    door.style.animationPlayState = 'paused';
    observer.observe(door);
  });

  // ── Smooth lineup scroll ──
  const lineup = document.querySelector('.tp-lineup');
  if (lineup) {
    let isDown = false, startX, scrollLeft;
    lineup.addEventListener('mousedown', (e) => {
      isDown = true;
      lineup.style.cursor = 'grabbing';
      startX = e.pageX - lineup.offsetLeft;
      scrollLeft = lineup.scrollLeft;
    });
    lineup.addEventListener('mouseleave', () => { isDown = false; lineup.style.cursor = ''; });
    lineup.addEventListener('mouseup', () => { isDown = false; lineup.style.cursor = ''; });
    lineup.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - lineup.offsetLeft;
      const walk = (x - startX) * 1.5;
      lineup.scrollLeft = scrollLeft - walk;
    });
  }
});
