// ============================================
// BOOKING.JS - Multi-Step Form & Calendar
// ============================================

// Mock Data: Upcoming Program Dates with Availability
const programDates = {
  'little-explorers': [
    { date: '2026-02-15', spots: 12, booked: 8 },
    { date: '2026-02-22', spots: 12, booked: 3 },
    { date: '2026-03-01', spots: 12, booked: 11 },
    { date: '2026-03-08', spots: 15, booked: 5 },
    { date: '2026-03-15', spots: 12, booked: 0 },
    { date: '2026-03-22', spots: 12, booked: 7 },
  ],
  'junior-adventurers': [
    { date: '2026-02-16', spots: 15, booked: 12 },
    { date: '2026-02-23', spots: 15, booked: 6 },
    { date: '2026-03-02', spots: 15, booked: 9 },
    { date: '2026-03-09', spots: 15, booked: 2 },
    { date: '2026-03-16', spots: 18, booked: 0 },
    { date: '2026-03-23', spots: 15, booked: 10 },
  ],
  'outdoor-leaders': [
    { date: '2026-02-21', spots: 12, booked: 8 },
    { date: '2026-02-22', spots: 12, booked: 4 },
    { date: '2026-02-28', spots: 12, booked: 11 },
    { date: '2026-03-07', spots: 12, booked: 3 },
    { date: '2026-03-14', spots: 15, booked: 0 },
    { date: '2026-03-15', spots: 12, booked: 6 },
    { date: '2026-03-21', spots: 12, booked: 9 },
  ],
  'teen-expeditions': [
    { date: '2026-02-20', spots: 10, booked: 7 },
    { date: '2026-02-21', spots: 10, booked: 5 },
    { date: '2026-02-27', spots: 10, booked: 9 },
    { date: '2026-02-28', spots: 10, booked: 2 },
    { date: '2026-03-06', spots: 12, booked: 0 },
    { date: '2026-03-07', spots: 10, booked: 4 },
    { date: '2026-03-13', spots: 10, booked: 8 },
    { date: '2026-03-14', spots: 12, booked: 1 },
  ],
};

// Program Display Names
const programNames = {
  'little-explorers': 'Little Explorers (Ages 5–7)',
  'junior-adventurers': 'Junior Adventurers (Ages 8–10)',
  'outdoor-leaders': 'Outdoor Leaders (Ages 11–13)',
  'teen-expeditions': 'Teen Expeditions (Ages 14–16)',
};

// ============================================
// Multi-Step Form Logic
// ============================================

let currentStep = 1;
const totalSteps = 3;
let selectedDateData = null;

// Validation helpers (global scope)
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /[\d\s\+\-\(\)]+/.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  const steps = form.querySelectorAll('.form-step');
  const nextBtns = form.querySelectorAll('.btn-next');
  const prevBtns = form.querySelectorAll('.btn-prev');
  const progressBar = document.getElementById('progress-bar');
  const stepCircles = document.querySelectorAll('.step-circle');

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
      document.querySelector('input[name="selectedDate"]').value = '';
      selectedDateData = null;
      document.getElementById('availability-info').classList.add('hidden');
    });
  });

  // Form Submission
  form.addEventListener('submit', handleBookingSubmit);

  function goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > totalSteps) return;

    // Hide all steps
    steps.forEach(step => step.classList.remove('active'));
    
    // Show current step
    const currentStepEl = form.querySelector(`[data-step="${stepNumber}"]`);
    if (currentStepEl) {
      currentStepEl.classList.add('active');
      currentStep = stepNumber;

      // Update progress bar (0%, 50%, 100%)
      const progress = ((stepNumber - 1) / (totalSteps - 1)) * 100;
      progressBar.style.width = `${progress}%`;

      // Update step circles
      stepCircles.forEach((circle, index) => {
        const stepNum = index + 1;
        if (stepNum < stepNumber) {
          circle.classList.remove('active');
          circle.classList.add('completed');
          circle.innerHTML = '<span class="material-icons text-sm">check</span>';
          circle.classList.add('bg-primary', 'text-white');
          circle.classList.remove('bg-gray-200', 'text-gray-500');
        } else if (stepNum === stepNumber) {
          circle.classList.add('active');
          circle.classList.remove('completed');
          circle.textContent = stepNum;
          circle.classList.add('bg-primary', 'text-white');
          circle.classList.remove('bg-gray-200', 'text-gray-500');
        } else {
          circle.classList.remove('active', 'completed');
          circle.textContent = stepNum;
          circle.classList.remove('bg-primary', 'text-white');
          circle.classList.add('bg-gray-200', 'text-gray-500');
        }
      });

      // Update summary on step 3
      if (stepNumber === 3) {
        updateSummary();
      }

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function validateStep(step) {
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
        alert('Please select a program');
      } else if (!selectedDate.value) {
        isValid = false;
        alert('Please select a date');
      }
    }

    return isValid;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^[\d\s\+\-\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
  }

  function updateSummary() {
    const formData = new FormData(form);
    const selectedProgram = formData.get('program');
    const selectedDate = formData.get('selectedDate');

    document.getElementById('summary-name').textContent = formData.get('name') || '—';
    document.getElementById('summary-email').textContent = formData.get('email') || '—';
    document.getElementById('summary-program').textContent = programNames[selectedProgram] || '—';
    document.getElementById('summary-date').textContent = selectedDate ? formatDate(selectedDate) : '—';
    document.getElementById('summary-children').textContent = formData.get('numChildren') || '—';
  }
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

  dates.forEach(dateObj => {
    const dateDate = new Date(dateObj.date);
    if (dateDate < today) return; // Skip past dates

    const available = dateObj.spots - dateObj.booked;
    const isFull = available <= 0;
    const isLimited = available <= 3 && available > 0;

    const dateCard = document.createElement('div');
    dateCard.className = `date-card p-4 rounded-xl border-2 cursor-pointer transition-all ${
      isFull 
        ? 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed' 
        : 'bg-white border-gray-200 hover:border-primary hover:shadow-md'
    }`;
    
    if (isFull) {
      dateCard.style.pointerEvents = 'none';
    }

    dateCard.innerHTML = `
      <div class="flex items-start justify-between mb-2">
        <div>
          <p class="text-lg font-bold">${formatDateShort(dateObj.date)}</p>
          <p class="text-xs text-text-muted">${getDayName(dateObj.date)}</p>
        </div>
        ${!isFull ? '<span class="material-icons text-gray-300">radio_button_unchecked</span>' : '<span class="text-xs font-bold text-red-500">FULL</span>'}
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
          const icon = card.querySelector('.material-icons');
          if (icon) icon.textContent = 'radio_button_unchecked';
        });

        // Select this one
        dateCard.classList.add('border-primary', 'bg-primary/5');
        const icon = dateCard.querySelector('.material-icons');
        if (icon) {
          icon.textContent = 'check_circle';
          icon.classList.add('text-primary');
        }

        // Set hidden input
        document.querySelector('input[name="selectedDate"]').value = dateObj.date;
        selectedDateData = dateObj;

        // Show availability info
        availabilityInfo.classList.remove('hidden');
        document.getElementById('spots-text').innerHTML = `
          <strong class="${isLimited ? 'text-red-500' : 'text-primary'}">${available} spots available</strong> 
          on ${formatDate(dateObj.date)}
          ${isLimited ? '<br><span class="text-red-500 font-bold">⚡ Almost full! Book now</span>' : ''}
        `;
      });
    }

    calendar.appendChild(dateCard);
  });

  // Grid layout
  calendar.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200';
}

// ============================================
// Form Submission
// ============================================

async function handleBookingSubmit(e) {
  e.preventDefault();

  const form = e.target;
  
  const form = e.target;
  const submitBtn = form.querySelector('.btn-submit');
  const btnText = submitBtn.querySelector('.btn-text');
  const spinner = submitBtn.querySelector('.btn-spinner');
  const icon = submitBtn.querySelector('.material-icons');

  // Disable button
  submitBtn.disabled = true;
  btnText.textContent = 'Submitting...';
  spinner.classList.remove('hidden');
  icon.classList.add('hidden');

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
    // TODO: Replace with your Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzLxtMSJZ4AG6d_GjCDaHs2qZD3SkUkvN5Pe1y2dSTXxvO6mWgBpBnW3MkV5aNFgSl6/exec';
    
    // Use FormData to avoid CORS preflight
    const formDataToSend = new FormData();
    Object.keys(data).forEach(key => {
      formDataToSend.append(key, data[key]);
    });
    
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: formDataToSend
    });

    if (response.ok) {
      // Success!
      showSuccessModal(data);
      form.reset();
      currentStep = 1;
      goToStep(1);
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Re-enable button
    submitBtn.disabled = false;
    btnText.textContent = 'Submit';
    spinner.classList.add('hidden');
    icon.classList.remove('hidden');
  }
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
        <h2 class="text-2xl font-extrabold mb-3">Booking Request Received! 🎉</h2>
        <p class="text-text-muted mb-6">Thank you, <strong>${data.name}</strong>! We've received your booking request for <strong>${data.program}</strong> on <strong>${data.date}</strong>.</p>
        
        <div class="bg-accent/10 rounded-xl p-4 mb-6 text-left">
          <p class="text-sm font-semibold mb-2">📧 Confirmation email sent to:</p>
          <p class="text-sm text-primary font-bold">${data.email}</p>
        </div>

        <p class="text-sm text-text-muted mb-6">Our team will reach out within <strong>24 hours</strong> to confirm your spot and provide payment details.</p>

        <div class="flex flex-col gap-3">
          <a href="https://wa.me/919876543210?text=Hi!%20I%20just%20submitted%20a%20booking%20request%20for%20${encodeURIComponent(data.program)}" target="_blank" class="btn-primary bg-[#25D366] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg">
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

  // Auto-remove after 30 seconds
  setTimeout(() => {
    if (modal.parentElement) modal.remove();
  }, 30000);
}

// ============================================
// Helper Functions
// ============================================

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-IN', options);
}

function formatDateShort(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

function getDayName(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { weekday: 'long' });
}

// ============================================
// Initialize on page load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initBookingForm();
});
