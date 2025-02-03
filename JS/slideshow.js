
const slideIndices = {};

// Initialisation des diaporamas
document.querySelectorAll(".slideshow-container").forEach((container, index) => {
    const slideshowID = container.getAttribute("data-slideshow");
    slideIndices[slideshowID] = 1;

    showSlides(slideIndices[slideshowID], slideshowID);
});

// Fonction pour afficher les slides
function showSlides(n, slideshowID) {
    let i;
    const slides = document.querySelectorAll(`[data-slideshow="${slideshowID}"] .slides`);
    if (n > slides.length) { slideIndices[slideshowID] = 1; }
    if (n < 1) { slideIndices[slideshowID] = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    updateDots(slideIndices[slideshowID], slideshowID);
    slides[slideIndices[slideshowID] - 1].style.display = "block";

}
function plusSlides(n, slideshowID) {
    showSlides(slideIndices[slideshowID] += n, slideshowID);
}

function currentSlide(n, slideshowID) {
    showSlides(slideIndices[slideshowID] = n, slideshowID);
}

function updateDots(n, slideshowID) {
    const dots = document.querySelectorAll(`#dots-${slideshowID} .dot`);
    dots.forEach(dot => dot.classList.remove("active"));
    dots[slideIndices[slideshowID] - 1].classList.add("active");
}