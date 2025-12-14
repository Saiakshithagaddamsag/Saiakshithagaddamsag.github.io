/* 1. PARTICLES JS CONFIG */
particlesJS("particles-js", {
    "particles": {
      "number": { "value": 80 },
      "color": { "value": "#ffffff" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.5, "random": false },
      "size": { "value": 3, "random": true },
      "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
      "move": { "enable": true, "speed": 4 }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": { "onhover": { "enable": true, "mode": "grab" } }
    },
    "retina_detect": true
});

/* 2. PROPER SCROLLER (Active Link Highlight) */
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Offset for fixed header
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

/* 3. FORM HANDLING */
const form = document.getElementById("contact-form");
const statusTxt = document.getElementById("form-status");

if(form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        statusTxt.style.color = "#ccc";
        statusTxt.innerHTML = "Sending...";

        const data = new FormData(form);
        fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                statusTxt.innerHTML = "Message sent successfully!";
                statusTxt.style.color = "#11abb0";
                form.reset();
            } else {
                statusTxt.innerHTML = "Error sending message.";
                statusTxt.style.color = "red";
            }
        }).catch(error => {
            statusTxt.innerHTML = "Error sending message.";
            statusTxt.style.color = "red";
        });
    });
}
