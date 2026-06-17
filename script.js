// --- script.js ---

// 1. Menu Hamburger Mobile
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links a');

if(burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

// Fermeture du menu mobile lors du clic sur un lien (Bonus demandé)
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
});

// 2. Gestion du Dark Mode
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if(darkModeToggle) darkModeToggle.textContent = '☀️ Mode Clair';
} else {
    // S'assure que le texte par défaut est bien là si on n'est pas en mode sombre
    if(darkModeToggle) darkModeToggle.textContent = '🌙 Mode Sombre';
}

if(darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        let theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        darkModeToggle.textContent = theme === 'dark' ? '☀️ Mode Clair' : '🌙 Mode Sombre';
        localStorage.setItem('theme', theme);
    });
}

// 3. Effet Typewriter (Machine à écrire)
const typewriterElement = document.getElementById('typewriter');
if(typewriterElement) {
    const words = ["étudiant en BUT GEII", "passionné d'électronique", "concepteur de carte électroniques", "un futur technicien"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause à la fin du mot
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause avant le prochain mot
        }

        setTimeout(type, typingSpeed);
    }

    // Lancer l'effet
    setTimeout(type, 1000);
}

// 4. Indicateur de section active au scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        // On soustrait 100px pour déclencher le changement un peu avant que la section touche le haut
        const sectionTop = current.offsetTop - 100; 
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if(navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
});