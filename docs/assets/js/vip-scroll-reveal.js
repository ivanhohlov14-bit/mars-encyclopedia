<!-- assets/js/vip-scroll-reveal.js -->
<script>
(function() {
  var style = document.createElement('style');
  style.textContent = `
    .vip-reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .vip-reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  function markElements() {
    // Ищем крупные блоки
    document.querySelectorAll('.pf-card, .wiki-block, .featured-card, .kings-section, h2, h3').forEach(function(el) {
      if (el.classList.contains('vip-reveal')) return;
      el.classList.add('vip-reveal');
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markElements);
  } else {
    markElements();
  }
  
  // SPA
  if (typeof document$ !== 'undefined' && document$.subscribe) {
    document$.subscribe(function() { setTimeout(markElements, 200); });
  }
})();
</script>
