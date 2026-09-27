// ==========================================
// 1. GLOBAL THEME TOGGLE (Light / Dark Mode)
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        let theme = 'dark';
        if (document.body.classList.contains('light-mode')) {
            theme = 'light';
            themeToggleBtn.textContent = '☀️';
        } else {
            themeToggleBtn.textContent = '🌙';
        }
        localStorage.setItem('theme', theme);
    });
}

// ==========================================
// 2. DYNAMIC PROJECT FILTERING
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ==========================================
// 3. HERO SECTION LIVE TYPING EFFECT
// ==========================================
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["JavaScript Enthusiast", "Frontend Developer", ];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; 
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (typedTextSpan && charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (typedTextSpan && charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (typedTextSpan && textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }
});

// ==========================================
// 4. CONTACT FORM VALIDATION & FEEDBACK
// ==========================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === "" || email === "" || message === "") {
            formMessage.style.color = "#ff4d4d";
            formMessage.textContent = "Please fill in all fields before submitting!";
        } else {
            formMessage.style.color = "#28a745";
            formMessage.textContent = "Thank you! Your message has been sent successfully. 🚀";
            
            contactForm.reset();

            setTimeout(() => {
                formMessage.textContent = "";
            }, 4000);
        }
    });
}
