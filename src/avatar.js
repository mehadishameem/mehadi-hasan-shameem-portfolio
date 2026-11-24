/**
 * Interactive Avatar Engine
 * Supports both:
 * 1. Vector Cartoon Mode: Tracks pupils & tilts SVG head layers
 * 2. Real Photo Cartoon Mode: Dynamic 3D perspective tilt & cursor parallax
 */

export class InteractiveAvatar {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.eyeLeftPupil = document.getElementById('avatar-pupil-left');
    this.eyeRightPupil = document.getElementById('avatar-pupil-right');
    this.headGroup = document.getElementById('avatar-head-group');
    this.eyelids = document.querySelectorAll('.avatar-eyelid');
    this.photoEl = document.querySelector('.user-avatar-photo');

    this.target = { x: 0, y: 0 };
    this.current = { x: 0, y: 0 };
    this.tilt = { x: 0, y: 0, targetX: 0, targetY: 0 };

    this.bindEvents();
    this.bindModeToggle();
    this.initBlinkTimer();
    this.loop();
  }

  bindModeToggle() {
    const cartoonBtn = document.getElementById('btn-mode-cartoon');
    const photoBtn = document.getElementById('btn-mode-photo');
    const gradBtn = document.getElementById('btn-mode-grad');

    const setMode = (mode) => {
      [cartoonBtn, photoBtn, gradBtn].forEach(b => b && b.classList.remove('is-active'));
      
      if (mode === 'cartoon') {
        this.container.classList.remove('show-photo');
        if (cartoonBtn) cartoonBtn.classList.add('is-active');
      } else if (mode === 'photo') {
        this.container.classList.add('show-photo');
        if (this.photoEl) this.photoEl.src = '/assets/img/avatar.jpg';
        if (photoBtn) photoBtn.classList.add('is-active');
      } else if (mode === 'grad') {
        this.container.classList.add('show-photo');
        if (this.photoEl) this.photoEl.src = '/assets/img/avatar-grad.jpg';
        if (gradBtn) gradBtn.classList.add('is-active');
      }
    };

    if (cartoonBtn) cartoonBtn.addEventListener('click', () => setMode('cartoon'));
    if (photoBtn) photoBtn.addEventListener('click', () => setMode('photo'));
    if (gradBtn) gradBtn.addEventListener('click', () => setMode('grad'));
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const nx = Math.max(-1, Math.min(1, deltaX / (window.innerWidth * 0.45)));
      const ny = Math.max(-1, Math.min(1, deltaY / (window.innerHeight * 0.45)));

      // Pupil travel coordinates
      this.target.x = nx * 8;
      this.target.y = ny * 7;

      // 3D tilt angles (in degrees for photo, in SVG units for vector head)
      this.tilt.targetX = nx * 14;
      this.tilt.targetY = -ny * 12;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      this.target.x = 0;
      this.target.y = 0;
      this.tilt.targetX = 0;
      this.tilt.targetY = 0;
    });
  }

  initBlinkTimer() {
    const doBlink = () => {
      this.eyelids.forEach((el) => (el.style.opacity = '1'));
      setTimeout(() => {
        this.eyelids.forEach((el) => (el.style.opacity = '0'));
        const nextBlink = Math.random() * 4500 + 2500;
        setTimeout(doBlink, nextBlink);
      }, 150);
    };
    setTimeout(doBlink, 2000);
  }

  loop() {
    this.current.x += (this.target.x - this.current.x) * 0.12;
    this.current.y += (this.target.y - this.current.y) * 0.12;
    this.tilt.x += (this.tilt.targetX - this.tilt.x) * 0.1;
    this.tilt.y += (this.tilt.targetY - this.tilt.y) * 0.1;

    // A. Vector Cartoon Avatar: moving pupils and tilting head
    if (this.eyeLeftPupil && this.eyeRightPupil) {
      this.eyeLeftPupil.setAttribute('transform', `translate(${this.current.x.toFixed(2)}, ${this.current.y.toFixed(2)})`);
      this.eyeRightPupil.setAttribute('transform', `translate(${this.current.x.toFixed(2)}, ${this.current.y.toFixed(2)})`);
    }

    if (this.headGroup) {
      this.headGroup.setAttribute(
        'transform',
        `translate(${(this.tilt.x * 0.4).toFixed(2)}, ${(-this.tilt.y * 0.35).toFixed(2)}) rotate(${(this.tilt.x * 0.35).toFixed(2)} 100 100)`
      );
    }

    // B. Real Photo Avatar: 3D perspective tilt & light shift
    if (this.photoEl && this.container.classList.contains('show-photo')) {
      this.photoEl.style.transform = `
        perspective(600px)
        rotateY(${this.tilt.x.toFixed(2)}deg)
        rotateX(${this.tilt.y.toFixed(2)}deg)
        translate3d(${(this.tilt.x * 0.5).toFixed(2)}px, ${(-this.tilt.y * 0.4).toFixed(2)}px, 15px)
      `;
    }

    requestAnimationFrame(() => this.loop());
  }
}
