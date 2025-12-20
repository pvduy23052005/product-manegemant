const errorMessage = document.getElementById("errorMessage");
const successMessage = document.querySelector("#successMessage");

if (errorMessage) {
  errorMessage.classList.add("show");
  setTimeout(() => {
    errorMessage.classList.remove("show");
  }, 5000);
}

if (successMessage) {
  successMessage.classList.add("show");
  setTimeout(() => {
    successMessage.classList.remove("show");
  }, 5000);
}
