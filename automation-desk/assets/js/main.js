/* AUTOMATION DESK — interacciones compartidas */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.rv');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- menú móvil ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  var menuClose = document.querySelector('.mobile-menu-close');
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('open', open);
    if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open && menuClose) menuClose.focus();
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(true); });
    if (menuClose) menuClose.addEventListener('click', function () { setMenu(false); });
    menu.addEventListener('click', function (e) { if (e.target === menu) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
    });
  }

  /* ---------- lightbox (galería) ---------- */
  var lb = document.querySelector('.lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.cap');
    var lbClose = lb.querySelector('.lightbox-close');
    var lastFocus = null;
    function openLb(src, cap, trigger) {
      lastFocus = trigger || null;
      lbImg.src = src;
      lbImg.alt = cap || '';
      lbCap.textContent = cap || '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    }
    function closeLb() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }
    document.querySelectorAll('.g-item').forEach(function (item) {
      function trigger() {
        var img = item.querySelector('img');
        var cap = item.querySelector('figcaption b');
        openLb(img.src, cap ? cap.textContent : img.alt, item);
      }
      item.addEventListener('click', trigger);
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
      });
    });
    lbClose.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('open')) closeLb();
    });
  }

  /* ---------- dibujo de cables SVG ligado al scroll ---------- */
  var wires = document.querySelectorAll('.dg-wire');
  if (wires.length && !reduceMotion) {
    wires.forEach(function (w) {
      var len = w.getTotalLength();
      w.style.strokeDasharray = len;
      w.style.strokeDashoffset = len;
    });
    var diagram = document.querySelector('.diagram-wrap');
    function drawWires() {
      var r = diagram.getBoundingClientRect();
      var vh = window.innerHeight;
      // progreso 0→1 mientras el diagrama cruza el viewport
      var p = (vh * 0.85 - r.top) / (vh * 0.7);
      p = Math.max(0, Math.min(1, p));
      wires.forEach(function (w) {
        var len = w.getTotalLength();
        w.style.strokeDashoffset = len * (1 - p);
      });
    }
    var ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () { drawWires(); ticking = false; });
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    drawWires();
  }

  /* ---------- año en footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
