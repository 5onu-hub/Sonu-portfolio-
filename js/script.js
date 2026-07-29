/**
 * ==========================================================================
 * SONU KUMAR - PORTFOLIO INTERACTIVE SCRIPT
 * Vanilla JS ES6 Engine with Particle Canvas, Typed Text, Theme Manager & Scrollspy
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize All Core Modules
  initThemeManager();
  initNavbarScroll();
  initTypedEffect();
  initParticlesCanvas();
  initScrollProgress();
  initCursorGlow();
  initStatCounters();
  initSkillsFilter();
  initProjectsFilter();
  initGitHubHeatmap();
  initContactForm();
  initEmailCopy();
  initModals();
  initAOS();
  initTiltEffect();
});

/* ==========================================================================
   1. THEME MANAGER (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeManager() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

function setTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    const icon = document.querySelector('#theme-toggle i');
    if (icon) icon.className = 'fa-solid fa-sun';
  } else {
    document.documentElement.removeAttribute('data-theme');
    const icon = document.querySelector('#theme-toggle i');
    if (icon) icon.className = 'fa-solid fa-moon';
  }
  localStorage.setItem('portfolio-theme', theme);
}

/* ==========================================================================
   2. NAVBAR & MOBILE DRAWER & SCROLLSPY
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-link');

  // Sticky Navbar background shift on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Hamburger Toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close mobile nav on link click
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // Active Section Navigation Indicator using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    threshold: 0.25,
    rootMargin: '-80px 0px 0px 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkItems.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
}

/* ==========================================================================
   3. TYPED.JS EFFECT
   ========================================================================== */
function initTypedEffect() {
  const typedTarget = document.getElementById('typed-text');
  if (!typedTarget) return;

  if (typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
      strings: [
        'Full Stack Developer',
        'Web Developer',
        'Python Developer',
        'AI & ML Enthusiast'
      ],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 1800,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  } else {
    // Fallback typing implementation
    const words = [
      'Full Stack Developer',
      'Web Developer',
      'Python Developer',
      'AI & ML Enthusiast'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typedTarget.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedTarget.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 30 : 70;

      if (!isDeleting && charIndex === currentWord.length) {
        speed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500;
      }

      setTimeout(type, speed);
    }
    type();
  }
}

/* ==========================================================================
   4. PARTICLES CANVAS BACKGROUND
   ========================================================================== */
function initParticlesCanvas() {
  const container = document.getElementById('particles-js');
  if (!container) return;

  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: '#2563eb' },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#7c3aed',
          opacity: 0.18,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 180, line_linked: { opacity: 0.4 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  } else {
    // Custom High Performance Vanilla Canvas Particles Fallback
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1
    }));

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.35)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(renderCanvas);
    }
    renderCanvas();
  }
}

/* ==========================================================================
   5. SCROLL PROGRESS & CURSOR GLOW
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  let ticking = false;

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateProgress();
}

function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.innerWidth < 768) return;

  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

/* ==========================================================================
   6. STAT COUNTERS ANIMATION
   ========================================================================== */
function initStatCounters() {
  const counterElements = document.querySelectorAll('.stat-number');
  if (!counterElements.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterElements.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target') || '0', 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const speed = Math.max(1, Math.floor(target / 40));

          const updateCounter = () => {
            count += speed;
            if (count >= target) {
              counter.textContent = `${target}${suffix}`;
            } else {
              counter.textContent = `${count}${suffix}`;
              setTimeout(updateCounter, 30);
            }
          };
          updateCounter();
        });
      }
    });
  }, { threshold: 0.5 });

  const statsContainer = document.getElementById('hero-stats') || counterElements[0].parentElement;
  if (statsContainer) observer.observe(statsContainer);
}

/* ==========================================================================
   7. SKILLS FILTER & ANIMATED BARS
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills-filter .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Skill Fill Bars on Scroll
  const skillSection = document.getElementById('skills');
  if (skillSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.skill-bar-fill').forEach(fill => {
            const percent = fill.getAttribute('data-percent') || '0%';
            fill.style.width = percent;
          });
        }
      });
    }, { threshold: 0.2 });

    observer.observe(skillSection);
  }
}

/* ==========================================================================
   8. PROJECTS FILTER
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.projects-filter .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-project-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   9. GITHUB HEATMAP MATRIX GENERATOR
   ========================================================================== */
function initGitHubHeatmap() {
  const heatmapGrid = document.getElementById('heatmap-grid');
  if (!heatmapGrid) return;

  heatmapGrid.innerHTML = '';

  // Generate 52 weeks x 7 days cells
  for (let i = 0; i < 364; i++) {
    const cell = document.createElement('div');
    cell.className = 'heatmap-cell';

    // Weighted random contribution level
    const rand = Math.random();
    let level = 0;
    if (rand > 0.82) level = 4;
    else if (rand > 0.65) level = 3;
    else if (rand > 0.45) level = 2;
    else if (rand > 0.25) level = 1;

    if (level > 0) {
      cell.classList.add(`level-${level}`);
    }

    const commits = level * Math.floor(Math.random() * 4 + 1);
    cell.setAttribute('title', `${commits} contributions in week ${Math.floor(i / 7) + 1}`);

    heatmapGrid.appendChild(cell);
  }
}

/* ==========================================================================
   10. CONTACT FORM VALIDATION & POPUP
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const messageInput = document.getElementById('form-message');
  const charCounter = document.getElementById('char-count');

  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const count = messageInput.value.length;
      charCounter.textContent = `${count} / 500`;
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Show Success Modal
      const modal = document.getElementById('success-modal');
      if (modal) {
        modal.classList.add('active');
      } else {
        showToast('Message sent successfully! Sonu will contact you soon.', 'success');
      }

      contactForm.reset();
      if (charCounter) charCounter.textContent = '0 / 500';
    });
  }
}

function initEmailCopy() {
  const contactEmail = document.getElementById('contact-email');
  const copyBtn = document.getElementById('btn-copy-email');
  const emailTextEl = document.getElementById('email-address-text');
  const copyIcon = document.getElementById('copy-email-icon');

  if (!contactEmail) return;

  const getEmail = () => emailTextEl ? emailTextEl.textContent.trim() : 'sonukumar.dev@gmail.com';

  const performCopy = (e) => {
    const textToCopy = getEmail();

    const handleCopySuccess = () => {
      showToast('Copied! Email address copied to clipboard.', 'success');

      if (copyIcon) {
        copyIcon.className = 'fa-solid fa-check';
      }
      if (copyBtn) {
        copyBtn.classList.add('copied');
        copyBtn.setAttribute('title', 'Copied!');
      }

      setTimeout(() => {
        if (copyIcon) {
          copyIcon.className = 'fa-regular fa-copy';
        }
        if (copyBtn) {
          copyBtn.classList.remove('copied');
          copyBtn.setAttribute('title', 'Copy email address');
        }
      }, 2000);
    };

    const fallbackCopy = (text) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        handleCopySuccess();
      } catch (err) {
        showToast('Failed to copy email address.', 'error');
      }
      document.body.removeChild(textarea);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => handleCopySuccess())
        .catch(() => fallbackCopy(textToCopy));
    } else {
      fallbackCopy(textToCopy);
    }
  };

  contactEmail.addEventListener('click', performCopy);
  contactEmail.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      performCopy(e);
    }
  });
}

function showToast(msg, type = 'info') {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '2rem';
  toast.style.right = '2rem';
  toast.style.padding = '1rem 1.5rem';
  toast.style.borderRadius = '12px';
  toast.style.background = type === 'error' ? '#ef4444' : '#10b981';
  toast.style.color = '#ffffff';
  toast.style.fontWeight = '600';
  toast.style.zIndex = '10002';
  toast.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
  toast.textContent = msg;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ==========================================================================
   11. MODAL WINDOWS HANDLER
   ========================================================================== */
function initModals() {
  const modals = document.querySelectorAll('.modal-overlay');
  const closeBtns = document.querySelectorAll('.modal-close');

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modals.forEach(m => m.classList.remove('active'));
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(m => m.classList.remove('active'));
    }
  });

  // Resume Modal Trigger
  const resumeBtns = document.querySelectorAll('.open-resume-modal');
  const resumeModal = document.getElementById('resume-modal');

  resumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) resumeModal.classList.add('active');
    });
  });
}

/* ==========================================================================
   12. AOS (ANIMATE ON SCROLL) INITIALIZATION
   ========================================================================== */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }
}

/* ==========================================================================
   13. 3D CARD TILT EFFECT
   ========================================================================== */
function initTiltEffect() {
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.glass-card'), {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.15
    });
  }
}
