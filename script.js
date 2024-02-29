const timeContainer = document.getElementById("time");
const navItems = document.querySelector(".navItems");
function displayTime() {
  setInterval(() => {
    const date = new Date();
    timeContainer.innerHTML = formattedTime(date);
  }, 1000);
}
displayTime();

navItems.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    document.querySelector(".active").classList.remove("active");
    event.target.classList.add("active");
    console.log(event.target.id);
  }
});
function formattedTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
