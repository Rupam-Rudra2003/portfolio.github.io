let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };

    });
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.screenY > 100);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content,.heading', { origin: 'top' });
ScrollReveal().reveal('.home-img,.certificates-container,.portfolio-box,.contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1,.about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p,.about-content', { origin: 'right' });

const typed = new Typed('.multiple-text', {
    strings: ['Software Developer', 'Data Analyst'],

    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

document.addEventListener('DOMContentLoaded', function() {
    (function() {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxHT5XIaWYhaulFfv9_w5H6OfxlNxDJgz5sc4566EfNluCRpsfWDq7bOqb4n5Vu698R/exec';
        const form = document.getElementById('contact-form');
        const msgEl = document.getElementById('msg');

        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            msgEl.textContent = '';

            const submitButton = form.querySelector('input[type="submit"]');
            submitButton.disabled = true;
            const originalLabel = submitButton.value;
            submitButton.value = 'Sending...';

            fetch(scriptURL, {
                method: 'POST',
                body: new FormData(form)
            }).then(async function(response) {
                if (response.ok) {
                    msgEl.style.color = '#61b752';
                    msgEl.textContent = 'Message sent successfully.';
                    form.reset();
                    return;
                }
                const text = await response.text().catch(() => '[no response body]');
                const errorMsg = `Server returned ${response.status}${response.statusText ? ' ' + response.statusText : ''}: ${text}`;
                console.error('Form submit server error:', errorMsg);
                msgEl.style.color = '#ff6b6b';
                msgEl.textContent = 'Send failed — ' + (text || ('Status ' + response.status));
            }).catch(function(err) {
                console.error('Form submit network error:', err);
                msgEl.style.color = '#ff6b6b';
                msgEl.textContent = 'Network error when sending message. Check console for details.';
            }).finally(function() {
                submitButton.disabled = false;
                submitButton.value = originalLabel;
                setTimeout(function() {
                    msgEl.textContent = '';
                }, 8000);
            });
        });
    })();
});