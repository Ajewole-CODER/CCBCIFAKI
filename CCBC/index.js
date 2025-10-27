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
    "For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future. - Jeremiah 29:11",
    "But seek first his kingdom and his righteousness, and all these things will be given to you as well. - Matthew 6:33",
    "The Lord will fight for you; you need only to be still. - Exodus 14:14",
    "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me. - Galatians 2:20",
    "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace. - Numbers 6:24-26",
    "But as for me and my household, we will serve the Lord. - Joshua 24:15",
    "But as for me, I watch in hope for the Lord, I wait for God my Savior; my God will hear me. - Micah 7:7",
    "Come to me, all you who are weary and burdened, and I will give you rest. - Matthew 11:28",
    "But the fruit of the spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law. - Galatians 5:22-23",
    "The Lord is not slow in keeping his promise, as some understand slowness. Instead he is patient with you, not wanting anyone to perish, but everyone to come to repentance. - 2 Peter 3:9",
    "The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge, my shield and the horn of my salvation, my stronghold. - Psalm 18:2",
    "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God’s will is—his good, pleasing and perfect will. - Romans 12:2",
    "Cast all your anxiety on him because he cares for you. - 1 Peter 5:7",
    "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint. - Isaiah 40:31"
];

function displayRandomVerse() {
    try {
        const scripturesElement = document.getElementById("scriptures");
        if (scripturesElement) {
            scripturesElement.textContent = verses[Math.floor(Math.random() * verses.length)];
        }
    } catch (error) {
        console.error("Error displaying scripture:", error);
    }
}

displayRandomVerse();

// Auto-refresh scripture every 30 seconds
setInterval(displayRandomVerse, 30000);

// Refresh on click
document.addEventListener("DOMContentLoaded", function() {
    const scripturesElement = document.getElementById("scriptures");
    if (scripturesElement) {
        scripturesElement.addEventListener("click", displayRandomVerse);
    }
});

// Navigation smooth scrolling
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector(".hamburger");
    const navUl = document.querySelector("nav ul");
    if (hamburger && navUl) {
        hamburger.addEventListener("click", function() {
            navUl.classList.toggle("show");
        });
    }
});

// Gallery lightbox
document.addEventListener("DOMContentLoaded", function() {
    const galleryImages = document.querySelectorAll(".gallery-container img");
    galleryImages.forEach(img => {
        img.addEventListener("click", function() {
            const lightbox = document.createElement("div");
            lightbox.style.position = "fixed";
            lightbox.style.top = "0";
            lightbox.style.left = "0";
            lightbox.style.width = "100%";
            lightbox.style.height = "100%";
            lightbox.style.background = "rgba(0,0,0,0.8)";
            lightbox.style.display = "flex";
            lightbox.style.alignItems = "center";
            lightbox.style.justifyContent = "center";
            lightbox.style.zIndex = "10000";
            lightbox.style.cursor = "pointer";

            const imgClone = img.cloneNode();
            imgClone.style.maxWidth = "90%";
            imgClone.style.maxHeight = "90%";
            imgClone.style.objectFit = "contain";

            lightbox.appendChild(imgClone);
            document.body.appendChild(lightbox);

            lightbox.addEventListener("click", function() {
                lightbox.remove();
            });
        });
    });
});

// Event Calendar with Details
const events = [
    { date: "Every Sunday", title: "Sunday Worship Service", location: "Main Auditorium", time: "08:00 AM", description: "Join us for praise, worship, and the Word." },
    { date: "Every Tuesday", title: "Tuesday Bible Study", location: "Main Auditorium", time: "5:30 PM", description: "Deep dive into God's Word with fellowship." },
    { date: "Every Thursday", title: "Thursday Revival Hour/Miracle Hour", location: "Main Auditorium", time: "5:30 PM", description: "Experience God's power and miracles." },
    { date: "Every 2nd, 3rd & 4th Friday of the Month" , title: "Night Vigil", location: "Main Auditorium", time: "11:00 PM", description: "Prayers to conquer our battles." },
    { date: "26/12/2025", title: "Youth Fiesta", location: "Main Auditorium", time: "10:00 AM", description: "Serving the community and spreading God's love." }
];

function populateEvents() {
    try {
        const eventList = document.getElementById("event-list");
        if (!eventList) return;

        eventList.innerHTML = ""; // Clear existing
        events.forEach(event => {
            const eventCard = document.createElement("div");
            eventCard.className = "event-card";
            eventCard.innerHTML = `
                <div class="event-icon">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="event-content">
                    <div class="event-date">${event.date}</div>
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-details">
                        <div class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</div>
                        <div class="event-time"><i class="fas fa-clock"></i> ${event.time}</div>
                    </div>
                    <p class="event-description">${event.description}</p>
                    <div class="event-buttons">
                        <button class="btn-register" onclick="registerForEvent('${event.title}')">Register Now</button>
                        <button class="btn-learn-more" onclick="learnMore('${event.title}')">Learn More</button>
                    </div>
                </div>
            `;
            eventList.appendChild(eventCard);
        });
    } catch (error) {
        console.error("Error populating events:", error);
    }
}

function registerForEvent(eventTitle) {
    alert(`Registration for "${eventTitle}" is coming soon! Please contact us for more information.`);
}

function learnMore(eventTitle) {
    alert(`More details about "${eventTitle}" will be available soon. Stay tuned!`);
}

document.addEventListener("DOMContentLoaded", populateEvents);

// Utility functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showModal(message) {
    const modal = document.createElement("div");
    modal.className = "response-modal";
    modal.innerHTML = `<p>${message}</p>`;
    document.body.appendChild(modal);
    setTimeout(() => modal.remove(), 5000);
}

function saveToLocalStorage(formId, data) {
    try {
        localStorage.setItem(formId, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
}

function loadFromLocalStorage(formId) {
    try {
        const data = localStorage.getItem(formId);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error("Error loading from localStorage:", error);
        return {};
    }
}

// Prayer Form
document.addEventListener("DOMContentLoaded", function() {
    const prayerForm = document.getElementById("prayer-form");
    if (prayerForm) {
        // Load saved data
        const savedData = loadFromLocalStorage("prayer-form");
        if (savedData.name) document.getElementById("prayer-name").value = savedData.name;
        if (savedData.message) document.getElementById("prayer-message").value = savedData.message;

        prayerForm.addEventListener("submit", function(event) {
            event.preventDefault();
            try {
                const name = document.getElementById("prayer-name").value.trim();
                const message = document.getElementById("prayer-message").value.trim();

                if (!name || !message) {
                    showModal("Please fill in all fields.");
                    return;
                }

                // Save to localStorage
                saveToLocalStorage("prayer-form", { name, message });

                const responseElement = document.getElementById("prayer-response");
                if (responseElement) {
                    responseElement.innerHTML = `
                        <p>Thank you, ${name}, for your prayer request:</p>
                        <blockquote>${message}</blockquote>
                        <p>We will be praying for you!</p>
                    `;
                }
                showModal("Prayer request submitted successfully!");
                prayerForm.reset();
            } catch (error) {
                console.error("Error handling prayer form:", error);
                showModal("An error occurred. Please try again.");
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        // Load saved data
        const savedData = loadFromLocalStorage("contact-form");
        if (savedData.name) document.getElementById("contact-name").value = savedData.name;
        if (savedData.email) document.getElementById("contact-email").value = savedData.email;
        if (savedData.message) document.getElementById("contact-message").value = savedData.message;

        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            try {
                const name = document.getElementById("contact-name").value.trim();
                const email = document.getElementById("contact-email").value.trim();
                const message = document.getElementById("contact-message").value.trim();

                if (!name || !email || !message) {
                    showModal("Please fill in all fields.");
                    return;
                }

                if (!validateEmail(email)) {
                    showModal("Please enter a valid email address.");
                    return;
                }

                // Save to localStorage
                saveToLocalStorage("contact-form", { name, email, message });

                showModal("Thank you for contacting us! We will get back to you soon.");
                contactForm.reset();
            } catch (error) {
                console.error("Error handling contact form:", error);
                showModal("An error occurred. Please try again.");
            }
        });
    }
});

let countdownInterval;

function updateCountdown() {
    const eventDate = new Date('2025-11-08T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Hero Image Slider
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.slide');
    const heroContent = document.querySelector('.hero-content');
    let currentSlide = 0;

    function getImageBrightness(img) {
        // Create a canvas to analyze the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let brightness = 0;
        let pixelCount = 0;

        // Sample pixels (every 10th pixel for performance)
        for (let i = 0; i < data.length; i += 40) { // 4 bytes per pixel (RGBA), skip every 10 pixels
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Calculate brightness using luminance formula
            brightness += (0.299 * r + 0.587 * g + 0.114 * b);
            pixelCount++;
        }

        return brightness / pixelCount; // Average brightness
    }

    function adjustTextColor(brightness) {
        if (brightness > 128) { // Light image
            heroContent.style.color = '#333'; // Dark text
        } else { // Dark image
            heroContent.style.color = '#fff'; // Light text
        }
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // Adjust text color based on current slide
        const activeSlide = slides[index];
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            const brightness = getImageBrightness(img);
            adjustTextColor(brightness);
        };
        img.src = activeSlide.style.backgroundImage.slice(5, -2); // Extract URL from background-image
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Start the slider
    setInterval(nextSlide, 3000); // Change slide every 3 seconds

    // Initialize first slide
    showSlide(0);
});
