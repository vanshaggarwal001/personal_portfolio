/* ==========================================================================
   Vansh Aggarwal — Portfolio
   Main JavaScript: navigation, theme, animations, GitHub API, contact form
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------------------------------------------------------------------
     1. LOADING SCREEN
  --------------------------------------------------------------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hidden'), 400);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => loader && loader.classList.add('hidden'), 2500);

  /* ---------------------------------------------------------------------
     2. AOS (Animate On Scroll) INIT
  --------------------------------------------------------------------- */
  if (window.AOS) {
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
  }

  /* ---------------------------------------------------------------------
     3. DARK / LIGHT MODE
  --------------------------------------------------------------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const THEME_KEY = 'va-theme';

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.classList.add('dark');
      if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      root.classList.remove('dark');
      if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  const savedTheme =
    localStorage.getItem(THEME_KEY) ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);

  themeToggle?.addEventListener('click', () => {
    const next = root.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  /* ---------------------------------------------------------------------
     4. STICKY NAVBAR + SCROLL SPY
  --------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    backToTop.classList.toggle('show', window.scrollY > 500);
  });

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          activeLink?.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => spyObserver.observe(s));

  /* ---------------------------------------------------------------------
     5. MOBILE NAV TOGGLE
  --------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinksList = document.getElementById('navLinks');

  navToggle?.addEventListener('click', () => {
    navLinksList.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });

  navLinksList?.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      navLinksList.classList.remove('open');
      navToggle.querySelector('i').className = 'fa-solid fa-bars';
    })
  );

  /* ---------------------------------------------------------------------
     6. CURSOR GLOW (desktop only)
  --------------------------------------------------------------------- */
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  }

  /* ---------------------------------------------------------------------
     7. TYPED.JS — ROTATING ROLE TITLES
  --------------------------------------------------------------------- */
  if (window.Typed) {
    new Typed('#typed', {
      strings: [
        'Software Engineer',
        'Full Stack Developer',
        'Java Programmer',
        'Problem Solver',
        'UI Designer',
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1400,
      loop: true,
      showCursor: false,
    });
  }

  /* ---------------------------------------------------------------------
     8. SKILLS — BARS & CIRCLES (animate when visible)
  --------------------------------------------------------------------- */
  const skillObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.querySelectorAll('.bar-skill').forEach((bs) => {
          const level = bs.dataset.level || 0;
          const fill = bs.querySelector('.fill');
          if (fill) fill.style.width = `${level}%`;
        });

        entry.target.querySelectorAll('.circle-skill').forEach((cs) => {
          const level = parseInt(cs.dataset.level || '0', 10);
          const prog = cs.querySelector('.prog');
          if (prog) {
            const circumference = 214; // matches stroke-dasharray in CSS
            const offset = circumference - (circumference * level) / 100;
            prog.style.strokeDashoffset = offset;
          }
        });

        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );
  document.querySelectorAll('.skill-group').forEach((g) => skillObserver.observe(g));

  /* ---------------------------------------------------------------------
     9. ANIMATED COUNTERS (statistics)
  --------------------------------------------------------------------- */
  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10) || 0;
        const duration = 1200;
        const startTime = performance.now();

        function tick(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          el.textContent = Math.floor(progress * target);
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll('.counter').forEach((c) => counterObserver.observe(c));

  /* ---------------------------------------------------------------------
     10. PROJECT FILTER + SEARCH
  --------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const searchInput = document.getElementById('projectSearch');
  const emptyState = document.getElementById('projectsEmpty');
  let activeFilter = 'all';

  function refreshProjects() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      const text = card.textContent.toLowerCase();
      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = !query || text.includes(query);
      const show = matchesFilter && matchesSearch;
      card.hidden = !show;
      if (show) visibleCount++;
    });

    if (emptyState) emptyState.hidden = visibleCount !== 0;
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      refreshProjects();
    });
  });

  searchInput?.addEventListener('input', refreshProjects);

  /* ---------------------------------------------------------------------
     11. TESTIMONIALS SLIDER
  --------------------------------------------------------------------- */
  const slides = document.querySelectorAll('.t-slide');
  const dotsWrap = document.getElementById('testimonialDots');
  let currentSlide = 0;
  let testimonialInterval;

  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap?.appendChild(dot);
  });
  const dots = dotsWrap ? dotsWrap.querySelectorAll('span') : [];

  function goToSlide(index) {
    slides[currentSlide]?.classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide]?.classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }

  document.querySelector('.t-prev')?.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
    restartAutoplay();
  });
  document.querySelector('.t-next')?.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
    restartAutoplay();
  });

  function restartAutoplay() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(() => goToSlide(currentSlide + 1), 5500);
  }
  if (slides.length) restartAutoplay();

  /* ---------------------------------------------------------------------
     12. BACK TO TOP
  --------------------------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------------------------------------------------------------------
     13. VISITOR COUNTER (local, placeholder — no backend)
  --------------------------------------------------------------------- */
  const VISIT_KEY = 'va-visit-count';
  const visitorCountEl = document.getElementById('visitorCount');
  if (visitorCountEl) {
    const count = (parseInt(localStorage.getItem(VISIT_KEY), 10) || 0) + 1;
    localStorage.setItem(VISIT_KEY, count);
    visitorCountEl.textContent = count;
  }

  /* ---------------------------------------------------------------------
     14. FOOTER YEAR
  --------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     15. CONTACT FORM — EmailJS (placeholder config)
     Replace SERVICE_ID, TEMPLATE_ID and PUBLIC_KEY with real EmailJS values.
  --------------------------------------------------------------------- */
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

  if (window.emailjs && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    const originalLabel = submitBtn.querySelector('.btn-text').textContent;
    submitBtn.querySelector('.btn-text').textContent = 'Sending...';

    const finish = (success, message) => {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = originalLabel;
      formStatus.textContent = message;
      formStatus.classList.add(success ? 'success' : 'error');
      if (success) contactForm.reset();
    };

    // If EmailJS has been configured with real keys, send via EmailJS.
    if (window.emailjs && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm).then(
        () => finish(true, 'Message sent successfully! I will get back to you soon.'),
        (err) => finish(false, 'Something went wrong. Please try emailing me directly.')
      );
    } else {
      // Fallback: no EmailJS keys configured yet — open a pre-filled mail client instead.
      const name = contactForm.user_name.value;
      const email = contactForm.user_email.value;
      const subject = contactForm.subject.value;
      const message = contactForm.message.value;
      const body = `From: ${name} (${email})%0D%0A%0D%0A${message}`;
      window.location.href = `mailto:va262687@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      finish(true, 'Opening your email client to send this message...');
    }
  });

  /* ---------------------------------------------------------------------
     16. GITHUB API INTEGRATION
  --------------------------------------------------------------------- */
  const GITHUB_USERNAME = 'vanshaggarwal001';

  fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((data) => {
      document.getElementById('ghAvatar').src = data.avatar_url;
      document.getElementById('ghName').textContent = data.name || data.login;
      document.getElementById('ghBio').textContent = data.bio || `${data.public_repos} public repositories on GitHub`;
      document.getElementById('ghRepos').textContent = data.public_repos ?? '—';
      document.getElementById('ghFollowers').textContent = data.followers ?? '—';
      document.getElementById('ghFollowing').textContent = data.following ?? '—';

      const statRepos = document.getElementById('statRepos');
      if (statRepos) statRepos.dataset.target = data.public_repos ?? statRepos.dataset.target;
    })
    .catch(() => {
      const ghBio = document.getElementById('ghBio');
      if (ghBio) ghBio.textContent = 'GitHub data unavailable right now — view the profile directly.';
    });

  fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((repos) => {
      const grid = document.getElementById('repoGrid');
      if (!grid) return;
      if (!Array.isArray(repos) || repos.length === 0) {
        grid.innerHTML = '<p class="muted">No public repositories found.</p>';
        return;
      }
      grid.innerHTML = repos
        .map(
          (repo) => `
          <div class="repo-card glass">
            <h4><i class="fa-solid fa-book"></i> ${repo.name}</h4>
            <p>${repo.description ? repo.description.slice(0, 80) : 'No description provided.'}</p>
            <div class="repo-meta">
              <span><i class="fa-regular fa-star"></i>${repo.stargazers_count}</span>
              <span><i class="fa-solid fa-code-fork"></i>${repo.forks_count}</span>
              <span>${repo.language || '—'}</span>
            </div>
          </div>`
        )
        .join('');
    })
    .catch(() => {
      const grid = document.getElementById('repoGrid');
      if (grid) grid.innerHTML = '<p class="muted">Could not load repositories right now. View the profile on GitHub directly.</p>';
    });

  /* ---------------------------------------------------------------------
     17. INITIAL PROJECT STATE
  --------------------------------------------------------------------- */
  refreshProjects();
});
