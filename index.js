let slides = document.querySelector(".slides");  
let slideIndex = 0;  

function showSlide(index) {  
    slides.style.transform = `translateX(-${index * 100}%)`;  
}  

function nextSlide() {  
    slideIndex = (slideIndex + 1) % slides.children.length;  
    showSlide(slideIndex);  
}  

setInterval(nextSlide, 3000); // Change slide every 3 seconds 