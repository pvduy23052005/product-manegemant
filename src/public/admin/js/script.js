const body = document.querySelector("body");
if (body) {
  const sidebar = document.querySelector(".sidebar");
  const toggleSwitch = document.querySelector(".icon-toggle");
  const downArrow = document.querySelector(".arrow");
  const subMenu = body.querySelector(".sub-menu");

  toggleSwitch.addEventListener("click", () => {
    sidebar.classList.toggle("close");
  });

  downArrow.addEventListener("click", () => {
    subMenu.classList.toggle("show-sub-menu");
  });
}

let lastScrollTop = 0;
const header = document.querySelector(".header"); // chỉnh selector theo đúng file pug của bạn

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // cuộn xuống -> ẩn header
    header.style.top = "-60px"; // đẩy header ra ngoài màn hình
  } else {
    // cuộn lên -> hiện lại header
    header.style.top = "0";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // tránh số âm
});
