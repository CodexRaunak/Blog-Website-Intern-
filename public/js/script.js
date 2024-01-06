function updateOffsetClass() {
  let navbarItems = document.getElementById("navbarNav");
  if (window.innerWidth > 992) {
    navbarItems.classList.add("offset-3");
  } else {
    navbarItems.classList.remove("offset-3");
  }
}
updateOffsetClass();
window.addEventListener("resize", updateOffsetClass);
