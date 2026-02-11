/* ========================================
   LATITUDE - Main JavaScript
   Interactive features & form handling
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initTestimonialCarousel();
  initAccordions();
  initFilters();
  initContactForm();
  initCountUp();
  initGuideModals();
  initParallax();
  initPageEnter();
});

/* ---------- Page Enter Animation ---------- */
function initPageEnter() {
  document.body.classList.add('page-enter');
}

/* ---------- Header Scroll Effect ---------- */
function initHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
    lastScroll = currentScroll;
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
  const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right, .scale-in');
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
function initTestimonialCarousel() {
  const container = document.getElementById('testimonial-carousel');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  if (!container) return;

  const scrollAmount = 400;

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  // Auto-scroll (pause on hover)
  let autoScroll;
  function startAutoScroll() {
    autoScroll = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 5000);
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  startAutoScroll();
  container.addEventListener('mouseenter', stopAutoScroll);
  container.addEventListener('mouseleave', startAutoScroll);
  container.addEventListener('touchstart', stopAutoScroll, { passive: true });
  container.addEventListener('touchend', () => {
    setTimeout(startAutoScroll, 3000);
  });
}

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

/* ---------- Parallax Effect ---------- */
function initParallax() {
  const hero = document.querySelector('.parallax-hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll < window.innerHeight) {
      hero.style.transform = `translateY(${scroll * 0.3}px)`;
    }
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
