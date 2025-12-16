// change quantityProduct  .
const inputQuanity = document.querySelectorAll("input[name='quantity']");
if (inputQuanity) {
  const url = new URL(window.location.href);
  inputQuanity.forEach((input) => {
    input.addEventListener("change", (e) => {
      const porductId = input.getAttribute("product-id");
      const quantityProduct = e.target.value;
      window.location.href = `/cart/update/${porductId}/${quantityProduct}`;
    });
  });
}
