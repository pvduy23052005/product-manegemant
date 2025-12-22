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

// search
const formSearch = document.querySelector("[form-search]");
if (formSearch) {
  formSearch.addEventListener("submit", (e) => {
    const url = new URL(window.location.href);
    e.preventDefault();
    const keyWord = e.target[0].value;

    if (keyWord) {
      url.searchParams.set("keySearch", keyWord);
    } else {
      url.searchParams.delete("keySearch");
    }
    e.target[0].value = keyWord.trim();
    window.location.href = url.href;
  });
}
// end search
