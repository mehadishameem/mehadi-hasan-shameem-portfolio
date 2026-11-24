/**
 * Viewport & Motion Engine (Inspired by Robb Owen's Tornis)
 * Handles:
 * - data-prlx: Parallax scroll transforms
 * - data-drift: Micro-displacement based on cursor coords & orientation
 * - data-reveal: Smooth viewport intersection reveals
 */

export class ScrollStoryEngine {
  constructor() {
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, normX: 0, normY: 0 };
    this.scroll = { y: window.scrollY };
    this.size = { width: window.innerWidth, height: window.innerHeight };

    this.prlxElements = [];
    this.driftElements = [];

    this.init();
  }

  init() {
    this.refreshElements();
    this.initObserver();
    this.bindEvents();
    this.loop();
  }

  refreshElements() {
    this.prlxElements = Array.from(document.querySelectorAll('[data-prlx]')).map((el) => {
      const parts = (el.dataset.prlx || '0 0').split(' ').map(Number);
      return { el, xFactor: parts[0] || 0, yFactor: parts[1] || 0 };
    });

    this.driftElements = Array.from(document.querySelectorAll('[data-drift]')).map((el) => {
      const parts = (el.dataset.drift || '0 0').split(' ').map(Number);
      const center = el.dataset.driftCenter || '';
      return {
        el,
        xFactor: parts[0] || 0,
        yFactor: parts[1] || 0,
        centerX: center.includes('x'),
        centerY: center.includes('y'),
        currentX: 0,
        currentY: 0
      };
    });
  }

  initObserver() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const targetClass = entry.target.dataset.reveal || 'is-onscreen';
              entry.target.classList.add(targetClass);
            }
          });
        },
        { rootMargin: '0px 0px -50px 0px', threshold: 0.08 }
      );

      document.querySelectorAll('[data-reveal]').forEach((el) => {
        observer.observe(el);
      });
    } else {
      // Fallback
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add(el.dataset.reveal || 'is-onscreen');
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.size.width = window.innerWidth;
      this.size.height = window.innerHeight;
      this.refreshElements();
    }, { passive: true });

    window.addEventListener('scroll', () => {
      this.scroll.y = window.scrollY;
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.normX = (e.clientX - this.size.width / 2) / (this.size.width / 2);
      this.mouse.normY = (e.clientY - this.size.height / 2) / (this.size.height / 2);
    }, { passive: true });
  }

  loop() {
    const scrollY = this.scroll.y;

    // 1. Robb Owen data-prlx Parallax Transforms
    for (let i = 0; i < this.prlxElements.length; i++) {
      const item = this.prlxElements[i];
      const transX = scrollY * item.xFactor;
      const transY = scrollY * item.yFactor;
      item.el.style.transform = `translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 0)`;
    }

    // 2. Robb Owen data-drift Micro-Displacement
    for (let i = 0; i < this.driftElements.length; i++) {
      const item = this.driftElements[i];
      const targetX = this.mouse.normX * item.xFactor;
      const targetY = this.mouse.normY * item.yFactor;

      item.currentX += (targetX - item.currentX) * 0.08;
      item.currentY += (targetY - item.currentY) * 0.08;

      let transform = '';
      if (item.centerX) transform += 'translateX(-50%) ';
      if (item.centerY) transform += 'translateY(-50%) ';
      transform += `translate(${item.currentX.toFixed(2)}px, ${item.currentY.toFixed(2)}px)`;

      item.el.style.transform = transform;
    }

    requestAnimationFrame(() => this.loop());
  }
}
