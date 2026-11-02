document.addEventListener("DOMContentLoaded", function () {
  // Update Footer Year Automatically
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
    });

    // Close menu when clicking a nav link
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        const icon = mobileToggle.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }
      });
    });
  }

  // Formspree AJAX Submission Handling
  const form = document.getElementById("admissionForm");
  const successMessage = document.getElementById("formSuccess");

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevents page reload

      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;

      // Show sending state on button
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          form.reset(); // Clear form fields
          form.style.display = "none"; // Hide form
          if (successMessage) {
            successMessage.style.display = "block"; // Show success notification
          }
        } else {
          const data = await response.json();
          if (Object.hasOwn(data, "errors")) {
            alert(data["errors"].map((error) => error["message"]).join(", "));
          } else {
            alert("Oops! There was a problem submitting your form. Please try again.");
          }
        }
      } catch (error) {
        alert("Network error: Please check your internet connection and try again.");
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }
    });
  }
});