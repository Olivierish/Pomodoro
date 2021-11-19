function toggleClassName() {
  const sidebarElt = document.querySelector(".sidebar");
  const openElt = document.getElementById("open");
  const closeElt = document.getElementById("close");

  sidebarElt.classList.toggle("active");

  if (sidebarElt.classList.contains("active")) {
    openElt.style.display = "none";
    closeElt.style.display = "block";
  } else {
    openElt.style.display = "block";
    closeElt.style.display = "none";
  }
}

window.onload = () => {
    //window.scrollTo(0, document.body.scrollHeight);
    document.querySelector(".mask").scrollIntoView({ behavior: "smooth" });
  document.querySelector(".mask").scrollTop = document.scrollHeight + 0;
};
