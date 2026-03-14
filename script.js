/* ========================================
   LATITUDE - Main JavaScript
   Interactive features & form handling
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initAccordions();
  initFilters();
  initGuideSearch();
  initContactForm();
  initCountUp();
  initGuideModals();
  initParallax();
  initPageEnter();
  initFloatingCTA();
  initScrollToTop();
  initCardTilt();
  initReadingProgress();
  initHeroWords();
  initSubpageHeroReveal();
  initScrollIndicator();
  initFeaturedTestimonial();
  initSectionParallax();
});

/* ---------- Page Enter Animation ---------- */
function initPageEnter() {
  document.body.classList.add('page-enter');
}

/* ---------- Header Scroll Effect ---------- */
function initHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const heroSection = document.querySelector('.hero-fullvh');
  const isHomePage = !!heroSection;

  // Home page: header stays transparent always (fixed over hero image)
  if (isHomePage) return;

  // Sub-pages with image hero: start transparent, transition to solid on scroll
  const subHero = document.querySelector('.subpage-hero');
  if (subHero) {
    header.classList.add('header-transparent');

    window.addEventListener('scroll', () => {
      const heroBottom = subHero.getBoundingClientRect().bottom;
      if (heroBottom <= 80) {
        // Scrolled past hero — show solid white header
        header.classList.remove('header-transparent');
        header.classList.add('header-scrolled');
      } else {
        // Still within hero — keep transparent
        header.classList.add('header-transparent');
        header.classList.remove('header-scrolled');
      }
    }, { passive: true });
    return;
  }

  // Pages without hero: add shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }, { passive: true });
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const close = document.getElementById('mobile-menu-close');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', openMenu);
  if (close) close.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close on nav link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ---------- Scroll Animations (Intersection Observer) ---------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right, .scale-in, .heading-reveal, .blur-up, .clip-reveal');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animatedElements.forEach(el => observer.observe(el));
}

/* ---------- Testimonial Carousel ---------- */
/* ---------- Accordions ---------- */
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const isOpen = item.classList.contains('open');

      // Close siblings (optional: remove this block for independent toggles)
      const parent = item.parentElement;
      parent.querySelectorAll('.accordion-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.accordion-content').classList.remove('open');
        }
      });

      // Toggle current
      item.classList.toggle('open', !isOpen);
      content.classList.toggle('open', !isOpen);
    });
  });
}

/* ---------- Filter System ---------- */
function initFilters() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      const group = btn.closest('[data-filter-group]')?.dataset.filterGroup || 'default';

      // Update active state
      btn.closest('.filter-group')?.querySelectorAll('[data-filter]').forEach(b => {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      // Filter items
      const items = document.querySelectorAll(`[data-filter-item${group !== 'default' ? `="${group}"` : ''}]`);
      items.forEach(item => {
        const categories = item.dataset.category?.split(',') || [];
        const show = filter === 'all' || categories.includes(filter);

        if (show) {
          item.style.display = '';
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          requestAnimationFrame(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });
}

/* ---------- Guide Search ---------- */
function initGuideSearch() {
  const input = document.getElementById('guide-search');
  if (!input) return;

  const items = document.querySelectorAll('[data-filter-item]');

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const match = !query || text.includes(query);
      if (match) {
        item.style.display = '';
        item.style.opacity = '0';
        item.style.transform = 'translateY(8px)';
        requestAnimationFrame(() => {
          item.style.transition = 'all 0.35s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        });
      } else {
        item.style.opacity = '0';
        item.style.transform = 'translateY(8px)';
        setTimeout(() => { item.style.display = 'none'; }, 280);
      }
    });

    // reset filter tab active state when typing
    if (query) {
      document.querySelectorAll('.filter-group [data-filter]').forEach(b => b.classList.remove('active'));
    }
  });
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn?.querySelector('.btn-text');
  const btnSpinner = submitBtn?.querySelector('.btn-spinner');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate
    if (!validateForm(form)) return;

    // Show loading
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Sending...';
    if (btnSpinner) btnSpinner.style.display = 'inline-block';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.timestamp = new Date().toISOString();
    data.source = window.location.pathname;
    data.type = 'inquiry'; // Route to Inquiries sheet

    try {
      // Google Sheets Web App URL - Replace with your deployed Apps Script URL
      const SHEET_URL = form.dataset.sheetUrl || '';

      if (SHEET_URL) {
        await fetch(SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }

      // Show success
      showModal('success', 'Thank You!', "We've received your inquiry and will get back to you within 24 hours.");
      form.reset();
      clearErrors(form);

    } catch (err) {
      showModal('error', 'Oops!', 'Something went wrong. Please try again or contact us directly.');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Send Message';
      if (btnSpinner) btnSpinner.style.display = 'none';
    }
  });

  // Real-time validation on blur
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      const error = field.parentElement.querySelector('.form-error');
      if (error && error.classList.contains('show')) {
        validateField(field);
      }
    });
  });
}

function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!validateField(field)) valid = false;
  });
  return valid;
}

function validateField(field) {
  const error = field.parentElement.querySelector('.form-error');
  let valid = true;
  let message = '';

  if (field.required && !field.value.trim()) {
    valid = false;
    message = 'This field is required';
  } else if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      valid = false;
      message = 'Please enter a valid email address';
    }
  } else if (field.type === 'tel' && field.value) {
    const phoneRegex = /^[\d\s+\-()]{10,}$/;
    if (!phoneRegex.test(field.value)) {
      valid = false;
      message = 'Please enter a valid phone number';
    }
  }

  if (error) {
    error.textContent = message;
    error.classList.toggle('show', !valid);
  }

  field.classList.toggle('border-red-400', !valid);
  field.classList.toggle('border-gray-200', valid);

  return valid;
}

function clearErrors(form) {
  form.querySelectorAll('.form-error').forEach(e => e.classList.remove('show'));
  form.querySelectorAll('.border-red-400').forEach(f => {
    f.classList.remove('border-red-400');
    f.classList.add('border-gray-200');
  });
}

/* ---------- Modal System ---------- */
function showModal(type, title, message) {
  // Remove existing modal
  document.getElementById('app-modal')?.remove();

  const icon = type === 'success'
    ? '<span class="material-icons text-5xl text-green-500">check_circle</span>'
    : '<span class="material-icons text-5xl text-red-500">error</span>';

  const modal = document.createElement('div');
  modal.id = 'app-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content text-center">
      <div class="mb-4">${icon}</div>
      <h3 class="text-xl font-bold mb-2">${title}</h3>
      <p class="text-gray-600 mb-6">${message}</p>
      <button onclick="closeModal()" class="bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-8 rounded-xl transition-colors">
        Got it
      </button>
    </div>
  `;

  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add('active'));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

function closeModal() {
  const modal = document.getElementById('app-modal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  }
}

/* ---------- Count Up Animation ---------- */
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          const current = Math.round(eased * target);
          el.textContent = current.toLocaleString() + suffix;

          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ---------- Guide Modal System ---------- */
function initGuideModals() {
  document.querySelectorAll('[data-guide-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return; // Don't trigger on buttons inside
      const guideId = card.dataset.guideId;
      openGuideModal(guideId);
    });
  });
}

function openGuideModal(guideId) {
  const data = window.guidesData?.[guideId];
  if (!data) return;

  document.getElementById('guide-modal')?.remove();

  const modal = document.createElement('div');
  modal.id = 'guide-modal';
  modal.className = 'guide-detail-overlay';
  modal.innerHTML = `
    <div class="guide-detail-card">
      <div class="relative">
        <div class="h-48 bg-gradient-to-br from-primary to-primary-dark rounded-t-3xl"></div>
        <button onclick="closeGuideModal()" class="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors">
          <span class="material-icons">close</span>
        </button>
        <div class="absolute -bottom-12 left-6">
          <div class="w-24 h-24 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-gray-200">
            <img src="${data.photo}" alt="${data.name}" class="w-full h-full object-cover"/>
          </div>
        </div>
      </div>
      <div class="p-6 pt-16">
        <h3 class="text-2xl font-bold">${data.name}</h3>
        <p class="text-primary font-semibold">${data.title}</p>
        <p class="text-text-muted text-sm mt-1">${data.experience} years experience</p>
        
        <div class="flex flex-wrap gap-2 mt-4">
          ${data.specialties.map(s => `<span class="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">${s}</span>`).join('')}
        </div>
        
        <div class="mt-6">
          <h4 class="font-bold mb-2">About</h4>
          <p class="text-gray-600 leading-relaxed">${data.bio}</p>
        </div>
        
        <div class="mt-4">
          <h4 class="font-bold mb-2">Certifications</h4>
          <ul class="space-y-1">
            ${data.certifications.map(c => `<li class="flex items-center gap-2 text-sm text-gray-600"><span class="material-icons text-primary text-base">verified</span>${c}</li>`).join('')}
          </ul>
        </div>
        
        <div class="mt-4">
          <h4 class="font-bold mb-2">Languages</h4>
          <p class="text-gray-600 text-sm">${data.languages.join(', ')}</p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modal.classList.add('active'));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeGuideModal();
  });
}

function closeGuideModal() {
  const modal = document.getElementById('guide-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => modal.remove(), 300);
  }
}

/* ---------- Parallax Effect — Multi-layer for home hero, single for other pages ---------- */
function initParallax() {
  // Multi-layer parallax for home page hero
  const layerBg = document.querySelector('.hero-layer-bg');
  const layerMid = document.querySelector('.hero-layer-mid');
  const layerFg = document.querySelector('.hero-layer-fg');

  if (layerBg || layerMid || layerFg) {
    let current = { bg: 0, mid: 0, fg: 0 };
    let target = { bg: 0, mid: 0, fg: 0 };
    let rafId = null;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function tick() {
      // Use faster lerp when returning toward 0 (scroll-to-top) to avoid flash
      const speed = (target.bg < 2) ? 0.25 : 0.06;
      current.bg = lerp(current.bg, target.bg, speed);
      current.mid = lerp(current.mid, target.mid, speed);
      current.fg = lerp(current.fg, target.fg, speed);

      const diff = Math.abs(current.bg - target.bg) + Math.abs(current.mid - target.mid) + Math.abs(current.fg - target.fg);

      if (layerBg) layerBg.style.transform = `translateY(${current.bg}px)`;
      if (layerMid) layerMid.style.transform = `translateY(${current.mid}px)`;
      if (layerFg) layerFg.style.transform = `translateY(${current.fg}px)`;

      if (diff > 0.1) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Snap to exact target when close enough
        if (layerBg) layerBg.style.transform = `translateY(${target.bg}px)`;
        if (layerMid) layerMid.style.transform = `translateY(${target.mid}px)`;
        if (layerFg) layerFg.style.transform = `translateY(${target.fg}px)`;
        current.bg = target.bg;
        current.mid = target.mid;
        current.fg = target.fg;
        rafId = null;
      }
    }

    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll < window.innerHeight * 1.2) {
        target.bg = scroll * 0.08;   // slowest — background
        target.mid = scroll * 0.18;  // medium — midground
        target.fg = scroll * 0.35;   // fastest — foreground leaves
        if (!rafId) rafId = requestAnimationFrame(tick);
      }
    }, { passive: true });
    return;
  }

  // Sub-page hero parallax
  const subHeroBg = document.querySelector('.subpage-hero-bg img');
  if (subHeroBg) {
    let currentSub = 0;
    let targetSub = 0;
    let rafSub = null;

    function lerpSub(a, b, t) { return a + (b - a) * t; }

    function tickSub() {
      // Use faster lerp when returning toward 0 (scroll-to-top) to avoid flash
      const speed = (targetSub < 2) ? 0.25 : 0.06;
      currentSub = lerpSub(currentSub, targetSub, speed);
      const diff = Math.abs(currentSub - targetSub);
      subHeroBg.style.transform = `translateY(${currentSub}px)`;
      if (diff > 0.05) {
        rafSub = requestAnimationFrame(tickSub);
      } else {
        // Snap to exact target when close enough
        subHeroBg.style.transform = `translateY(${targetSub}px)`;
        currentSub = targetSub;
        rafSub = null;
      }
    }

    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      const heroHeight = document.querySelector('.subpage-hero')?.offsetHeight || 600;
      if (scroll < heroHeight * 1.2) {
        targetSub = scroll * 0.2;
        if (!rafSub) rafSub = requestAnimationFrame(tickSub);
      }
    }, { passive: true });
    return;
  }

  // Fallback: single-image parallax for non-home pages
  const hero = document.querySelector('.parallax-img');
  if (!hero) return;

  let current2 = 0;
  let target2 = 0;
  let rafId2 = null;

  function lerp2(a, b, t) { return a + (b - a) * t; }

  function tick2() {
    // Use faster lerp when returning toward 0 (scroll-to-top) to avoid flash
    const speed = (target2 < 2) ? 0.25 : 0.06;
    current2 = lerp2(current2, target2, speed);
    const diff = Math.abs(current2 - target2);
    hero.style.transform = `translateY(${current2}px) scale(1.08)`;
    if (diff > 0.05) {
      rafId2 = requestAnimationFrame(tick2);
    } else {
      hero.style.transform = `translateY(${target2}px) scale(1.08)`;
      current2 = target2;
      rafId2 = null;
    }
  }

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll < window.innerHeight * 1.2) {
      target2 = scroll * 0.28;
      if (!rafId2) rafId2 = requestAnimationFrame(tick2);
    }
  }, { passive: true });
}

/* ---------- Floating WhatsApp CTA ---------- */
function initFloatingCTA() {
  const btn = document.createElement('a');
  btn.href = 'https://wa.me/919876543210?text=Hi%20Latitude!%20I%27d%20like%20to%20know%20more%20about%20your%20programs.';
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.id = 'floating-whatsapp';
  btn.className = 'floating-whatsapp';
  btn.setAttribute('aria-label', 'Chat on WhatsApp');
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>`;
  document.body.appendChild(btn);
  // Always visible — CSS handles display, no delay gate needed
}

/* ---------- Scroll To Top Button ---------- */
function initScrollToTop() {
  const btn = document.createElement('button');
  btn.id = 'scroll-to-top';
  btn.className = 'scroll-to-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = '<span class="material-icons">keyboard_arrow_up</span>';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Leaf Particles ---------- */
/* ---------- Card Tilt Effect ---------- */
function initCardTilt() {
  const cards = document.querySelectorAll('.card-tilt');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ---------- Reading Progress Bar ---------- */
function initReadingProgress() {
  const bar = document.createElement('div');
  bar.id = 'reading-progress';
  bar.className = 'reading-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ---------- Smooth Scroll for Anchor Links ---------- */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const target = document.querySelector(link.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

/* ---------- Button Ripple Effect ---------- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-primary');
  if (!btn) return;

  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${e.clientX - rect.left - size / 2}px;
    top: ${e.clientY - rect.top - size / 2}px;
  `;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
});

/* ---------- Hero Word Animation ---------- */
function initHeroWords() {
  const h1 = document.querySelector('.hero-animated-headline');
  if (!h1) return;

  // Walk the childNodes, wrapping text nodes word-by-word, preserving element nodes
  function wrapWords(node, counter) {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      words.forEach(part => {
        if (part.trim() === '') {
          frag.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement('span');
          span.className = 'hero-word';
          span.textContent = part;
          span.style.animationDelay = (0.05 + counter.val * 0.09) + 's';
          counter.val++;
          frag.appendChild(span);
        }
      });
      return frag;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Preserve <br>, <span> etc — wrap their text children too
      const clone = node.cloneNode(false);
      Array.from(node.childNodes).forEach(child => {
        clone.appendChild(wrapWords(child, counter));
      });
      // For spans that are part of the headline, also animate them
      if (node.tagName === 'SPAN') {
        clone.classList.add('hero-word');
        clone.style.animationDelay = (0.05 + counter.val * 0.09) + 's';
        counter.val++;
      }
      return clone;
    }
    return node.cloneNode(true);
  }

  const counter = { val: 0 };
  const frag = document.createDocumentFragment();
  Array.from(h1.childNodes).forEach(child => {
    frag.appendChild(wrapWords(child, counter));
  });
  h1.innerHTML = '';
  h1.appendChild(frag);
}

/* ---------- Scroll Indicator Hide ---------- */
function initScrollIndicator() {
  const indicator = document.querySelector('.scroll-indicator');
  if (!indicator) return;
  let dismissed = false;
  window.addEventListener('scroll', () => {
    if (dismissed) return;
    if (window.scrollY > 80) {
      indicator.classList.add('hidden');
      dismissed = true;
    }
  }, { passive: true });
}

/* ---------- Featured Testimonial Rotation (Home Page) ---------- */
function initFeaturedTestimonial() {
  const quoteEl = document.getElementById('featured-quote');
  const authorEl = document.getElementById('featured-author');
  const dotsContainer = document.getElementById('featured-dots');
  if (!quoteEl || !authorEl || !dotsContainer) return;

  const testimonials = [
    {
      quote: 'My son came back from the wilderness weekend with a newfound confidence. He hasn\'t stopped talking about how to build a shelter!',
      name: 'Priya Sharma',
      detail: 'Mother of Arjun, age 10',
      initials: 'PS'
    },
    {
      quote: 'Latitude guides are exceptional. They managed to engage my teenager in nature without him missing his phone for a second. Truly magical.',
      name: 'Rajesh Kumar',
      detail: 'Father of Kiran, age 14',
      initials: 'RK'
    },
    {
      quote: 'Safety was my biggest concern, but the protocols Latitude has in place are top-notch. I felt completely at ease sending my daughter on the trekking program.',
      name: 'Anita Nair',
      detail: 'Mother of Meera, age 8',
      initials: 'AN'
    },
    {
      quote: 'We\'ve done three programs with Latitude now. Each one has been unique, educational, and most importantly, incredibly fun for the kids!',
      name: 'Vikram Reddy',
      detail: 'Father of twins, age 12',
      initials: 'VR'
    }
  ];

  let current = 0;
  let autoTimer = null;

  // Build dots
  testimonials.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function updateDots() {
    dotsContainer.querySelectorAll('.testimonial-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function show(index) {
    const t = testimonials[index];
    quoteEl.textContent = '\u201C' + t.quote + '\u201D';

    const avatarEl = authorEl.querySelector('.testimonial-featured-avatar');
    const nameEl = authorEl.querySelector('.author-name');
    const detailEl = authorEl.querySelector('.author-detail');

    if (avatarEl) avatarEl.textContent = t.initials;
    if (nameEl) nameEl.textContent = t.name;
    if (detailEl) detailEl.textContent = t.detail;

    updateDots();
  }

  function goTo(index) {
    if (index === current) return;
    // Fade out
    quoteEl.classList.add('fading');
    authorEl.classList.add('fading');

    setTimeout(() => {
      current = index;
      show(current);
      // Fade in
      quoteEl.classList.remove('fading');
      authorEl.classList.remove('fading');
    }, 500);

    restartAuto();
  }

  function next() {
    goTo((current + 1) % testimonials.length);
  }

  function restartAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 6000);
  }

  // Initial
  show(0);
  restartAuto();

  // Pause on hover
  const section = quoteEl.closest('.testimonial-featured');
  if (section) {
    section.addEventListener('mouseenter', () => clearInterval(autoTimer));
    section.addEventListener('mouseleave', restartAuto);
  }
}

/* ---------- Gallery Lightbox ---------- */

/* ---------- Sub-Page Hero Headline Reveal ---------- */
function initSubpageHeroReveal() {
  const headline = document.querySelector('.subpage-hero-headline');
  if (!headline || headline.classList.contains('hero-animated-headline')) return;

  // Split text into words while preserving child elements (e.g. .subpage-hero-highlight spans)
  function wrapWords(node, counter) {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      words.forEach(part => {
        if (part.trim() === '') {
          frag.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement('span');
          span.className = 'subpage-hero-word';
          span.textContent = part;
          span.style.animationDelay = (0.15 + counter.val * 0.08) + 's';
          counter.val++;
          frag.appendChild(span);
        }
      });
      return frag;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = node.cloneNode(false);
      Array.from(node.childNodes).forEach(child => {
        clone.appendChild(wrapWords(child, counter));
      });
      // Animate the element wrapper too
      if (node.tagName === 'SPAN') {
        clone.classList.add('subpage-hero-word');
        clone.style.animationDelay = (0.15 + counter.val * 0.08) + 's';
        counter.val++;
      }
      return clone;
    }
    return node.cloneNode(true);
  }

  const counter = { val: 0 };
  const frag = document.createDocumentFragment();
  Array.from(headline.childNodes).forEach(child => {
    frag.appendChild(wrapWords(child, counter));
  });
  headline.innerHTML = '';
  headline.appendChild(frag);
}

/* ---------- Section Background Parallax ---------- */
function initSectionParallax() {
  const sections = document.querySelectorAll('.section-parallax-bg');
  if (!sections.length) return;

  const targets = new Map();
  sections.forEach(bg => {
    targets.set(bg, { current: 0, target: 0, raf: null });
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function tick(bg, state) {
    state.current = lerp(state.current, state.target, 0.06);
    const diff = Math.abs(state.current - state.target);
    bg.style.transform = `translateY(${state.current}px)`;
    if (diff > 0.05) {
      state.raf = requestAnimationFrame(() => tick(bg, state));
    } else {
      state.raf = null;
    }
  }

  window.addEventListener('scroll', () => {
    targets.forEach((state, bg) => {
      const rect = bg.parentElement.getBoundingClientRect();
      const vh = window.innerHeight;
      // Only animate when section is in view
      if (rect.bottom > 0 && rect.top < vh) {
        const progress = (vh - rect.top) / (vh + rect.height);
        state.target = (progress - 0.5) * 80; // subtle 80px range
        if (!state.raf) state.raf = requestAnimationFrame(() => tick(bg, state));
      }
    });
  }, { passive: true });
}

/* ===========================================
   GOOGLE APPS SCRIPT CODE (Deploy separately)
   ===========================================
   
   Copy the code below into a new Google Apps Script project:
   1. Go to script.google.com
   2. Create new project
   3. Paste this code
   4. Deploy → New Deployment → Web App
   5. Set "Execute as: Me", "Who has access: Anyone"
   6. Copy the URL and set it as data-sheet-url on your form

   // ---- START APPS SCRIPT ----
   
   const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
   
   function doPost(e) {
     try {
       const data = JSON.parse(e.postData.contents);
       const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Inquiries') 
                     || SpreadsheetApp.openById(SHEET_ID).insertSheet('Inquiries');
       
       // Add headers if first row
       if (sheet.getLastRow() === 0) {
         sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Child Age', 
                         'Program Interest', 'Message', 'Source']);
       }
       
       sheet.appendRow([
         data.timestamp || new Date().toISOString(),
         data.name || '',
         data.email || '',
         data.phone || '',
         data.childAge || '',
         data.program || '',
         data.message || '',
         data.source || ''
       ]);
       
       // Optional: Send email notification
       // MailApp.sendEmail('your@email.com', 'New Latitude Inquiry', 
       //   `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nMessage: ${data.message}`);
       
       return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
         .setMimeType(ContentService.MimeType.JSON);
     } catch(err) {
       return ContentService.createTextOutput(JSON.stringify({status: 'error', message: err.toString()}))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   
   function doGet() {
     return ContentService.createTextOutput('Latitude Form Handler is running.');
   }
   
   // ---- END APPS SCRIPT ----
*/
