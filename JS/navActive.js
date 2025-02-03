// Sélection de tous les liens de navigation
const navLinks = document.querySelectorAll('.navbar-nav a.nav-link');

// Création de l'observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.navbar-nav a[href="#${id}"]`);

        if (entry.isIntersecting) {
            // Supprimer la classe "active" de tous les liens
            navLinks.forEach(link => link.classList.remove('active'));
            // Ajouter la classe "active" au lien correspondant
            if (link) link.classList.add('active');
        }
    });
}, {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.6 // 60% de la section visible pour être considérée "active"
});

// Observer chaque section ayant un ID correspondant à un lien
navLinks.forEach(link => {
    const sectionId = link.getAttribute('href').substring(1);
    const section = document.getElementById(sectionId);
    if (section) {
        observer.observe(section);
    }
});
