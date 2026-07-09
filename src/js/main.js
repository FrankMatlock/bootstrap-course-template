import * as bootstrap from "bootstrap";

// Modal example
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thanks for signing up!");
  });
}

// Contact form validation
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent!");
  });
}
