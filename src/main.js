import { ScrollStoryEngine } from './scroll-engine.js';
import { InteractiveAvatar } from './avatar.js';
import { sounds } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Robb Owen-inspired Viewport & Scroll Story Engine
  const scrollEngine = new ScrollStoryEngine();

  // 2. Initialize Interactive Avatar
  new InteractiveAvatar('avatar-scene');

  // 3. Theme Toggle (Paper Light / SynthWave '84 Dark)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('shameem_theme') || 'light';
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'synthwave' ? 'light' : 'synthwave';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('shameem_theme', nextTheme);
      updateThemeIcon(nextTheme);
      sounds.playChime();
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'synthwave') {
      themeToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`;
      themeToggleBtn.title = 'Switch to Paper Light Theme';
    } else {
      themeToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>`;
      themeToggleBtn.title = "Switch to SynthWave '84 Dark Theme";
    }
  }

  // 4. Sound FX Toggle
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      const enabled = sounds.toggle();
      soundToggleBtn.classList.toggle('is-active', enabled);
      soundToggleBtn.innerHTML = enabled
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
      soundToggleBtn.title = enabled ? 'Sound FX Enabled' : 'Sound FX Muted';
    });
  }

  // Tactile button sound effects
  document.querySelectorAll('.btn, .btn-ghost, .footer-social-links a').forEach((el) => {
    el.addEventListener('click', () => sounds.playClick(580));
  });

  // 5. Live Dhaka Time (UTC+6)
  function updateDhakaTime() {
    const timeEl = document.getElementById('dhaka-live-time');
    if (!timeEl) return;
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const dhakaDate = new Date(utc + 3600000 * 6);
    let hours = dhakaDate.getHours();
    const minutes = String(dhakaDate.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    timeEl.textContent = `${hours}:${minutes} ${ampm} DHAKA`;
  }
  updateDhakaTime();
  setInterval(updateDhakaTime, 1000);

  // 6. Deep Dive Specs Modal
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalBody = document.getElementById('modal-body');
  const modalLinks = document.getElementById('modal-links');

  const projectDetails = {
    jatra: {
      title: 'Jatra: Bus Tracking System & EWU Transit Hub',
      subtitle: 'Native Android • Firebase Realtime DB • Leaflet.js • 100-Page Capstone',
      body: `
        <p><strong>System Architecture:</strong> Jatra is a transit ecosystem built to eliminate commuting uncertainty across Dhaka's university routes. Engineered for East West University's student bus fleet.</p>
        <br>
        <p><strong>Key Engineering Innovations:</strong></p>
        <ul style="padding-left: 1.25rem; margin: 0.5rem 0 1rem; line-height: 1.7;">
          <li>Sub-second driver GPS broadcast synchronization via Firebase Realtime Database with aggressive payload compaction.</li>
          <li>Interactive dispatch dashboard built with Leaflet.js providing geofenced campus arrival gates, vehicle velocity, and transit route deviation alerts.</li>
          <li>Resilient offline caching and battery-efficient location tracking in Android (Java) using optimized foreground services.</li>
          <li>Backed by an extensive 100-page engineering capstone report analyzing network resiliency, failover protocols, and commuter survey feedback.</li>
        </ul>
      `,
      links: [
        { label: 'View GitHub Repository', url: 'https://github.com/mehadishameem/jatra-bus-tracking-system' },
        { label: 'Read 100-Page Report (Google Drive)', url: 'https://drive.google.com/file/d/1edzSuoRRYxVRaef4KFQEE6bFAEQ6YpWH/view?usp=sharing' },
        { label: 'Admin Dashboard Repo', url: 'https://github.com/mehadishameem/JatraAdminDashboard' }
      ]
    },
    smarthome: {
      title: 'SmartHome: 10-Floor Building Telemetry & Tuya Digital Twin',
      subtitle: 'Flask • Node.js • Tuya Cloud API • High-Density IoT Simulation',
      body: `
        <p><strong>System Architecture:</strong> An energy telemetry and building automation platform interfacing with physical Tuya smart plug hardware while simulating a 10-floor, 40-room institutional building view.</p>
        <br>
        <p><strong>Key Highlights:</strong></p>
        <ul style="padding-left: 1.25rem; margin: 0.5rem 0 1rem; line-height: 1.7;">
          <li>Hybrid backend leveraging Flask for rapid data analytics and Node.js for real-time WebSocket state distribution.</li>
          <li>Live energy consumption analytics with historical kilowatt-hour load tracking and anomaly detection.</li>
          <li>Digital twin visualization of 40 individual room relays with instant state toggling and automated emergency load shedding.</li>
        </ul>
      `,
      links: [
        { label: 'View GitHub Repository', url: 'https://github.com/mehadishameem/smarthome' }
      ]
    },
    ewaste: {
      title: 'From Household Storage to Scrap Sorting: E-Waste Pathways in Bangladesh',
      subtitle: 'Empirical Qualitative Fieldwork • Circular Economy • Green Computing',
      body: `
        <p><strong>Research Scope:</strong> An in-depth qualitative study investigating informal electronic waste (e-waste) flows in urban Bangladesh. Explores post-consumer lifecycle bottlenecks, informal scrap-dealer ecosystems (bhangari shops), and material recovery channels.</p>
        <br>
        <p><strong>Core Findings:</strong></p>
        <ul style="padding-left: 1.25rem; margin: 0.5rem 0 1rem; line-height: 1.7;">
          <li>Identified extended domestic storage practices (electronic hibernation) that delay secondary reuse and recycling for 2-5 years.</li>
          <li>Mapped toxic lead/cadmium leakage risks during informal PCB dismantling in Dhaka peri-urban hubs.</li>
          <li>Formulated engineering recommendations for reverse-logistics software systems and civic drop-off incentives.</li>
        </ul>
      `,
      links: [
        { label: 'View Research Repository', url: 'https://github.com/mehadishameem/From-Household-StoragetoScrapSorting' }
      ]
    },
    attendance: {
      title: 'AttendanceCloud (EWU CSE489 Mobile Ecosystem)',
      subtitle: 'Native Android • SQLite & Cloud Sync • Academic Faculty Tooling',
      body: `
        <p><strong>Architecture Overview:</strong> Built for East West University's Mobile Application Development curriculum (CSE489), AttendanceCloud provides an encrypted, offline-first attendance logging workflow for faculty and students.</p>
        <br>
        <p><strong>Highlights:</strong> Offline-first SQLite local persistence, automatic cloud reconciler, and per-student absence analytics.</p>
      `,
      links: [
        { label: 'View GitHub Repository', url: 'https://github.com/mehadishameem/AttendanceCloud' },
        { label: 'Munshi Bari Portal Repo', url: 'https://github.com/mehadishameem/Community-Management-System-' }
      ]
    }
  };

  document.querySelectorAll('.js-open-modal').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      sounds.playClick(620);
      const projectId = trigger.getAttribute('data-project');
      const data = projectDetails[projectId];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      modalBody.innerHTML = data.body;

      modalLinks.innerHTML = data.links
        .map(
          (link) => `
          <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn btn--small" style="margin: 0;">
            <span class="btn__label">${link.label} ↗</span>
            <span class="btn__fill stripes" data-drift="-4 -6" aria-hidden="true">${link.label}</span>
          </a>
        `
        )
        .join('');

      modalOverlay.style.display = 'flex';
      requestAnimationFrame(() => modalOverlay.classList.add('is-active'));
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    sounds.playClick(480);
    modalOverlay.classList.remove('is-active');
    setTimeout(() => {
      modalOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }, 250);
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
      closeModal();
    }
  });
});
