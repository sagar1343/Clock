const timeContainer = document.getElementById("time");
const navItems = document.querySelector(".navItems");
function displayTime() {
  setInterval(() => {
    const date = new Date();
    timeContainer.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }, 1000);
}
displayTime();

navItems.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    document.querySelector(".active").classList.remove("active");
    event.target.classList.add("active");
  }
});
