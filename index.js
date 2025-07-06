// =======================
// Scripture of the Day
// =======================

const verses = [
  "For God so loved the world... - John 3:16",
  "The Lord is my shepherd, I lack nothing. - Psalm 23:1",
  "Trust in the Lord with all your heart... - Proverbs 3:5",
  "I can do all this through him... - Philippians 4:13",
  "The Lord is my light and my salvation—whom shall I fear?... - Psalm 27:1",
  "And we know that in all things God works for the good... - Romans 8:28",
  "The Lord is close to the brokenhearted... - Psalm 34:18",
  "Do not be anxious about anything... - Philippians 4:6",
  "For I know the plans I have for you... - Jeremiah 29:11",
  "But seek first his kingdom... - Matthew 6:33",
  "The Lord will fight for you; you need only to be still. - Exodus 14:14",
  "I have been crucified with Christ... - Galatians 2:20",
  "The Lord bless you and keep you... - Numbers 6:24-26",
  "But as for me and my household, we will serve the Lord. - Joshua 24:15",
  "I wait for God my Savior; my God will hear me. - Micah 7:7",
  "Come to me, all you who are weary... - Matthew 11:28",
  "The fruit of the Spirit is love, joy, peace... - Galatians 5:22-23",
  "The Lord is not slow in keeping his promise... - 2 Peter 3:9",
  "The Lord is my rock, my fortress... - Psalm 18:2",
  "Do not conform to the pattern of this world... - Romans 12:2",
  "Cast all your anxiety on him... - 1 Peter 5:7",
  "Those who hope in the Lord will renew their strength... - Isaiah 40:31"
];

// Utility to pick random verse
function getRandomVerse() {
  const index = Math.floor(Math.random() * verses.length);
  return verses[index];
}

const scriptureEl = document.getElementById("scriptures");
if (scriptureEl) {
  scriptureEl.textContent = getRandomVerse();
}


// =======================
// Event Calendar Section
// =======================

const events = [
  {
    date: "Every Sunday",
    title: "Sunday Worship Service",
    location: "Main Auditorium",
    time: "08:00 AM"
  },
  {
    date: "Every Tuesday",
    title: "Tuesday Bible Study",
    location: "Main Auditorium",
    time: "5:30 PM"
  },
  {
    date: "Every Thursday",
    title: "Thursday Revival Hour / Miracle Hour",
    location: "Main Auditorium",
    time: "5:30 PM"
  }
];

const eventListEl = document.getElementById("event-list");

if (eventListEl) {
  events.forEach(({ date, title, location, time }) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${date}</strong>: <em>${title}</em><br>
      Location: ${location}<br>
      Time: ${time}
    `;
    eventListEl.appendChild(li);
  });
}


// =======================
// Prayer Request Form
// =======================

const prayerForm = document.getElementById("prayer-form");

if (prayerForm) {
  prayerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("prayer-name").value.trim();
    const message = document.getElementById("prayer-message").value.trim();

    const responseEl = document.getElementById("prayer-response");

    if (!name || !message) {
      responseEl.innerHTML = `<p style="color: red;">Please enter both name and message.</p>`;
      return;
    }

    responseEl.innerHTML = `
      <p>Thank you, <strong>${name}</strong>, for your prayer request:</p>
      <blockquote>${message}</blockquote>
      <p>We will be praying for you!</p>
    `;

    prayerForm.reset();
  });
}


// =======================
// Contact Form
// =======================

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you soon.");
    contactForm.reset();
  });
}

// =======================
// Gallery Lightbox
// =======================
document.addEventListener("DOMContentLoaded", function () {
  const galleryImages = document.querySelectorAll(".gallery-container img");
  if (galleryImages.length) {
    // Create lightbox elements
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.style.display = "none";
    lightbox.style.position = "fixed";
    lightbox.style.top = 0;
    lightbox.style.left = 0;
    lightbox.style.width = "100vw";
    lightbox.style.height = "100vh";
    lightbox.style.background = "rgba(0,0,0,0.8)";
    lightbox.style.justifyContent = "center";
    lightbox.style.alignItems = "center";
    lightbox.style.zIndex = 9999;
    lightbox.innerHTML = `<img id="lightbox-img" style="max-width:90vw;max-height:80vh;border-radius:10px;"><span id="lightbox-close" style="position:absolute;top:30px;right:50px;font-size:2.5rem;color:#fff;cursor:pointer;">&times;</span>`;
    document.body.appendChild(lightbox);

    galleryImages.forEach(img => {
      img.style.cursor = "pointer";
      img.addEventListener("click", function () {
        document.getElementById("lightbox-img").src = img.src;
        lightbox.style.display = "flex";
      });
    });

    document.getElementById("lightbox-close").onclick = function () {
      lightbox.style.display = "none";
    };
    lightbox.onclick = function (e) {
      if (e.target === lightbox) lightbox.style.display = "none";
    };
  }
});

// =======================
// Testimonials Carousel
// =======================
(function () {
  const testimonials = [
    {
      quote: "This church has changed my life for the better!",
      author: "Jane Doe"
    },
    {
      quote: "A true family in Christ.",
      author: "John Smith"
    },
    {
      quote: "I found purpose and community here.",
      author: "Mary Johnson"
    }
  ];
  const testimonialsSection = document.getElementById("testimonials");
  if (testimonialsSection) {
    let idx = 0;
    const blockquote = document.createElement("blockquote");
    const cite = document.createElement("cite");
    blockquote.appendChild(document.createElement("br"));
    testimonialsSection.innerHTML = `<h2>What Our Members Say</h2>`;
    testimonialsSection.appendChild(blockquote);
    testimonialsSection.appendChild(cite);

    function showTestimonial(i) {
      blockquote.innerHTML = `"${testimonials[i].quote}"<br>`;
      cite.textContent = `- ${testimonials[i].author}`;
    }
    showTestimonial(idx);

    // Add navigation
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Prev";
    prevBtn.style.marginRight = "1rem";
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    testimonialsSection.appendChild(prevBtn);
    testimonialsSection.appendChild(nextBtn);

    prevBtn.onclick = function () {
      idx = (idx - 1 + testimonials.length) % testimonials.length;
      showTestimonial(idx);
    };
    nextBtn.onclick = function () {
      idx = (idx + 1) % testimonials.length;
      showTestimonial(idx);
    };

    // Auto-rotate
    setInterval(() => {
      idx = (idx + 1) % testimonials.length;
      showTestimonial(idx);
    }, 7000);
  }
})();

// =======================
// Persist High Contrast Mode
// =======================
(function () {
  const contrastBtn = document.getElementById('toggle-contrast');
  if (contrastBtn) {
    // On load, check localStorage
    if (localStorage.getItem('highContrast') === 'on') {
      document.body.classList.add('high-contrast');
    }
    contrastBtn.onclick = function () {
      document.body.classList.toggle('high-contrast');
      if (document.body.classList.contains('high-contrast')) {
        localStorage.setItem('highContrast', 'on');
      } else {
        localStorage.removeItem('highContrast');
      }
    };
  }
})();

// =======================
// Auto-Close Success/Error Messages
// =======================
function autoCloseMessage(selector, delay = 4000) {
  const el = document.querySelector(selector);
  if (el) {
    setTimeout(() => {
      el.innerHTML = "";
    }, delay);
  }
}

// =======================
// Enhanced Form Feedback
// =======================

// Newsletter form
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.onsubmit = function(e) {
    e.preventDefault();
    const response = document.getElementById('newsletter-response');
    response.innerHTML = `<div class="success">Thank you for subscribing!</div>`;
    autoCloseMessage('#newsletter-response');
    this.reset();
  };
}

// Event registration form
const eventRegForm = document.getElementById('event-registration-form');
if (eventRegForm) {
  eventRegForm.onsubmit = function(e) {
    e.preventDefault();
    const response = document.getElementById('event-registration-response');
    response.innerHTML = `<div class="success">Registration received!</div>`;
    autoCloseMessage('#event-registration-response');
    this.reset();
  };
}

// Volunteer form
const volunteerForm = document.getElementById('volunteer-form');
if (volunteerForm) {
  volunteerForm.onsubmit = function(e) {
    e.preventDefault();
    const response = document.getElementById('volunteer-response');
    response.innerHTML = `<div class="success">Thank you for volunteering!</div>`;
    autoCloseMessage('#volunteer-response');
    this.reset();
  };
}

// =======================
// Language Switcher with Multiple Languages
// =======================
const translations = {
  en: {
    "about-title": "About Us",
    "about-text": "Our church is a place of worship, community, and spiritual growth. We welcome everyone!",
    "mission-title": "Our Mission",
    "mission-text": "...Winning and Reigning With Christ.",
    "services-title": "Our Services",
    "services-text": "We offer Sunday worship, Bible studies, and various community programs for spiritual growth and fellowship.",
    "newsletter-title": "Subscribe to Our Newsletter",
    "newsletter-btn": "Subscribe",
    "volunteer-title": "Volunteer With Us",
    "volunteer-btn": "Sign Up",
    "giving-title": "Online Giving",
    "giving-btn": "Donate Now"
  },
  yo: {
    "about-title": "Nipa Wa",
    "about-text": "Ijo wa je ibi adura, ajosepo, ati idagbasoke emi. A gba gbogbo eniyan.",
    "mission-title": "Ise Wa",
    "mission-text": "...Mimu Aseyori ati Ijoba Pẹlu Kristi.",
    "services-title": "Iṣẹ Wa",
    "services-text": "A n pese ijosin Sunday, kikeko Bibeli, ati eto agbegbe fun idagbasoke emi ati ajosepo.",
    "newsletter-title": "Forukọsilẹ fun Iwe iroyin Wa",
    "newsletter-btn": "Forukọsilẹ",
    "volunteer-title": "Dáwọlé Pẹlú Wa",
    "volunteer-btn": "Darapọ",
    "giving-title": "Fifunni Lori Ayelujara",
    "giving-btn": "Fúnni Bayi"
  },
  fr: {
    "about-title": "À Propos de Nous",
    "about-text": "Notre église est un lieu de culte, de communauté et de croissance spirituelle. Nous accueillons tout le monde !",
    "mission-title": "Notre Mission",
    "mission-text": "...Vaincre et Régner avec Christ.",
    "services-title": "Nos Services",
    "services-text": "Nous offrons le culte du dimanche, des études bibliques et divers programmes communautaires pour la croissance spirituelle et la communion.",
    "newsletter-title": "Abonnez-vous à Notre Newsletter",
    "newsletter-btn": "S'abonner",
    "volunteer-title": "Devenez Bénévole Avec Nous",
    "volunteer-btn": "Rejoindre",
    "giving-title": "Don en Ligne",
    "giving-btn": "Faire un Don"
  },
  es: {
    "about-title": "Sobre Nosotros",
    "about-text": "Nuestra iglesia es un lugar de adoración, comunidad y crecimiento espiritual. ¡Todos son bienvenidos!",
    "mission-title": "Nuestra Misión",
    "mission-text": "...Venciendo y Reinando con Cristo.",
    "services-title": "Nuestros Servicios",
    "services-text": "Ofrecemos culto dominical, estudios bíblicos y varios programas comunitarios para el crecimiento espiritual y la comunión.",
    "newsletter-title": "Suscríbete a Nuestro Boletín",
    "newsletter-btn": "Suscribirse",
    "volunteer-title": "Voluntario con Nosotros",
    "volunteer-btn": "Unirse",
    "giving-title": "Donaciones en Línea",
    "giving-btn": "Donar Ahora"
  }
};

function switchLanguage(lang) {
  // About
  const aboutTitle = document.querySelector("#about h2");
  const aboutText = document.querySelector("#about p");
  if (aboutTitle && aboutText) {
    aboutTitle.textContent = translations[lang]["about-title"];
    aboutText.textContent = translations[lang]["about-text"];
  }
  // Mission
  const missionTitle = document.querySelector("#mission h2");
  const missionText = document.querySelector("#mission p");
  if (missionTitle && missionText) {
    missionTitle.textContent = translations[lang]["mission-title"];
    missionText.textContent = translations[lang]["mission-text"];
  }
  // Services
  const servicesTitle = document.querySelector("#services h2");
  const servicesText = document.querySelector("#services p");
  if (servicesTitle && servicesText) {
    servicesTitle.textContent = translations[lang]["services-title"];
    servicesText.textContent = translations[lang]["services-text"];
  }
  // Newsletter
  const newsletterTitle = document.querySelector("#newsletter h2");
  const newsletterBtn = document.querySelector("#newsletter-form button");
  if (newsletterTitle) newsletterTitle.textContent = translations[lang]["newsletter-title"];
  if (newsletterBtn) newsletterBtn.textContent = translations[lang]["newsletter-btn"];
  // Volunteer
  const volunteerTitle = document.querySelector("#volunteer h2");
  const volunteerBtn = document.querySelector("#volunteer-form button");
  if (volunteerTitle) volunteerTitle.textContent = translations[lang]["volunteer-title"];
  if (volunteerBtn) volunteerBtn.textContent = translations[lang]["volunteer-btn"];
  // Giving
  const givingTitle = document.querySelector("#giving h2");
  const givingBtn = document.querySelector(".donate-btn");
  if (givingTitle) givingTitle.textContent = translations[lang]["giving-title"];
  if (givingBtn) givingBtn.textContent = translations[lang]["giving-btn"];
}

const langSwitcher = document.getElementById('language-switcher');
if (langSwitcher) {
  langSwitcher.onchange = function() {
    const lang = this.value;
    switchLanguage(lang);
  };
}

// Directions (opens Google Maps)
const directionsForm = document.getElementById('directions-form');
if (directionsForm) {
  directionsForm.onsubmit = function(e) {
    e.preventDefault();
    var userLoc = document.getElementById('user-location').value;
    var churchLoc = "Christ Companion Bible Church Ifaki";
    var url = "https://www.google.com/maps/dir/?api=1&origin=" + encodeURIComponent(userLoc) + "&destination=" + encodeURIComponent(churchLoc);
    document.getElementById('directions-result').innerHTML = '<a href="' + url + '" target="_blank">View Directions on Google Maps</a>';
  };
}