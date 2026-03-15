// ============================================
// BOOKING.JS - Multi-Step Form & Calendar
// ============================================

// Mock Data: Upcoming Program Dates with Availability
const programDates = {
  'little-explorers': [
    { date: '2026-04-05', spots: 12, booked: 8 },
    { date: '2026-04-12', spots: 12, booked: 3 },
    { date: '2026-04-19', spots: 12, booked: 11 },
    { date: '2026-04-26', spots: 15, booked: 5 },
    { date: '2026-05-03', spots: 12, booked: 0 },
    { date: '2026-05-10', spots: 12, booked: 7 },
    { date: '2026-05-17', spots: 12, booked: 4 },
  ],
  'junior-adventurers': [
    { date: '2026-04-06', spots: 15, booked: 12 },
    { date: '2026-04-13', spots: 15, booked: 6 },
    { date: '2026-04-20', spots: 15, booked: 9 },
    { date: '2026-04-27', spots: 15, booked: 2 },
    { date: '2026-05-04', spots: 18, booked: 0 },
    { date: '2026-05-11', spots: 15, booked: 10 },
    { date: '2026-05-18', spots: 15, booked: 3 },
  ],
  'outdoor-leaders': [
    { date: '2026-04-11', spots: 12, booked: 8 },
    { date: '2026-04-12', spots: 12, booked: 4 },
    { date: '2026-04-18', spots: 12, booked: 11 },
    { date: '2026-04-25', spots: 12, booked: 3 },
    { date: '2026-05-02', spots: 15, booked: 0 },
    { date: '2026-05-09', spots: 12, booked: 6 },
    { date: '2026-05-16', spots: 12, booked: 9 },
  ],
  'teen-expeditions': [
    { date: '2026-04-10', spots: 10, booked: 7 },
    { date: '2026-04-11', spots: 10, booked: 5 },
    { date: '2026-04-17', spots: 10, booked: 9 },
    { date: '2026-04-24', spots: 10, booked: 2 },
    { date: '2026-05-01', spots: 12, booked: 0 },
    { date: '2026-05-08', spots: 10, booked: 4 },
    { date: '2026-05-15', spots: 10, booked: 8 },
    { date: '2026-05-22', spots: 12, booked: 1 },
  ],
};

// Program Display Names
const programNames = {
  'little-explorers': 'Little Explorers (Ages 5–7)',
  'junior-adventurers': 'Junior Adventurers (Ages 8–10)',
  'outdoor-leaders': 'Outdoor Leaders (Ages 11–13)',
  'teen-expeditions': 'Teen Expeditions (Ages 14–16)',
};

// Program details for summary display
const programDetails = {
  'little-explorers':    { duration: 'Half Day (4 hrs)', location: 'Cubbon Park / Lalbagh' },
  'junior-adventurers':  { duration: 'Full Day (8 hrs)', location: 'Ramanagara' },
  'outdoor-leaders':     { duration: 'Weekend (2 days)', location: 'Savandurga / Turahalli' },
  'teen-expeditions':    { duration: '2–3 Days',         location: 'Bheemeshwari / Kanakapura' },
};

// ============================================
// Module-level state
// ============================================

let currentStep = 1;
const totalSteps = 3;
let selectedDateData = null;

// ============================================
// Validation helpers
// ============================================

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[\d\s+\-()]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// ============================================
// goToStep — module scope so handleBookingSubmit can call it
// ============================================

function goToStep(stepNumber) {
  if (stepNumber < 1 || stepNumber > totalSteps) return;

  const form = document.getElementById('booking-form');
  if (!form) return;

  const steps = form.querySelectorAll('.form-step');
  const progressBar = document.getElementById('progress-bar');
  const stepCircles = document.querySelectorAll('.step-circle');

  // Hide all steps
  steps.forEach(step => step.classList.remove('active'));

  // Show target step
  const targetStepEl = form.querySelector(`[data-step="${stepNumber}"]`);
  if (!targetStepEl) return;

  targetStepEl.classList.add('active');
  currentStep = stepNumber;

  // Update progress bar
  const progress = ((stepNumber - 1) / (totalSteps - 1)) * 100;
  if (progressBar) progressBar.style.width = `${progress}%`;

  // Update step circles
  stepCircles.forEach((circle, index) => {
    const stepNum = index + 1;
    if (stepNum < stepNumber) {
      circle.classList.remove('active', 'bg-gray-200', 'text-gray-500');
      circle.classList.add('completed', 'bg-primary', 'text-white');
      circle.innerHTML = '<span class="material-icons text-sm">check</span>';
    } else if (stepNum === stepNumber) {
      circle.classList.remove('completed', 'bg-gray-200', 'text-gray-500');
      circle.classList.add('active', 'bg-primary', 'text-white');
      circle.textContent = stepNum;
    } else {
      circle.classList.remove('active', 'completed', 'bg-primary', 'text-white');
      circle.classList.add('bg-gray-200', 'text-gray-500');
      circle.textContent = stepNum;
    }
  });

  // Update summary on step 3
  if (stepNumber === 3) updateSummary();

  // Scroll to form top
  const formSection = document.querySelector('.pt-28');
  window.scrollTo({ top: formSection ? formSection.offsetTop - 80 : 0, behavior: 'smooth' });
}

// ============================================
// updateSummary — module scope
// ============================================

function updateSummary() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  const formData = new FormData(form);
  const selectedProgram = formData.get('program');
  const selectedDate = formData.get('selectedDate');
  const details = programDetails[selectedProgram] || {};

  document.getElementById('summary-name').textContent     = formData.get('name') || '—';
  document.getElementById('summary-email').textContent    = formData.get('email') || '—';
  document.getElementById('summary-phone').textContent    = formData.get('phone') || '—';
  document.getElementById('summary-program').textContent  = programNames[selectedProgram] || '—';
  document.getElementById('summary-date').textContent     = selectedDate ? formatDate(selectedDate) : '—';
  document.getElementById('summary-children').textContent = formData.get('numChildren') || '—';
  document.getElementById('summary-duration').textContent = details.duration || '—';
  document.getElementById('summary-location').textContent = details.location || '—';
}

// ============================================
// Multi-Step Form Logic
// ============================================

function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  const nextBtns = form.querySelectorAll('.btn-next');
  const prevBtns = form.querySelectorAll('.btn-prev');

  // Next Button Logic
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        goToStep(currentStep + 1);
      }
    });
  });

  // Previous Button Logic
  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goToStep(currentStep - 1);
    });
  });

  // Program Selection Change
  const programRadios = form.querySelectorAll('input[name="program"]');
  programRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      loadCalendar(e.target.value);
      const dateInput = document.querySelector('input[name="selectedDate"]');
      if (dateInput) dateInput.value = '';
      selectedDateData = null;
      const availInfo = document.getElementById('availability-info');
      if (availInfo) availInfo.classList.add('hidden');

      // Show program description snippet
      updateProgramSnippet(e.target.value);
    });
  });

  // Form Submission
  form.addEventListener('submit', handleBookingSubmit);

  // If arriving with a ?program= query param, pre-select
  const params = new URLSearchParams(window.location.search);
  const preProgram = params.get('program');
  if (preProgram) {
    const radio = form.querySelector(`input[name="program"][value="${preProgram}"]`);
    if (radio) {
      radio.checked = true;
      loadCalendar(preProgram);
      updateProgramSnippet(preProgram);
    }
  }
}

function updateProgramSnippet(programId) {
  const snippet = document.getElementById('program-snippet');
  if (!snippet) return;
  const details = programDetails[programId];
  if (details) {
    snippet.innerHTML = `
      <div class="flex gap-4 text-xs text-text-muted mt-3 p-3 bg-primary/5 rounded-xl">
        <span class="flex items-center gap-1"><span class="material-icons text-primary text-sm">schedule</span> ${details.duration}</span>
        <span class="flex items-center gap-1"><span class="material-icons text-primary text-sm">location_on</span> ${details.location}</span>
      </div>
    `;
    snippet.classList.remove('hidden');
  }
}

function validateStep(step) {
  const form = document.getElementById('booking-form');
  const currentStepEl = form.querySelector(`[data-step="${step}"]`);
  const inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
  let isValid = true;

  inputs.forEach(input => {
    const errorEl = input.parentElement.querySelector('.form-error');

    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('border-red-500');
      if (errorEl) errorEl.textContent = 'This field is required';
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
      isValid = false;
      input.classList.add('border-red-500');
      if (errorEl) errorEl.textContent = 'Please enter a valid email';
    } else if (input.type === 'tel' && !isValidPhone(input.value)) {
      isValid = false;
      input.classList.add('border-red-500');
      if (errorEl) errorEl.textContent = 'Please enter a valid phone number';
    } else {
      input.classList.remove('border-red-500');
      if (errorEl) errorEl.textContent = '';
    }
  });

  // Step 2 specific validation
  if (step === 2) {
    const selectedProgram = form.querySelector('input[name="program"]:checked');
    const selectedDate = form.querySelector('input[name="selectedDate"]');

    if (!selectedProgram) {
      isValid = false;
      showBookingToast('Please select a program first.');
    } else if (!selectedDate || !selectedDate.value) {
      isValid = false;
      showBookingToast('Please select an available date.');
    }
  }

  return isValid;
}

// ============================================
// Calendar Rendering
// ============================================

function loadCalendar(programId) {
  const calendarContainer = document.getElementById('calendar-container');
  const calendar = document.getElementById('calendar');
  const availabilityInfo = document.getElementById('availability-info');

  if (!programDates[programId]) {
    calendarContainer.classList.add('hidden');
    return;
  }

  calendarContainer.classList.remove('hidden');
  calendar.innerHTML = '';

  const dates = programDates[programId];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let shownCount = 0;

  dates.forEach(dateObj => {
    const dateDate = new Date(dateObj.date);
    if (dateDate < today) return; // Skip past dates
    shownCount++;

    const available = dateObj.spots - dateObj.booked;
    const isFull = available <= 0;
    const isLimited = available <= 3 && available > 0;

    const dateCard = document.createElement('div');
    dateCard.className = `date-card p-4 rounded-xl border-2 cursor-pointer transition-all ${
      isFull
        ? 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed'
        : 'bg-white border-gray-200 hover:border-primary hover:shadow-md'
    }`;

    if (isFull) dateCard.style.pointerEvents = 'none';

    dateCard.innerHTML = `
      <div class="flex items-start justify-between mb-2">
        <div>
          <p class="text-lg font-bold">${formatDateShort(dateObj.date)}</p>
          <p class="text-xs text-text-muted">${getDayName(dateObj.date)}</p>
        </div>
        ${!isFull
          ? '<span class="material-icons text-gray-300 select-radio">radio_button_unchecked</span>'
          : '<span class="text-xs font-bold text-red-500">FULL</span>'
        }
      </div>
      <div class="flex items-center justify-between text-xs">
        <span class="${isLimited ? 'text-red-500 font-bold' : 'text-text-muted'}">
          ${available} ${available === 1 ? 'spot' : 'spots'} left
        </span>
        ${isLimited ? '<span class="text-red-500 font-bold">⚡ Limited</span>' : ''}
      </div>
      ${dateObj.booked > 0 ? `<p class="text-xs text-primary mt-2 font-semibold">${dateObj.booked} kids already booked</p>` : ''}
    `;

    if (!isFull) {
      dateCard.addEventListener('click', () => {
        // Deselect all
        document.querySelectorAll('.date-card').forEach(card => {
          card.classList.remove('border-primary', 'bg-primary/5');
          const icon = card.querySelector('.select-radio');
          if (icon) icon.textContent = 'radio_button_unchecked';
        });

        // Select this
        dateCard.classList.add('border-primary', 'bg-primary/5');
        const icon = dateCard.querySelector('.select-radio');
        if (icon) {
          icon.textContent = 'check_circle';
          icon.classList.add('text-primary');
          icon.classList.remove('text-gray-300');
        }

        // Set hidden input
        const dateInput = document.querySelector('input[name="selectedDate"]');
        if (dateInput) dateInput.value = dateObj.date;
        selectedDateData = dateObj;

        // Show availability info
        if (availabilityInfo) {
          availabilityInfo.classList.remove('hidden');
          document.getElementById('spots-text').innerHTML = `
            <strong class="${isLimited ? 'text-red-500' : 'text-primary'}">${available} spot${available === 1 ? '' : 's'} available</strong>
            on ${formatDate(dateObj.date)}
            ${isLimited ? '<br><span class="text-red-500 font-bold">⚡ Almost full — book now!</span>' : ''}
          `;
        }
      });
    }

    calendar.appendChild(dateCard);
  });

  if (shownCount === 0) {
    calendar.innerHTML = '<p class="text-text-muted text-sm text-center py-6">No upcoming dates available. <a href="https://wa.me/919876543210" class="text-primary font-bold hover:underline">Contact us on WhatsApp</a> to arrange a custom date.</p>';
  }

  // Grid layout
  calendar.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200';
}

// ============================================
// Form Submission
// ============================================

async function handleBookingSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('.btn-submit');
  const btnText = submitBtn?.querySelector('.btn-text');
  const spinner = submitBtn?.querySelector('.btn-spinner');
  const icon = submitBtn?.querySelector('.material-icons');

  // Disable button & show loading
  if (submitBtn) submitBtn.disabled = true;
  if (btnText) btnText.textContent = 'Submitting...';
  if (spinner) spinner.classList.remove('hidden');
  if (icon) icon.classList.add('hidden');

  // Gather form data
  const formData = new FormData(form);
  const data = {
    timestamp: new Date().toISOString(),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    numChildren: formData.get('numChildren'),
    program: programNames[formData.get('program')],
    programId: formData.get('program'),
    date: formatDate(formData.get('selectedDate')),
    dateRaw: formData.get('selectedDate'),
    message: formData.get('message') || 'N/A',
    spotsBooked: selectedDateData ? selectedDateData.booked : 'N/A',
    spotsAvailable: selectedDateData ? (selectedDateData.spots - selectedDateData.booked) : 'N/A',
    type: 'booking'
  };

  try {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzLxtMSJZ4AG6d_GjCDaHs2qZD3SkUkvN5Pe1y2dSTXxvO6mWgBpBnW3MkV5aNFgSl6/exec';

    const formDataToSend = new FormData();
    Object.keys(data).forEach(key => formDataToSend.append(key, data[key]));

    const response = await fetch(scriptURL, {
      method: 'POST',
      body: formDataToSend
    });

    if (response.ok) {
      showSuccessModal(data);
      form.reset();
      currentStep = 1;
      goToStep(1);
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    console.error('Booking error:', error);
    showBookingToast('Something went wrong. Please try again or <a href="https://wa.me/919876543210" class="font-bold underline">contact us on WhatsApp</a>.');
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    if (btnText) btnText.textContent = 'Submit Booking';
    if (spinner) spinner.classList.add('hidden');
    if (icon) icon.classList.remove('hidden');
  }
}

// ============================================
// Toast notification (for step validation errors)
// ============================================

function showBookingToast(message) {
  const existing = document.getElementById('booking-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'booking-toast';
  toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-text-main text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-scale-in';
  toast.innerHTML = `<span class="material-icons text-accent text-lg">warning</span><span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ============================================
// Success Modal
// ============================================

function showSuccessModal(data) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm';
  modal.innerHTML = `
    <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
      <div class="text-center">
        <div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span class="material-icons text-5xl text-primary">check_circle</span>
        </div>
        <h2 class="text-2xl font-extrabold mb-3">Booking Request Received!</h2>
        <p class="text-text-muted mb-6">Thank you, <strong>${data.name}</strong>! We've received your request for <strong>${data.program}</strong> on <strong>${data.date}</strong>.</p>

        <div class="bg-accent/10 rounded-xl p-4 mb-6 text-left">
          <p class="text-sm font-semibold mb-1">Confirmation email sent to:</p>
          <p class="text-sm text-primary font-bold">${data.email}</p>
        </div>

        <p class="text-sm text-text-muted mb-6">Our team will reach out within <strong>24 hours</strong> to confirm your spot and provide payment details.</p>

        <div class="flex flex-col gap-3">
          <a href="https://wa.me/919876543210?text=Hi!%20I%20just%20submitted%20a%20booking%20for%20${encodeURIComponent(data.program)}" target="_blank" class="btn-primary bg-[#25D366] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg">
            <span class="material-icons">chat</span>
            Chat on WhatsApp
          </a>
          <button onclick="this.closest('.fixed').remove()" class="text-text-muted font-semibold py-3 hover:text-primary transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  setTimeout(() => { if (modal.parentElement) modal.remove(); }, 30000);
}

// ============================================
// Helper Functions
// ============================================

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateShort(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

function getDayName(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-IN', { weekday: 'long' });
}

// ============================================
// Initialize on page load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initBookingForm();
});
