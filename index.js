// Scripture of the Day
const verses = [
    "For I know the plans I have for you, declares the Lord. - Jeremiah 29:11",
    "The Lord is my shepherd; I shall not want. - Psalm 23:1",
    "I can do all things through Christ who strengthens me. - Philippians 4:13"
];
document.getElementById("daily-scripture").textContent = 
    verses[Math.floor(Math.random() * verses.length)];

// Event Calendar with Details
const events = [
    { day: "Every Sunday", title: "Sunday Worship", location: "Main Auditorium", time: "08:00 AM" },
    { day: "Every Tuesday", title: "Bible Study", location: "Main Auditorium", time: "5:30 PM" },
    { day: "Every Thursday", title: "Revival Hour/Miracle Hour", location: "Main Auditorium", time: "5:30 PM" }
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
