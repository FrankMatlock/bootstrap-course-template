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
// Theme toggle
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  });
}

// Portfolio JSON loader
const portfolioGrid = document.getElementById("portfolioGrid");

if (portfolioGrid) {
  fetch("./data/projects.json")
    .then(res => res.json())
    .then(projects => {
      portfolioGrid.innerHTML = projects.map(project => `
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <img src="${project.image}" class="card-img-top" alt="${project.title}">
            <div class="card-body">
              <h5 class="card-title">${project.title}</h5>
              <p class="card-text">${project.description}</p>
              <a href="${project.link}" class="btn btn-primary btn-sm">View Project</a>
            </div>
          </div>
        </div>
      `).join("");
    });
}

// Gallery JSON loader
const galleryGrid = document.getElementById("galleryGrid");

if (galleryGrid) {
  fetch("./data/gallery.json")
    .then(res => res.json())
    .then(images => {
      galleryGrid.innerHTML = images.map(img => `
        <div class="col-md-4">
          <img src="${img.image}" alt="${img.alt}" 
               class="img-fluid rounded shadow-sm gallery-img"
               data-bs-toggle="modal" data-bs-target="#imageModal">
        </div>
      `).join("");
    });
}
