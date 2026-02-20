/* ============================================
   MAIN.JS - Core Functionality
   Gabriel Aragao Santos Portfolio
   ============================================ */

(function () {
    'use strict';

    /* --- Theme Toggle --- */
    function initTheme() {
        var toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        var savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.documentElement.setAttribute('data-theme', 'light');
        }

        toggle.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    /* --- Sticky Navigation --- */
    function initStickyNav() {
        var nav = document.getElementById('nav');
        if (!nav) return;

        var scrollThreshold = 50;

        function onScroll() {
            if (window.scrollY > scrollThreshold) {
                nav.classList.add('nav--scrolled');
            } else {
                nav.classList.remove('nav--scrolled');
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* --- Scroll Spy --- */
    function initScrollSpy() {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.nav__link');

        if (sections.length === 0 || navLinks.length === 0) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute('id');
                    navLinks.forEach(function (link) {
                        link.classList.remove('nav__link--active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('nav__link--active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-' + (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72) + 'px 0px -40% 0px'
        });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    /* --- Mobile Menu --- */
    function initMobileMenu() {
        var hamburger = document.getElementById('nav-hamburger');
        var menu = document.getElementById('nav-menu');
        if (!hamburger || !menu) return;

        var overlay = document.createElement('div');
        overlay.className = 'nav__overlay';
        document.body.appendChild(overlay);

        function toggleMenu() {
            var isOpen = menu.classList.contains('nav__menu--open');
            menu.classList.toggle('nav__menu--open');
            hamburger.classList.toggle('nav__hamburger--active');
            hamburger.setAttribute('aria-expanded', String(!isOpen));
            document.body.classList.toggle('menu-open');
            overlay.classList.toggle('nav__overlay--visible');
        }

        function closeMenu() {
            menu.classList.remove('nav__menu--open');
            hamburger.classList.remove('nav__hamburger--active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
            overlay.classList.remove('nav__overlay--visible');
        }

        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', closeMenu);

        var menuLinks = menu.querySelectorAll('.nav__link');
        menuLinks.forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
    }

    /* --- Typing Effect --- */
    function initTypingEffect() {
        var element = document.getElementById('typing-text');
        if (!element) return;

        var texts = [
            'Projetista BIM',
            'BIM Manager',
            'Coordenador BIM',
            'Desenvolvedor de Plugins',
            'Especialista em Infraestrutura',
            'Renderizacao 3D'
        ];
        var textIndex = 0;
        var charIndex = 0;
        var isDeleting = false;
        var typingSpeed = 80;
        var deletingSpeed = 40;
        var pauseAfterType = 2000;
        var pauseAfterDelete = 500;

        function type() {
            var currentText = texts[textIndex];

            if (!isDeleting) {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(type, pauseAfterType);
                    return;
                }
                setTimeout(type, typingSpeed);
            } else {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(type, pauseAfterDelete);
                    return;
                }
                setTimeout(type, deletingSpeed);
            }
        }

        setTimeout(type, 1000);
    }

    /* --- Counter Animation --- */
    function initCounters() {
        var counters = document.querySelectorAll('[data-count]');
        if (counters.length === 0) return;

        var animated = false;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        var statsContainer = document.querySelector('.sobre__stats');
        if (statsContainer) {
            observer.observe(statsContainer);
        }

        function animateCounters() {
            counters.forEach(function (counter) {
                var target = parseInt(counter.getAttribute('data-count'));
                var duration = 2000;
                var startTime = null;

                function animate(currentTime) {
                    if (!startTime) startTime = currentTime;
                    var progress = Math.min((currentTime - startTime) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3);
                    counter.textContent = Math.floor(eased * target);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(animate);
            });
        }
    }

    /* --- Smooth Scroll for anchor links --- */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;

                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    /* --- Initialize Everything --- */
    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        initStickyNav();
        initScrollSpy();
        initMobileMenu();
        initTypingEffect();
        initCounters();
        initSmoothScroll();
    });
})();
