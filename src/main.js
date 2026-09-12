// Main Application JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Set Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Navbar Sticky & Scroll Effects
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 4. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('hidden');
    });

    // Close menu when a link inside is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.add('hidden');
      });
    });
  }

  // 5. Copy Email to Clipboard with Toast Notification
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'eduardobr83@icloud.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email)
          .then(() => showToast(`E-mail ${email} copiado!`))
          .catch(() => showToast(`E-mail: ${email}`));
      } else {
        showToast(`E-mail: ${email}`);
      }
    });
  }

  function showToast(msg) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // 6. KPI Counter Animation (Faixa de Autoridade)
  const kpiNumbers = document.querySelectorAll('.kpi-number[data-target]');
  let animated = false;

  function animateCounters() {
    const kpiSection = document.getElementById('metricas');
    if (!kpiSection || animated) return;

    const rect = kpiSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.85) {
      animated = true;
      kpiNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'), 10);
        if (isNaN(target)) return;
        
        let count = 0;
        const duration = 1200; // ms
        const steps = 30;
        const stepTime = duration / steps;
        const increment = Math.ceil(target / steps);

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            num.textContent = `${target}`;
            clearInterval(timer);
          } else {
            num.textContent = `${count}`;
          }
        }, stepTime);
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters(); // Trigger on load if already in viewport
});
