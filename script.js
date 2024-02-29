const navItems = document.querySelector(".navItems");
const clock = document.getElementById("clock");
const stopwatch = document.getElementById("stopwatch");
const timer = document.getElementById("timer");
const alarm = document.getElementById("alarm");

const navs = [clock, stopwatch, timer, alarm];

navItems.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    document.querySelector(".active").classList.remove("active");
    event.target.classList.add("active");
    console.log(event.target.id);
  }
});

navs.forEach((nav) =>
  nav.addEventListener("click", () => setActivePage(nav.id))
);

function setActivePage(name) {
  document.querySelector(".active-content").classList.remove("active-content");
  document.querySelector(`#${name}-content`).classList.add("active-content");
}

// function formattedTime(date) {
//   const hours = date.getHours();
//   const minutes = date.getMinutes();
//   const seconds = date.getSeconds();

//   const formattedHours = hours < 10 ? `0${hours}` : hours;
//   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
//   const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

//   return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
// }
