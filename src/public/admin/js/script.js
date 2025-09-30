const body = document.querySelector("body");
if (body) {
  const sidebar = document.querySelector(".sidebar");
  const toggleSwitch = document.querySelector(".icon-toggle");
  const downArrow = document.querySelector(".arrow");
  const subMenu = body.querySelector(".sub-menu");

  if (localStorage.getItem("closeSidebar") == "close") {
    sidebar.classList.add("close");
  }

  toggleSwitch.addEventListener("click", () => {
    sidebar.classList.toggle("close");

    if (sidebar.classList.contains("close")) {
      localStorage.setItem("closeSidebar", "close");
    } else {
      localStorage.setItem("closeSidebar", "open");
    }
  });

  downArrow.addEventListener("click", () => {
    subMenu.classList.toggle("show-sub-menu");
  });
}

// code products
const changeStatusForm = document.querySelector("#form-change-status");
if (changeStatusForm) {
  const listBtnChangeStatus = document.querySelectorAll("[change-status]");
  listBtnChangeStatus.forEach((buttonChange) => {
    buttonChange.addEventListener("click", (e) => {
      e.preventDefault();
      const stringStatus = buttonChange.getAttribute("change-status");
      const [status, id] = stringStatus.split("-");
      const newStatus = status == "active" ? "inactive" : "active";
      const dataPath = changeStatusForm.getAttribute("data-path");
      const action = `${dataPath}/${newStatus}/${id}?_method=PATCH`;

      changeStatusForm.action = action;
      changeStatusForm.submit();
    });
  });
}

// search products .
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
    e.target[0].value = e.target[0].value.trim();
    window.location.href = url.href;
  });
}

// preview image
const inputThumbnail = document.querySelector("#thumbnail");
if (inputThumbnail) {
  inputThumbnail.addEventListener("change", (e) => {
    const preivewImage = document.querySelector("#preview");
    const file = e.target.files[0];
    if (file) {
      preivewImage.src = URL.createObjectURL(file);
    } else {
      preivewImage.src = "";
    }
  });
}
// end code products

// show alert .
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));

  setTimeout(() => {
    showAlert.classList.add("close-alert");
  }, time);
  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("close-alert");
  });
}
// show alert .
