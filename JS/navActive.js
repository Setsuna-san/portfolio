// Sélection de tous les liens de navigation
const navLinks = document.querySelectorAll('.navbar-nav a.nav-link');

// Variable pour suivre le lien actif actuel
let currentActiveLink = null;

// Création de l'observer
const observer = new IntersectionObserver((entries) => {
    const intersecting = entries.filter(entry => entry.isIntersecting);
    
    if (intersecting.length > 0) {
        // tri les balise par hauteur de haut en bas
        intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        
        // recupere la balise la plus haut affiché
        const id = intersecting[0].target.getAttribute('id');
        const newLink = document.querySelector(`.navbar-nav a[href="#${id}"]`);
        
        // si il est different de l'actuel on change
        if (newLink && newLink !== currentActiveLink) {
            if (currentActiveLink) currentActiveLink.classList.remove('active');
            newLink.classList.add('active');
            currentActiveLink = newLink;
        }
    }
    
}, {
    
    root: null, // viewport
    rootMargin: '0px',
    threshold: 1 
});

// Observer chaque section ayant un ID correspondant à un lien
navLinks.forEach(link => {
    const sectionId = link.getAttribute('href').substring(1);
    const section = document.getElementById(sectionId);
    if (section) {
        observer.observe(section);
    }
});
