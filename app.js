(function () {
  'use strict';

  /* ---------- Light/dark mode toggle ----------
     No browser storage persistence is used (it is unavailable in the
     sandboxed preview and is avoided site-wide). The theme follows the
     visitor's system preference on load and can be toggled for the
     current page view via the header button. */
  var themeToggle = document.getElementById('themeToggle');
  var htmlEl = document.documentElement;
  var userChoseTheme = false;

  function applyThemeUI(theme) {
    if (!themeToggle) return;
    var isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  var currentTheme = htmlEl.getAttribute('data-theme') || 'light';
  applyThemeUI(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      currentTheme = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', currentTheme);
      userChoseTheme = true;
      applyThemeUI(currentTheme);
    });
  }

  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var mqHandler = function (e) {
      if (userChoseTheme) return; // user has an explicit choice this session, stop following system
      var next = e.matches ? 'dark' : 'light';
      htmlEl.setAttribute('data-theme', next);
      applyThemeUI(next);
    };
    if (mq.addEventListener) mq.addEventListener('change', mqHandler);
    else if (mq.addListener) mq.addListener(mqHandler);
  }

  /* ---------- Sticky header: always visible while scrolling ---------- */
  var header = document.getElementById('site-header');
  window.addEventListener(
    'scroll',
    function () {
      var y = window.scrollY;
      if (y > 40) header.classList.add('header--scrolled');
      else header.classList.remove('header--scrolled');
    },
    { passive: true }
  );

  /* ---------- Mobile menu toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.innerHTML = isOpen
        ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>'
        : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Sidebar active-section highlighting ---------- */
  var sidebarLinks = document.querySelectorAll('.sidebar-link[data-section]');
  if (sidebarLinks.length && 'IntersectionObserver' in window) {
    var sectionEls = [];
    sidebarLinks.forEach(function (link) {
      var id = link.getAttribute('data-section');
      var el = document.getElementById(id);
      if (el) sectionEls.push(el);
    });
    var sidebarIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.id;
          var link = document.querySelector('.sidebar-link[data-section="' + id + '"]');
          if (!link) return;
          if (entry.isIntersecting) {
            sidebarLinks.forEach(function (l) {
              l.classList.remove('is-active');
            });
            link.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    sectionEls.forEach(function (el) {
      sidebarIO.observe(el);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Animated stat counters ---------- */
  var statEls = document.querySelectorAll('.stat-num[data-count]');
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && statEls.length) {
    var statIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statEls.forEach(function (el) {
      statIO.observe(el);
    });
  } else {
    statEls.forEach(animateCount);
  }

  /* ---------- Schedule assessment ---------- */
  var assessmentForm = document.getElementById('assessmentForm');
  if (assessmentForm) {
    var paths = {
      start: {
        tier: 'Path 1 · Beginner',
        title: 'START',
        desc: "Learn core AI tools and safe, practical prompting — no prior experience required."
      },
      apply: {
        tier: 'Path 2 · Intermediate',
        title: 'APPLY',
        desc: 'Build workflows for business, operations, and education you can use Monday morning.'
      },
      build: {
        tier: 'Path 3 · Advanced',
        title: 'BUILD',
        desc: 'Create agents, automations, and AI-enabled systems that run without you in the loop.'
      }
    };

    assessmentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(assessmentForm);
      var comfort = data.get('comfort');
      var goal = data.get('goal');
      var tier = data.get('tier');

      var scores = { start: 0, apply: 0, build: 0 };
      if (comfort && scores.hasOwnProperty(comfort)) scores[comfort] += 1;
      if (goal && scores.hasOwnProperty(goal)) scores[goal] += 2; // goal counts more toward the recommendation

      var top = 'apply';
      var best = -1;
      Object.keys(scores).forEach(function (key) {
        if (scores[key] > best) {
          best = scores[key];
          top = key;
        }
      });

      var chosen = paths[top];
      document.getElementById('resultTierLabel').textContent = chosen.tier;
      document.getElementById('resultTitle').textContent = chosen.title;
      document.getElementById('resultDesc').textContent = chosen.desc;

      var noteEl = document.getElementById('resultTierNote');
      if (tier === 'general') {
        noteEl.textContent = 'Heads up: Day One Masterclasses are reserved for ICON Tier and up — upgrade your ticket if you want in.';
      } else {
        noteEl.textContent = 'Your ticket includes Day One Masterclass access — look for it once the full schedule is confirmed.';
      }

      var resultEl = document.getElementById('assessmentResult');
      resultEl.hidden = false;
      resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ---------- Routed contact tabs (Attendee / Exhibitor / Sponsor / Trainer) ---------- */
  var contactTabs = document.querySelectorAll('.contact-tab[data-contact-tab]');
  var contactPanels = document.querySelectorAll('.contact-panel[data-contact-panel]');

  function activateContactTab(key) {
    if (!key) return;
    contactTabs.forEach(function (tab) {
      var isMatch = tab.getAttribute('data-contact-tab') === key;
      tab.classList.toggle('is-active', isMatch);
      tab.setAttribute('aria-selected', String(isMatch));
    });
    contactPanels.forEach(function (panel) {
      var isMatch = panel.getAttribute('data-contact-panel') === key;
      panel.classList.toggle('is-active', isMatch);
      panel.hidden = !isMatch;
    });
  }

  contactTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activateContactTab(tab.getAttribute('data-contact-tab'));
    });
  });

  // "One Event, Five Ways In" cards deep-link into a specific contact tab.
  document.querySelectorAll('[data-contact-tab-target]').forEach(function (link) {
    link.addEventListener('click', function () {
      activateContactTab(link.getAttribute('data-contact-tab-target'));
    });
  });
  
  const heroSlides = document.querySelectorAll('.hero-bg-slide');
  
  if (heroSlides.length > 1) {
    let currentHeroSlide = 0;
  
    setInterval(() => {
      heroSlides[currentHeroSlide].classList.remove('active');
  
      currentHeroSlide =
        (currentHeroSlide + 1) % heroSlides.length;
  
      heroSlides[currentHeroSlide].classList.add('active');
    }, 7000);
  }

  document.querySelectorAll('.contact-panel').forEach(function (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
  
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      const data = new FormData(form);
  
      btn.textContent = 'Sending...';
      btn.disabled = true;
  
      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams(data).toString()
        });
  
        if (!response.ok) {
          throw new Error('Form submission failed');
        }
  
        btn.textContent = 'Message Sent ✓';
        form.reset();
  
        setTimeout(function () {
          btn.textContent = original;
          btn.disabled = false;
        }, 3000);
  
      } catch (error) {
        console.error(error);
        btn.textContent = 'Try Again';
        btn.disabled = false;
      }
    });
  });
})();
