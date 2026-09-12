// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Sticky Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close mobile menu on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Copy Email to Clipboard
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email');
      navigator.clipboard.writeText(email).then(() => {
        showToast(`E-mail ${email} copiado!`);
      }).catch(() => {
        showToast(`E-mail: ${email}`);
      });
    });
  }

  function showToast(msg) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // CV Modal Handlers
  const openCvModalBtn = document.getElementById('openCvModalBtn');
  const closeCvModalBtn = document.getElementById('closeCvModalBtn');
  const closeCvModalFooterBtn = document.getElementById('closeCvModalFooterBtn');
  const cvModal = document.getElementById('cvModal');

  function openModal() {
    if (cvModal) {
      cvModal.classList.add('active');
      cvModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (cvModal) {
      cvModal.classList.remove('active');
      cvModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (openCvModalBtn) openCvModalBtn.addEventListener('click', openModal);
  if (closeCvModalBtn) closeCvModalBtn.addEventListener('click', closeModal);
  if (closeCvModalFooterBtn) closeCvModalFooterBtn.addEventListener('click', closeModal);

  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        closeModal();
      }
    });
  }

  // KPI Counter Animation
  const kpiNumbers = document.querySelectorAll('.kpi-number[data-target]');
  let animated = false;

  function animateCounters() {
    const kpiSection = document.getElementById('metricas');
    if (!kpiSection || animated) return;

    const rect = kpiSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.8) {
      animated = true;
      kpiNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'), 10);
        let count = 0;
        const speed = Math.ceil(target / 30);
        const timer = setInterval(() => {
          count += speed;
          if (count >= target) {
            num.textContent = `+${target}`;
            clearInterval(timer);
          } else {
            num.textContent = `+${count}`;
          }
        }, 40);
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters(); // Initial check
});
