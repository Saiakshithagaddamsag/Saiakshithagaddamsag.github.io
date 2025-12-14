/* 1. PARTICLES.JS CONFIGURATION */
particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 4,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
});

/* 2. PROPER SCROLLER (ACTIVE LINK HIGHLIGHTING) */
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav .nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // 100px offset for the fixed header
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

/* 3. SCROLL TO TOP BUTTON LOGIC */
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
});

/* 4. CONTACT FORM HANDLING (AJAX) */
const form = document.getElementById("contact-form");
const statusTxt = document.getElementById("form-status");

if (form) {
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        statusTxt.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        statusTxt.style.color = "#ccc";

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                statusTxt.innerHTML = "Message sent successfully!";
                statusTxt.style.color = "#11abb0";
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        statusTxt.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        statusTxt.innerHTML = "Oops! There was a problem submitting your form";
                    }
                    statusTxt.style.color = "red";
                })
            }
        }).catch(error => {
            statusTxt.innerHTML = "Oops! There was a problem submitting your form";
            statusTxt.style.color = "red";
        });
    }
    form.addEventListener("submit", handleSubmit);
}
