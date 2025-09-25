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
