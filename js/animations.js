/* ============================================
   SCROLL REVEAL ANIMATION SYSTEM
   ============================================ */

(function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        var allReveals = document.querySelectorAll('[data-reveal]');
        allReveals.forEach(function (el) {
            el.classList.add('revealed');
        });

        var timelineItems = document.querySelectorAll('.timeline__item');
        timelineItems.forEach(function (el) {
            el.classList.add('revealed');
        });
        return;
    }

    function createObserver(selector, options) {
        var elements = document.querySelectorAll(selector);
        if (elements.length === 0) return;

        var defaultOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        var config = Object.assign({}, defaultOptions, options);

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, config);

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        createObserver('[data-reveal]');
        createObserver('.timeline__item', { rootMargin: '0px 0px -30px 0px' });
    });
})();
