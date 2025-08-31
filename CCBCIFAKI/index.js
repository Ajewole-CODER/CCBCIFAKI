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
    "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid? - Psalm 27:1",
    "And we know that in all things God works for the good of those who love him, who have been called according to his purpose. - Romans 8:28",
    "The Lord is close to the brokenhearted and saves those who are crushed in spirit. - Psalm 34:18",
    "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. - Philippians 4:6",
    "For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future. - Jeremiah 29:11",
    "But seek first his kingdom and his righteousness, and all these things will be given to you as well. - Matthew 6:33",
    "The Lord will fight for you; you need only to be still. - Exodus 14:14",
    "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me. - Galatians 2:20",
    "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace. - Numbers 6:24-26",
    "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. - Philippians 4:6",
    "But as for me and my household, we will serve the Lord. - Joshua 24:15",
    "But as for me, I watch in hope for the Lord, I wait for God my Savior; my God will hear me. - Micah 7:7",
    "Come to me, all you who are weary and burdened, and I will give you rest. - Matthew 11:28",
    "But the fruit of the spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law. - Galatians 5:22-23",
    "The Lord is not slow in keeping his promise, as some understand slowness. Instead he is patient with you, not wanting anyone to perish, but everyone to come to repentance. - 2 Peter 3:9",
    "The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge, my shield and the horn of my salvation, my stronghold. - Psalm 18:2",
    "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. - John 3:16",
    "The Lord is my shepherd, I lack nothing. - Psalm 23:1",
    "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God’s will is—his good, pleasing and perfect will. - Romans 12:2",
    "Cast all your anxiety on him because he cares for you. - 1 Peter 5:7",
    "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint. - Isaiah 40:31",
    "Trust in the lord and Lean not on your own understanding. - Proverbs 3:5",
    
];
document.getElementById("scriptures").textContent = 
    verses[Math.floor(Math.random() * verses.length)];

// Event Calendar with Details
const events = [
    //{ date: "17-19 April 2025", title: "EASTER RETREAT 2025", location: "Onsite @ CCBC IFAKI Main Auditorium https://maps.app.goo.gl/8XXREXed8pGtAYEc9 and online on our Youtube Channel https://youtube.com/@ccbcifaki ", time: "ONGOING"}//,
    
    { date: "Every Sunday", title: "Sunday Worship Service", location: "Main Auditorium", time: "08:00 AM" },
    { date: "Every Tuesday", title: "Tuesday Bible Study", location: "Main Auditorium", time: "5:30 PM" },
    { date: "Every Thursday", title: "Thursday Revival Hour/Miracle Hour", location: "Main Auditorium", time: "5:30 PM" }
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
