const body = document.querySelector("body");
if (body) {
  const sidebar = document.querySelector(".sidebar");
  const toggleSwitch = document.querySelector(".icon-toggle");
  const downArrow = document.querySelector(".arrow");
  const subMenu = body.querySelector(".sub-menu");

  if (localStorage.getItem("closeSidebar") == "close") {
    sidebar.classList.add("close");
  }

  if (localStorage.getItem("showSubMenu") == "show-sub-menu") {
    subMenu.classList.add("show-sub-menu");
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

    if (subMenu.classList.contains("show-sub-menu")) {
      localStorage.setItem("showSubMenu", "show-sub-menu");
    } else {
      localStorage.setItem("showSubMenu", "close-sub-menu");
    }
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

// select-change-status.
const selectChangeStatus = document.querySelector("[select-change-status]");
if (selectChangeStatus) {
  const url = new URL(window.location.href);
  selectChangeStatus.addEventListener("change", (e) => {
    const changeStatus = e.target.value;
    if (changeStatus != "") {
      url.searchParams.set("status", changeStatus);
    } else {
      url.searchParams.delete("status");
    }
    window.location.href = url.href;
  });

  // Khi load lại trang → giữ option theo query param
  const currentStatus = url.searchParams.get("status");
  if (currentStatus) {
    selectChangeStatus.value = currentStatus;
  }
}
// end select-change-status.

// delete product .
const listBtnDelete = document.querySelectorAll(".btn-delete");
if (listBtnDelete) {
  listBtnDelete.forEach((button) => {
    button.addEventListener("click", (e) => {
      const idProduct = button.getAttribute("data-id");
      const titleProduct = button.getAttribute("data-title");

      const checked = window.confirm(`Bạn có muốn xóa ${titleProduct}!`);

      if (checked == true) {
        const formDelete = document.querySelector("#form-delete");
        const path = formDelete.getAttribute("data-path");
        const action = `${path}/${idProduct}?_method=DELETE`;
        formDelete.action = action;
        formDelete.submit();
      }
    });
  });
}
// end delete product .

// action multiple .
const formChangeMulti = document.querySelector("#form-change-multi");

if (formChangeMulti) {
  const actionMultiple = document.querySelector("[select-change-multiple]");
  const url = new URL(window.location.href);
  actionMultiple.addEventListener("change", (e) => {
    e.preventDefault();
    const statusChange = e.target.value;
    const containerListItem = document.querySelector(".container-list-item");
    const listItem = containerListItem.querySelectorAll(
      "input[name='id']:checked"
    );
    const valueInput = formChangeMulti.querySelector(
      "input[name='listIdItem']"
    );

    if (!statusChange) {
      return;
    }

    if (listItem.length == 0) {
      window.alert("Bản chửa chọn bản ghi nào!");
      window.location.href = url;
      return;
    }

    if (statusChange == "delete") {
      const isConfirm = window.confirm("Bạn có chắc muôn xóa không");
      if (isConfirm == false) {
        return;
      }
    }

    let listIdItem = {};
    let listId = [];
    listItem.forEach((element) => {
      const idItem = element.getAttribute("data-id");
      listId.push(idItem);
    });
    listIdItem["listId"] = listId;
    listIdItem["statusChange"] = statusChange;

    //conver object to json .
    valueInput.value = JSON.stringify(listIdItem);
    formChangeMulti.submit();
  });
}

const containerHeader = document.querySelector(".container-header-item ");
if (containerHeader) {
  const inputCheckAll = containerHeader.querySelector(
    "input[name='check-all']"
  );
  const listInputCheck = document.querySelectorAll("input[name='id']");
  inputCheckAll.addEventListener("change", (e) => {
    e.preventDefault();
    if (inputCheckAll.checked == true) {
      listInputCheck.forEach((item) => {
        item.checked = true;
      });
    } else {
      listInputCheck.forEach((item) => {
        item.checked = false;
      });
    }

    listInputCheck.forEach((item) => {
      item.addEventListener("click", () => {
        const inputChecked = document.querySelectorAll(
          "input[name=id]:checked"
        ).length;
        if (inputChecked === listInputCheck.length) {
          inputCheckAll.checked = true;
        } else {
          inputCheckAll.checked = false;
        }
      });
    });
  });
}
// end action multiple .
