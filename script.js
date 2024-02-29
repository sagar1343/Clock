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

function formattedTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function displayTime() {
  setInterval(() => {
    const date = new Date();
    document.querySelector("#clock-content h1").innerHTML = formattedTime(date);
  }, 1000);
}

function displayStopWatchTimer() {
  let hr = 0;
  let min = 0;
  let sec = 0;
  let milisec = 0;
  let timerInterval;

  const startButton = document.querySelector("#stopwatch-start");
  const stopButton = document.querySelector("#stopwatch-stop");
  const resetButton = document.querySelector("#stopwatch-reset");

  setButtonState(false, true, true);

  startButton.addEventListener("click", startStopwatch);
  stopButton.addEventListener("click", stopStopwatch);
  resetButton.addEventListener("click", resetStopwatch);

  function startStopwatch() {
    timerInterval = setInterval(updateStopwatch, 10);
    setButtonState(true, false, false);
  }

  function stopStopwatch() {
    clearInterval(timerInterval);
    setButtonState(false, true, false);
  }

  function resetStopwatch() {
    stopStopwatch();
    hr = 0;
    min = 0;
    sec = 0;
    milisec = 0;
    updateStopwatchDisplay();
    setButtonState(false, true, true);
  }

  function setButtonState(bool1, bool2, bool3) {
    startButton.disabled = bool1;
    stopButton.disabled = bool2;
    resetButton.disabled = bool3;
  }

  function updateStopwatch() {
    milisec += 10;
    if (milisec === 1000) {
      milisec = 0;
      sec++;
      if (sec === 60) {
        sec = 0;
        min++;
        if (min === 60) {
          min = 0;
          hr++;
        }
      }
    }
    updateStopwatchDisplay();
  }

  function updateStopwatchDisplay() {
    document.querySelector("#stopwatch-content h1").innerHTML =
      formattedTimer();
  }

  function formattedTimer() {
    return (
      (hr < 10 ? "0" : "") +
      hr +
      ":" +
      (min < 10 ? "0" : "") +
      min +
      ":" +
      (sec < 10 ? "0" : "") +
      sec +
      ":" +
      (milisec < 100 ? "00" : "") +
      milisec
    );
  }
}

displayTime();
displayStopWatchTimer();
