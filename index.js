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
    "But seek first his kingdom and his righteousness, and all these things will be given to you as well. - Matthew 6:33"
    
];
document.getElementById("scriptures").textContent = 
    verses[Math.floor(Math.random() * verses.length)];

// Event Calendar with Details
const events = [
    { date: "22-23 March 2025", title: "10 year @ permanent site & 12 years at Ifaki & Aaye region Anniversary Celebration", location: "Onsite @ CCBC IFAKI Main Auditorium https://maps.app.goo.gl/8XXREXed8pGtAYEc9 and online on our Youtube Channel @ https://youtube.com/@ccbcifaki", time: "3pm"},
    
    { date: "Every Sunday", title: "Sunday Worship", location: "Main Auditorium", time: "08:00 AM" },
    { date: "Every Tuesday", title: "Bible Study", location: "Main Auditorium", time: "5:30 PM" },
    { date: "Every Thursday", title: "Revival Hour/Miracle Hour", location: "Main Auditorium", time: "5:30 PM" }
];
const eventList = document.getElementById("event-list");
events.forEach(event => {
    const li = document.createElement("li");
    li.innerHTML = `
        <strong>${event.date}</strong>: <em>${event.title}</em><br>
        Location: ${event.location}<br>
        Time: ${event.time}
    `;
    eventList.appendChild(li);
});

// Prayer Form
document.getElementById("prayer-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("prayer-name").value;
    const message = document.getElementById("prayer-message").value;

    document.getElementById("prayer-response").innerHTML = `
        <p>Thank you, ${name}, for your prayer request:</p>
        <blockquote>${message}</blockquote>
        <p>We will be praying for you!</p>
    `;
});

// Contact Form
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    alert("Thank you for contacting us! We will get back to you soon.");
});
