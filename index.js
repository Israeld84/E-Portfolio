let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px) rotate(${x * boolInt * 10}deg)`;
  }
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += " dark-theme";
  } else {
    document.body.classList.remove("dark-theme");
  }
}

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";
  emailjs
    .sendForm(
      "service_80ih0if",
      "template_d9refyl",
      event.target,
      "user_K1PoFs8pB2YVWStDxrUls"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact me directly on email@email.com"
      );
    });
}

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    document.body.classList.remove("modal--open");
  } else {
    isModalOpen = true;
    document.body.classList.add("modal--open");
  }
}

// Tech Stack Modal Logic
function toggleTechStackModal() {
  const modal = document.getElementById("techStackModal");
  if (modal) {
    modal.classList.toggle("visible");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Tech stack modal buttons
  const techStackLink = document.getElementById("openTechStack");
  const closeBtn = document.getElementById("closeTechStack");

  if (techStackLink) {
    techStackLink.addEventListener("click", (e) => {
      e.preventDefault();
      toggleTechStackModal();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      toggleTechStackModal();
    });
  }

  window.addEventListener("click", (e) => {
    const modal = document.getElementById("techStackModal");
    if (modal && e.target === modal) {
      toggleTechStackModal();
    }
  });

  // Main modal buttons (new modal logic)
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const mainModal = document.querySelector(".modal");

  if (openModalBtn) {
    openModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleModal();
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleModal();
    });
  }

  window.addEventListener("click", (e) => {
    if (isModalOpen && mainModal && e.target === mainModal) {
      toggleModal();
    }
  });
});