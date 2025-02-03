document.addEventListener("DOMContentLoaded", function () {
    // Sélectionne les éléments avec les classes .fade-in et .fade-in-side
    const elements = document.querySelectorAll(".fade-in, .fade-in-side");

    if (elements.length === 0) {
        console.warn("Aucun élément avec les classes .fade-in ou .fade-in-side n'a été trouvé !");
        return;
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log("Element visible : ", entry.target);
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }, {
        threshold: 0.1
    });

    // Observes each .fade-in and .fade-in-side element
    elements.forEach(element => observer.observe(element));
});
