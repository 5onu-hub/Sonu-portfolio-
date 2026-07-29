/**
 * ==========================================================================
 * SONU KUMAR - PORTFOLIO INTERACTIVE SCRIPT
 * Vanilla JS ES6 Engine with Particle Canvas, Typed Text, Theme Manager & Scrollspy
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Tech-Themed Fullscreen Preloader First
  initPreloader();

  // Initialize All Core Modules
  initProfilePhotoManager();
  initThemeManager();
  initNavbarScroll();
  initTypedEffect();
  initParticlesCanvas();
  initScrollProgress();
  initCursorGlow();
  initStatCounters();
  initSkillsFilter();
  initSkillCredentials();
  initProjectsFilter();
  initGitHubHeatmap();
  initContactForm();
  initEmailCopy();
  initModals();
  initAOS();
  initTiltEffect();
  initButtonRipples();
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

  // Sticky Navbar background shift and auto-hide on scroll down
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (currentScrollY > 120 && currentScrollY > lastScrollY && (!navLinks || !navLinks.classList.contains('active'))) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

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
   7. SKILLS FILTER & INTERACTIVE CARDS
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
}

/* Skill Credential Verification Data */
const SKILL_CREDENTIALS = {
  'react': {
    title: 'Meta React Developer Certificate',
    issuer: 'Issued by Meta & Coursera',
    iconClass: 'fa-brands fa-react',
    iconColor: '#61dafb',
    iconBg: 'rgba(97, 218, 251, 0.12)',
    credId: 'META-REACT-883921',
    date: 'October 2024',
    tags: ['JSX & Virtual DOM', 'React Hooks', 'Redux State Engine', 'REST & GraphQL', 'Performance Optimization'],
    desc: 'Demonstrates professional proficiency in building scalable single-page web applications, custom hooks architecture, client-side routing, state management with Redux, and modern component design patterns.',
    link: 'https://www.coursera.org/account/accomplishments/professional-cert/meta-react'
  },
  'js': {
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'Issued by freeCodeCamp',
    iconClass: 'fa-brands fa-js',
    iconColor: '#f7df1e',
    iconBg: 'rgba(247, 223, 30, 0.12)',
    credId: 'FCC-JS-773820',
    date: 'July 2024',
    tags: ['ES6+ Syntax', 'Async / Promises / Await', 'DOM API', 'Functional Programming', 'Data Structures'],
    desc: 'Validates deep knowledge of core JavaScript concepts including prototype chain, closures, event loop runtime, asynchronous operations, regex, object-oriented programming, and algorithmic problem solving.',
    link: 'https://www.freecodecamp.org/certification/fcc-js'
  },
  'html-css': {
    title: 'Responsive Web Design Specialist',
    issuer: 'Issued by W3C & freeCodeCamp',
    iconClass: 'fa-brands fa-html5',
    iconColor: '#e34f26',
    iconBg: 'rgba(227, 79, 38, 0.12)',
    credId: 'W3C-HTML5-559124',
    date: 'May 2024',
    tags: ['Semantic HTML5', 'CSS Grid & Flexbox', 'Media Queries', 'Web Accessibility (WCAG)', 'Keyframe Animations'],
    desc: 'Certified mastery in structuring accessible, semantic web content and crafting responsive, high-performance visual layouts using advanced modern CSS features.',
    link: 'https://www.w3.org/certificates/responsive-web-design'
  },
  'tailwind': {
    title: 'Advanced Tailwind CSS Design Systems',
    issuer: 'Issued by Frontend Masters',
    iconClass: 'fa-solid fa-wind',
    iconColor: '#38bdf8',
    iconBg: 'rgba(56, 189, 248, 0.12)',
    credId: 'FM-TW-992813',
    date: 'December 2024',
    tags: ['Utility-First Engine', 'JIT Compiler', 'Custom Themes', 'Responsive Systems', 'Dark Mode Architecture'],
    desc: 'Certification in building custom, scalable design systems and utility-driven user interfaces with low visual debt and seamless dark mode theme support.',
    link: 'https://frontendmasters.com/courses/tailwind-css/'
  },
  'python-back': {
    title: 'Google IT Automation with Python',
    issuer: 'Issued by Google via Coursera',
    iconClass: 'fa-brands fa-python',
    iconColor: '#3776ab',
    iconBg: 'rgba(55, 118, 171, 0.12)',
    credId: 'GOOG-PY-339210',
    date: 'August 2024',
    tags: ['Python 3 Backend', 'Automating System Tasks', 'Git & Version Control', 'OOP', 'HTTP Requests & APIs'],
    desc: 'Proves advanced capability in writing Python server scripts, backend automation tools, interacting with system resources, and managing software projects.',
    link: 'https://www.coursera.org/account/accomplishments/specialization/google-it-automation'
  },
  'fastapi': {
    title: 'High-Performance Async APIs with FastAPI',
    issuer: 'Issued by TestDriven.io',
    iconClass: 'fa-solid fa-bolt',
    iconColor: '#009688',
    iconBg: 'rgba(0, 150, 136, 0.12)',
    credId: 'TD-FAST-128490',
    date: 'November 2024',
    tags: ['AsyncIO Engine', 'Pydantic Data Models', 'OpenAPI / Swagger Specs', 'OAuth2 / JWT Auth', 'Dependency Injection'],
    desc: 'Validates skills in building ultra-fast asynchronous Python REST APIs utilizing Pydantic data validation, auto-generated OpenAPI documentation, and OAuth2 security.',
    link: 'https://testdriven.io/courses/fastapi-crud/'
  },
  'flask': {
    title: 'Python Web Development with Flask',
    issuer: 'Issued by Udacity',
    iconClass: 'fa-solid fa-server',
    iconColor: '#38bdf8',
    iconBg: 'rgba(56, 189, 248, 0.12)',
    credId: 'UDA-FLASK-442819',
    date: 'June 2024',
    tags: ['Werkzeug WSGI', 'Jinja2 Templating', 'SQLAlchemy ORM', 'Application Factories', 'REST Routing'],
    desc: 'Certifies competency in building lightweight, modular Python web microservices, configuring database ORM connections, and handling route authorization.',
    link: 'https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd0044'
  },
  'node': {
    title: 'Node.js Application Developer (JSNAD)',
    issuer: 'Issued by OpenJS Foundation & Linux Foundation',
    iconClass: 'fa-brands fa-node-js',
    iconColor: '#539e43',
    iconBg: 'rgba(83, 158, 67, 0.12)',
    credId: 'LF-JSNAD-619283',
    date: 'September 2024',
    tags: ['Event Loop & Async I/O', 'Express.js Middleware', 'Streams & Buffers', 'RESTful API Services', 'Security Best Practices'],
    desc: 'Official certification demonstrating high competency in developing event-driven, non-blocking asynchronous Node.js backend servers and Express API microservices.',
    link: 'https://training.linuxfoundation.org/certification/jsnad/'
  },
  'firebase': {
    title: 'Google Cloud Certified Firebase Architect',
    issuer: 'Issued by Google Cloud',
    iconClass: 'fa-solid fa-fire',
    iconColor: '#ffca28',
    iconBg: 'rgba(255, 202, 40, 0.12)',
    credId: 'GCP-FIRE-881290',
    date: 'January 2025',
    tags: ['Firestore NoSQL DB', 'Firebase Authentication', 'Security Rules Engine', 'Cloud Functions', 'Realtime Sync'],
    desc: 'Validates experience in configuring secure Firebase serverless backends, multi-provider OAuth authentication, real-time listeners, and granular database security rules.',
    link: 'https://cloud.google.com/certifications/firebase'
  },
  'mysql': {
    title: 'Oracle Certified Professional: MySQL Developer',
    issuer: 'Issued by Oracle University',
    iconClass: 'fa-solid fa-database',
    iconColor: '#4479a1',
    iconBg: 'rgba(68, 121, 161, 0.12)',
    credId: 'ORCL-SQL-448201',
    date: 'April 2024',
    tags: ['Relational Schema Design', 'Complex SQL Joins & Indexing', 'Stored Procedures', 'Transactions & ACID', 'Database Optimization'],
    desc: 'Recognized industry certification for database design, writing complex SQL queries, query performance optimization, transactions, and foreign key relations.',
    link: 'https://education.oracle.com/mysql-database-developer/trackp_361'
  },
  'python-prog': {
    title: 'Python Software Engineering & Data Structures',
    issuer: 'Issued by HackerRank & DataCamp',
    iconClass: 'fa-brands fa-python',
    iconColor: '#3776ab',
    iconBg: 'rgba(55, 118, 171, 0.12)',
    credId: 'HR-PY-552918',
    date: 'March 2024',
    tags: ['Algorithmic Logic', 'Data Structures', 'OOP Inheritance', 'File I/O & Parsing', 'Unit Testing'],
    desc: 'Gold standard verification in Python algorithmic thinking, custom data structures implementation, exception handling, and clean code principles.',
    link: 'https://www.hackerrank.com/certificates/python_basic'
  },
  'js-prog': {
    title: 'Advanced JavaScript Engine & Performance',
    issuer: 'Issued by Scrimba',
    iconClass: 'fa-brands fa-js',
    iconColor: '#f7df1e',
    iconBg: 'rgba(247, 223, 30, 0.12)',
    credId: 'SCR-JS-339102',
    date: 'August 2024',
    tags: ['Event Loop Mechanics', 'Garbage Collection', 'Functional Programming', 'Custom Promises', 'V8 Optimization'],
    desc: 'Deep-dive certification into V8 JavaScript engine internals, memory management, event loop queue execution, closures, and high-performance JS execution.',
    link: 'https://scrimba.com/learn/frontend'
  },
  'java': {
    title: 'Java SE 17 Developer Certified Associate',
    issuer: 'Issued by Oracle',
    iconClass: 'fa-brands fa-java',
    iconColor: '#f89820',
    iconBg: 'rgba(248, 152, 32, 0.12)',
    credId: 'ORCL-JAVA17-902183',
    date: 'February 2024',
    tags: ['Core Java SE 17', 'Collections Framework', 'Multithreading & Concurrency', 'Generics & Streams', 'OOP Architecture'],
    desc: 'Official Oracle certification covering Java SE 17 features, object-oriented software engineering, stream API transformations, multithreading, and memory safety.',
    link: 'https://education.oracle.com/java-se-17-developer/pexam_1Z0-829'
  },
  'cpp': {
    title: 'Systems Programming & C/C++ Optimization',
    issuer: 'Issued by NPTEL & IIT Kharagpur',
    iconClass: 'fa-solid fa-code',
    iconColor: '#00599c',
    iconBg: 'rgba(0, 89, 156, 0.12)',
    credId: 'NPTEL-CPP-110293',
    date: 'January 2024',
    tags: ['Pointers & Dynamic Memory', 'STL Containers', 'Low-Level Optimization', 'Object-Oriented C++', 'Systems Architecture'],
    desc: 'Academic certification validating precision in manual memory allocation, pointers, C++ Standard Template Library (STL), and low-level computational efficiency.',
    link: 'https://nptel.ac.in/noc/courses/noc24/SEM1/noc24-cs12'
  },
  'git': {
    title: 'Git Version Control & Branching Workflows',
    issuer: 'Issued by Atlassian via Coursera',
    iconClass: 'fa-brands fa-git-alt',
    iconColor: '#f05032',
    iconBg: 'rgba(240, 80, 50, 0.12)',
    credId: 'ATL-GIT-882031',
    date: 'May 2024',
    tags: ['Branching Strategies', 'Interactive Rebase', 'Conflict Resolution', 'Git Hooks', 'Distributed Workflows'],
    desc: 'Demonstrates professional proficiency with Git CLI operations, rebasing, bisecting, branch isolation, merge conflict resolution, and repository maintenance.',
    link: 'https://www.coursera.org/learn/version-control-with-git'
  },
  'github': {
    title: 'GitHub Foundations Certification',
    issuer: 'Issued by GitHub',
    iconClass: 'fa-brands fa-github',
    iconColor: '#a855f7',
    iconBg: 'rgba(168, 85, 247, 0.12)',
    credId: 'GH-FOUND-772819',
    date: 'November 2024',
    tags: ['Pull Request Reviews', 'GitHub Actions CI/CD', 'Code Security & Dependabot', 'Markdown Documentation', 'Projects & Issues'],
    desc: 'Official GitHub certification covering modern collaborative workflows, automated CI/CD pipelines with GitHub Actions, secret protection, and repository administration.',
    link: 'https://resources.github.com/learn/certificates/'
  },
  'vscode': {
    title: 'Advanced VS Code Dev Environment',
    issuer: 'Issued by Microsoft Learn',
    iconClass: 'fa-solid fa-code',
    iconColor: '#007acc',
    iconBg: 'rgba(0, 122, 204, 0.12)',
    credId: 'MSFT-VSC-110293',
    date: 'December 2024',
    tags: ['Integrated Debugger', 'Remote Containers / SSH', 'Custom Snippets', 'Workspaces', 'Extension Ecosystem'],
    desc: 'Certifies productivity and advanced configuration mastery in Visual Studio Code, breakout debugging, remote container development, and custom extension workflows.',
    link: 'https://learn.microsoft.com/en-us/training/modules/visual-studio-code-intro/'
  },
  'postman': {
    title: 'Postman API Student Expert & Test Automation',
    issuer: 'Issued by Postman',
    iconClass: 'fa-solid fa-paper-plane',
    iconColor: '#ff6c37',
    iconBg: 'rgba(255, 108, 55, 0.12)',
    credId: 'POSTMAN-EXP-449102',
    date: 'September 2024',
    tags: ['API Endpoint Testing', 'Environment Variables', 'Newman CLI Runner', 'Mock Servers', 'Automated Test Scripts'],
    desc: 'Official Postman credential recognizing expertise in crafting automated REST API test suites, configuring environments, simulating endpoints with mock servers, and CI/CD collection execution.',
    link: 'https://badgr.com/public/assertions/postman-student-expert'
  },
  'figma': {
    title: 'UI/UX Prototyping & Design Systems',
    issuer: 'Issued by Google UX Design Certificate',
    iconClass: 'fa-brands fa-figma',
    iconColor: '#f24e1e',
    iconBg: 'rgba(242, 78, 30, 0.12)',
    credId: 'GOOG-UX-881029',
    date: 'July 2024',
    tags: ['Wireframing & Layout', 'Auto Layout 5.0', 'Component Variants', 'Interactive Prototypes', 'Design System Tokens'],
    desc: 'Certification in constructing high-fidelity UI mockups, flexible Auto Layout components, design tokens, responsive breakpoints, and interactive click-through prototypes in Figma.',
    link: 'https://www.coursera.org/account/accomplishments/specialization/google-ux-design'
  },
  'gemini': {
    title: 'Google AI Studio & Gemini API Certification',
    issuer: 'Issued by Google Cloud',
    iconClass: 'fa-solid fa-brain',
    iconColor: '#8b5cf6',
    iconBg: 'rgba(139, 92, 246, 0.12)',
    credId: 'GCP-GEMINI-992014',
    date: 'February 2025',
    tags: ['Gemini 2.5/3.0 Models', 'Function Calling', 'Structured JSON Schema', 'Multimodal Prompting', 'AI Agent Workflows'],
    desc: 'Certified expertise in building full-stack applications with Google AI Studio and the @google/genai TypeScript SDK, utilizing function calling, context caching, and agentic workflows.',
    link: 'https://cloud.google.com/products/gemini'
  }
};

function initSkillCredentials() {
  const credentialBtns = document.querySelectorAll('.skill-credential-btn');
  const modal = document.getElementById('credential-modal');
  if (!modal) return;

  const iconEl = document.getElementById('cred-modal-icon');
  const iconWrap = document.getElementById('cred-modal-icon-wrap');
  const titleEl = document.getElementById('cred-modal-title');
  const issuerEl = document.getElementById('cred-modal-issuer');
  const idEl = document.getElementById('cred-modal-id');
  const dateEl = document.getElementById('cred-modal-date');
  const tagsEl = document.getElementById('cred-modal-tags');
  const descEl = document.getElementById('cred-modal-desc');
  const verifyLink = document.getElementById('cred-modal-verify-btn');

  credentialBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const credKey = btn.getAttribute('data-credential');
      const data = SKILL_CREDENTIALS[credKey];

      if (!data) return;

      if (iconEl) iconEl.className = data.iconClass;
      if (iconWrap) {
        iconWrap.style.color = data.iconColor;
        iconWrap.style.background = data.iconBg;
        iconWrap.style.borderColor = data.iconColor + '40';
      }
      if (titleEl) titleEl.textContent = data.title;
      if (issuerEl) issuerEl.textContent = data.issuer;
      if (idEl) idEl.textContent = data.credId;
      if (dateEl) dateEl.textContent = data.date;
      if (descEl) descEl.textContent = data.desc;
      if (verifyLink) verifyLink.href = data.link;

      if (tagsEl) {
        tagsEl.innerHTML = data.tags.map(t => `<span class="cred-tag"><i class="fa-solid fa-check"></i> ${t}</span>`).join('');
      }

      modal.classList.add('active');
    });
  });
}

/* ==========================================================================
   8. PROJECTS FILTER & SEARCH ENGINE
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('#projects-filter .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const searchInput = document.getElementById('project-search-input');
  const searchClear = document.getElementById('project-search-clear');

  let activeCategory = 'all';
  let searchQuery = '';

  const applyFilters = () => {
    let visibleCount = 0;

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.project-desc')?.textContent.toLowerCase() || '';
      const techTags = Array.from(card.querySelectorAll('.tech-tag')).map(t => t.textContent.toLowerCase()).join(' ');

      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
      const matchesSearch = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery) || techTags.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Handle empty search results feedback card
    const projectsGrid = document.getElementById('projects-grid');
    let emptyMsg = document.getElementById('no-projects-found');
    if (visibleCount === 0 && projectsGrid) {
      if (!emptyMsg) {
        emptyMsg = document.createElement('div');
        emptyMsg.id = 'no-projects-found';
        emptyMsg.className = 'glass-card';
        emptyMsg.style.gridColumn = '1 / -1';
        emptyMsg.style.padding = '3rem 2rem';
        emptyMsg.style.textAlign = 'center';
        emptyMsg.style.margin = '2rem auto';
        emptyMsg.style.width = '100%';
        emptyMsg.innerHTML = `<i class="fa-solid fa-folder-open" style="font-size: 2.5rem; color: var(--primary); margin-bottom: 1rem;"></i><h3 style="font-size: 1.25rem;">No matching projects found</h3><p style="color: var(--text-secondary); margin-top: 0.5rem;">Try adjusting your keyword or switching filter categories.</p>`;
        projectsGrid.appendChild(emptyMsg);
      } else {
        emptyMsg.style.display = 'block';
      }
    } else if (emptyMsg) {
      emptyMsg.style.display = 'none';
    }
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-project-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      if (searchClear) {
        searchClear.style.display = searchQuery ? 'block' : 'none';
      }
      applyFilters();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        searchClear.style.display = 'none';
        applyFilters();
        searchInput.focus();
      }
    });
  }
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

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnContent = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.8';
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Sending...</span>`;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.innerHTML = originalBtnContent;
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
      }, 800);
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

/* ==========================================================================
   14. INTERACTIVE BUTTON RIPPLE EFFECT
   ========================================================================== */
function initButtonRipples() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline, .project-btn, .filter-btn');
  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      const rect = button.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-effect');

      const existingRipple = button.querySelector('.ripple-effect');
      if (existingRipple) {
        existingRipple.remove();
      }

      button.appendChild(circle);
    });
  });
}

/* ==========================================================================
   15. PREMIUM TECH-THEMED LOADING OVERLAY ENGINE
   ========================================================================== */
function initPreloader() {
  const loader = document.getElementById('tech-loader');
  if (!loader) return;

  const hasLoadedBefore = sessionStorage.getItem('portfolio_preloaded');

  if (hasLoadedBefore === 'true') {
    loader.style.display = 'none';
    document.body.classList.remove('is-loading');

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.classList.add('hero-revealed');
    }
    return;
  }

  document.body.classList.add('is-loading');

  const textEl = document.getElementById('loader-text');
  const fillEl = document.getElementById('loader-progress-fill');
  const percentEl = document.getElementById('loader-percentage');

  const statusMessages = [
    { threshold: 0, text: 'Initializing...' },
    { threshold: 22, text: 'Loading Portfolio...' },
    { threshold: 45, text: 'Loading Projects...' },
    { threshold: 68, text: 'Loading Skills...' },
    { threshold: 88, text: 'Almost Ready...' },
    { threshold: 100, text: 'Welcome!' }
  ];

  let currentStepIndex = -1;
  const totalDuration = 1800; // Snappy 1.8 second loading sequence
  const startTime = performance.now();

  const updateProgress = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(100, Math.floor((elapsed / totalDuration) * 100));

    if (fillEl) {
      fillEl.style.width = `${progress}%`;
    }
    if (percentEl) {
      percentEl.textContent = `${progress}%`;
    }

    // Determine status text
    let newIndex = 0;
    for (let i = statusMessages.length - 1; i >= 0; i--) {
      if (progress >= statusMessages[i].threshold) {
        newIndex = i;
        break;
      }
    }

    if (newIndex !== currentStepIndex && textEl) {
      currentStepIndex = newIndex;
      textEl.style.opacity = '0';
      textEl.style.transform = 'translateY(4px)';

      setTimeout(() => {
        if (textEl) {
          textEl.textContent = statusMessages[newIndex].text;
          textEl.style.opacity = '1';
          textEl.style.transform = 'translateY(0)';
        }
      }, 70);
    }

    if (progress < 100) {
      requestAnimationFrame(updateProgress);
    } else {
      // Completed loading sequence
      setTimeout(() => {
        loader.classList.add('loader-done');
        document.body.classList.remove('is-loading');
        sessionStorage.setItem('portfolio_preloaded', 'true');

        // Smooth upward reveal animation for hero
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
          heroContent.classList.add('hero-revealed');
        }

        setTimeout(() => {
          loader.style.display = 'none';
        }, 850);
      }, 250);
    }
  };

  requestAnimationFrame(updateProgress);
}

/* ==========================================================================
   PROFILE PHOTO MANAGER (Custom Photo Upload & Local Storage Persistence)
   ========================================================================== */
function initProfilePhotoManager() {
  const profileImg = document.getElementById('img-profile');
  const photoInput = document.getElementById('profile-image-upload');
  if (!profileImg) return;

  // Restore saved photo if present
  const savedPhoto = localStorage.getItem('sonu_profile_photo');
  if (savedPhoto) {
    profileImg.src = savedPhoto;
  }

  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target.result;
          profileImg.src = result;
          try {
            localStorage.setItem('sonu_profile_photo', result);
          } catch (err) {
            console.warn('LocalStorage size limit exceeded for profile photo');
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

