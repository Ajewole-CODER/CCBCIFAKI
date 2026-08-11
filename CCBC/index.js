// Main site JS: scriptures, navigation, gallery, events, countdown, and forms

// Scripture of the Day
const verses = [
  "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. - John 3:16",
  "The Lord is my shepherd, I lack nothing. - Psalm 23:1",
  "Trust in the Lord with all your heart and lean not on your own understanding. - Proverbs 3:5",
  "I can do all this through him who gives me strength. - Philippians 4:13",
  "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid? - Psalm 27:1",
  "And we know that in all things God works for the good of those who love him, who have been called according to his purpose. - Romans 8:28",
  "The Lord is close to the brokenhearted and saves those who are crushed in spirit. - Psalm 34:18",
  "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. - Philippians 4:6",
  "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future. - Jeremiah 29:11",
  "But seek first his kingdom and his righteousness, and all these things will be given to you as well. - Matthew 6:33",
  "The Lord will fight for you; you need only to be still. - Exodus 14:14",
  "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace. - Numbers 6:24-26",
  "But as for me and my household, we will serve the Lord. - Joshua 24:15",
  "But as for me, I watch in hope for the Lord, I wait for God my Savior; my God will hear me. - Micah 7:7",
  "Come to me, all you who are weary and burdened, and I will give you rest. - Matthew 11:28",
  "The fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. - Galatians 5:22-23",
  "Cast all your anxiety on him because he cares for you. - 1 Peter 5:7",
  "But those who hope in the Lord will renew their strength. They will soar on wings like eagles, they will run and not grow weary, they will walk and not be faint. - Isaiah 40:31"
];

function displayRandomVerse() {
  try {
    const el = document.getElementById('scriptures');
    if (!el) return;
    el.textContent = verses[Math.floor(Math.random() * verses.length)];
  } catch (err) {
    console.error('displayRandomVerse error', err);
  }
}

displayRandomVerse();
setInterval(displayRandomVerse, 30000);

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Mobile nav toggle (keeps aria-expanded in sync)
  const hamb = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamb && navLinks) {
    hamb.addEventListener('click', () => {
      const expanded = hamb.getAttribute('aria-expanded') === 'true';
      hamb.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('show');
    });
  }

  // Gallery lightbox
  document.querySelectorAll('.gallery-container img').forEach(img => {
    img.addEventListener('click', () => {
      const overlay = document.createElement('div');
      overlay.className = 'ccbc-lightbox';
      overlay.style.position = 'fixed';
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.background = 'rgba(0,0,0,0.85)';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = '10000';
      overlay.style.cursor = 'zoom-out';

      const imgClone = img.cloneNode();
      imgClone.style.maxWidth = '90%';
      imgClone.style.maxHeight = '90%';
      imgClone.style.objectFit = 'contain';

      overlay.appendChild(imgClone);
      document.body.appendChild(overlay);
      overlay.addEventListener('click', () => overlay.remove());
    });
  });

  // Populate events
  populateEvents();

  // Contact form: progressive enhancement to POST to /api/contact as JSON
  const contactForm = document.getElementById('contact-form');
  const contactResp = document.getElementById('contact-response');
  if (contactForm && contactResp) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      contactResp.style.display = 'block';
      contactResp.textContent = 'Sending...';

      const formData = new FormData(contactForm);
      const payload = {
        name: formData.get('name') || '',
        email: formData.get('email') || '',
        message: formData.get('message') || ''
      };

      try {
        const res = await fetch(contactForm.action || '/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const json = await res.json().catch(() => null);
        if (res.ok) {
          contactResp.textContent = (json && json.message) ? json.message : 'Thanks — we received your message.';
          contactForm.reset();
        } else {
          contactResp.textContent = (json && json.error) ? json.error : 'Sorry — there was a problem sending your message.';
        }
      } catch (err) {
        console.error('contact submit error', err);
        contactResp.textContent = 'Network error — please try again later.';
      }
    });
  }

  // Prayer form (client-side placeholder + localStorage)
  const prayerForm = document.getElementById('prayer-form');
  const prayerResp = document.getElementById('prayer-response');
  if (prayerForm && prayerResp) {
    // load
    try {
      const saved = localStorage.getItem('prayer-form');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.name) document.getElementById('prayer-name').value = data.name;
        if (data.message) document.getElementById('prayer-message').value = data.message;
      }
    } catch (e) {}

    prayerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('prayer-name').value.trim();
      const message = document.getElementById('prayer-message').value.trim();
      if (!name || !message) {
        prayerResp.textContent = 'Please fill in all fields.';
        return;
      }
      localStorage.setItem('prayer-form', JSON.stringify({ name, message }));
      prayerResp.innerHTML = `<p>Thank you, ${escapeHtml(name)}, for your prayer request:</p><blockquote>${escapeHtml(message)}</blockquote><p>We will be praying for you!</p>`;
      prayerForm.reset();
    });
  }

  // Countdown initialization (if elements present)
  if (document.getElementById('days')) {
    startCountdown(new Date('2025-11-07T09:00:00+01:00'));
  }

  // Hero slider init
  initHeroSlider();
});

// Utility: escape HTML for insertion
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Events data & renderer
const events = [
  { date: 'Every Sunday', title: 'Sunday Worship Service', location: 'Main Auditorium', time: '08:00 AM', description: 'Join us for praise, worship, and the Word.' },
  { date: 'Every Tuesday', title: 'Tuesday Bible Study', location: 'Main Auditorium', time: '5:30 PM', description: "Deep dive into God's Word with fellowship." },
  { date: 'Every Thursday', title: 'Thursday Revival Hour/Miracle Hour', location: 'Main Auditorium', time: '5:30 PM', description: "Experience God's power and miracles." },
  { date: 'Every 2nd, 3rd & 4th Friday of the Month', title: 'Vigil', location: 'Main Auditorium', time: '11:00 PM', description: 'Prayers to conquer our battles.' },
  { date: '26/12/2025', title: 'Youth Fiesta', location: 'Main Auditorium', time: '10:00 AM', description: 'Serving the community and spreading God\'s love.' }
];

function populateEvents() {
  try {
    const el = document.getElementById('event-list');
    if (!el) return;
    el.innerHTML = '';
    events.forEach(ev => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="event-card">
          <div class="event-icon"><i class="fas fa-calendar-alt"></i></div>
          <div class="event-content">
            <div class="event-date">${escapeHtml(ev.date)}</div>
            <h3 class="event-title">${escapeHtml(ev.title)}</h3>
            <div class="event-details">
              <div class="event-location"><i class="fas fa-map-marker-alt"></i> ${escapeHtml(ev.location)}</div>
              <div class="event-time"><i class="fas fa-clock"></i> ${escapeHtml(ev.time)}</div>
            </div>
            <p class="event-description">${escapeHtml(ev.description)}</p>
            <div class="event-buttons">
              <button class="btn-register" onclick="registerForEvent('${escapeHtml(ev.title)}')">Register Now</button>
              <button class="btn-learn-more" onclick="learnMore('${escapeHtml(ev.title)}')">Learn More</button>
            </div>
          </div>
        </div>
      `;
      el.appendChild(li);
    });
  } catch (err) {
    console.error('populateEvents error', err);
  }
}

function registerForEvent(title) {
  alert(`Registration for "${title}" is coming soon! Please contact us for more information.`);
}
function learnMore(title) {
  alert(`More details about "${title}" will be available soon. Stay tuned!`);
}

// Countdown
let countdownTimerId = null;
function startCountdown(targetDate) {
  function update() {
    const now = new Date();
    const diff = targetDate - now;
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      clearInterval(countdownTimerId);
      return;
    }
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const minutes = Math.floor((diff / (1000*60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    daysEl.textContent = String(days).padStart(2,'0');
    hoursEl.textContent = String(hours).padStart(2,'0');
    minutesEl.textContent = String(minutes).padStart(2,'0');
    secondsEl.textContent = String(seconds).padStart(2,'0');
  }
  update();
  countdownTimerId = setInterval(update, 1000);
}

// Hero slider (simple automatic slider, adjusts text color when possible)
function initHeroSlider() {
  const slides = Array.from(document.querySelectorAll('.hero-slider .slide'));
  if (!slides.length) return;
  let current = 0;

  function show(i) {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    // adjust hero-content color by sampling image if possible
    try {
      const img = slides[i].querySelector('img');
      const heroContent = document.querySelector('.hero-content');
      if (img && heroContent) {
        if (img.complete && img.naturalWidth) {
          sampleImageBrightness(img).then(bright => {
            if (bright > 128) heroContent.style.color = '#222'; else heroContent.style.color = '#fff';
          }).catch(()=>{});
        } else {
          img.addEventListener('load', () => {
            sampleImageBrightness(img).then(bright => {
              const heroContent = document.querySelector('.hero-content');
              if (!heroContent) return;
              if (bright > 128) heroContent.style.color = '#222'; else heroContent.style.color = '#fff';
            }).catch(()=>{});
          });
        }
      }
    } catch (e) { /* ignore */ }
  }

  function next() {
    current = (current + 1) % slides.length;
    show(current);
  }
  show(0);
  setInterval(next, 4000);
}

// Sample brightness using canvas (may fail if image cross-origin)
function sampleImageBrightness(img) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const w = Math.min(200, img.naturalWidth);
      const h = Math.min(200, img.naturalHeight);
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0,0,w,h).data;
      let total = 0, count = 0;
      for (let i=0;i<data.length;i+=40) {
        const r = data[i], g = data[i+1], b = data[i+2];
        total += (0.299*r + 0.587*g + 0.114*b);
        count++;
      }
      resolve(total / count);
    } catch (err) {
      reject(err);
    }
  });
}
