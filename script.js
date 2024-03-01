const navItems = document.querySelector(".navItems");
const clock = document.getElementById("clock");
const stopwatch = document.getElementById("stopwatch");
const timer = document.getElementById("timer");

const navs = [clock, stopwatch, timer, alarm];

navItems.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    document.querySelector(".active").classList.remove("active");
    event.target.classList.add("active");
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
  const pauseButton = document.querySelector("#stopwatch-pause");
  const resetButton = document.querySelector("#stopwatch-reset");

  setButtonState(false, true, true);

  startButton.addEventListener("click", startStopwatch);
  pauseButton.addEventListener("click", pauseStopwatch);
  resetButton.addEventListener("click", resetStopwatch);

  function startStopwatch() {
    timerInterval = setInterval(updateStopwatch, 1);
    setButtonState(true, false, false);
  }

  function pauseStopwatch() {
    clearInterval(timerInterval);
    setButtonState(false, true, false);
  }

  function resetStopwatch() {
    pauseStopwatch();
    hr = 0;
    min = 0;
    sec = 0;
    milisec = 0;
    updateStopwatchDisplay();
    setButtonState(false, true, true);
  }

  function setButtonState(bool1, bool2, bool3) {
    startButton.disabled = bool1;
    pauseButton.disabled = bool2;
    resetButton.disabled = bool3;
  }

  function updateStopwatch() {
    milisec += 1;
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
      formattedStopwatchTimer();
  }

  function formattedStopwatchTimer() {
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
      (milisec < 100 ? (milisec < 10 ? "00" : "0") : "") +
      milisec
    );
  }
}

function displayTimer() {
  const timerContent = document.querySelector("#timer-content h1");
  const timerInput = document.getElementById("timer-input");
  let timerValue;
  let hr = 0;
  let min = 0;
  let sec = 0;
  let timerInterval;

  const startButton = document.querySelector("#timer-start");
  const pauseButton = document.querySelector("#timer-pause");
  const resetButton = document.querySelector("#timer-reset");

  startButton.addEventListener("click", startTimer);
  pauseButton.addEventListener("click", pauseTimer);
  resetButton.addEventListener("click", resetTimer);

  timerInput.addEventListener("input", (e) => {
    timerValue = e.target.value;
    updateTimerValues();
    timerContent.innerHTML = formattedTimer();
    if (timerValue == "00:00:00") setButtonState(true, true, true);
    else setButtonState(false, true, true);
  });

  setButtonState(true, true, true);

  function updateTimerValues() {
    hr = parseInt(timerValue.slice(0, 2));
    min = parseInt(timerValue.slice(3, 5));
    sec = parseInt(timerValue.slice(6, 8));
  }

  function startTimer() {
    timerInput.disabled = true;
    timerInterval = setInterval(() => {
      timerContent.innerHTML = formattedTimer();
      updateTimer();
    }, 1000);
    setButtonState(true, false, false);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    setButtonState(false, true, false);
  }

  function resetTimer() {
    pauseTimer();
    hr = 0;
    min = 0;
    sec = 0;
    updateTimer();
    timerContent.innerHTML = "00:00:00";
    setButtonState(false, true, true);
    timerInput.value = "00:00:00";
    timerInput.disabled = false;
  }

  function setButtonState(bool1, bool2, bool3) {
    startButton.disabled = bool1;
    pauseButton.disabled = bool2;
    resetButton.disabled = bool3;
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
      sec
    );
  }

  function updateTimer() {
    if (sec === 0) {
      if (min === 0) {
        if (hr === 0) {
          clearInterval(timerInterval);
          timerContent.innerHTML = "Times-Up";
          setButtonState(true, true, false);
        } else {
          hr--;
          min = 59;
          sec = 59;
        }
      } else {
        min--;
        sec = 59;
      }
    } else {
      sec--;
    }
  }
}

function displayAlarm() {
  const alarmButton = document.querySelector("#alarm-button");
  const clearButton = document.querySelector("#clear-button");
  const alarmContainer = document.querySelector(".alarm-container");
  const message = document.querySelector("#alarm-content h1");
  let timeOutID;

  alarmButton.addEventListener("click", () => {
    clearTimeout(timeOutID);
    let inputValue = document.getElementById("alarm-input").value;
    scheduleAlarm(inputValue);
  });

  clearButton.addEventListener("click", () => {
    alarmContainer.innerHTML = "";
    clearTimeout(timeOutID);
  });

  function setAlarmCard(dateTime) {
    alarmContainer.innerHTML = "";
    const { date, time } = extractDateAndTime(dateTime);
    const list = document.createElement("li");
    list.innerHTML = `<div class="card shadow-md border-0">
      <div class="card-body d-flex flex-column align-items-center">
        <h5 class="card-title text-secondary">${time}</h5>
        <p class="card-text">${date}</p>
      </div>
    </div>`;
    alarmContainer.appendChild(list);
  }

  function scheduleAlarm(dateTime) {
    const alarmTime = new Date(dateTime).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = alarmTime - currentTime;

    if (timeDifference > 0) {
      setAlarmCard(dateTime);
      message.innerHTML = "";
      timeOutID = setTimeout(() => {
        notifyUser();
      }, timeDifference);
    } else {
      message.innerHTML = "Invalid time.";
    }
  }

  function notifyUser() {
    message.innerHTML = "Alarm!";
  }

  function extractDateAndTime(dateTimeString) {
    const dateObject = new Date(dateTimeString);

    const year = dateObject.getFullYear();
    const month =
      (dateObject.getMonth() + 1 < 10 ? "0" : "") + (dateObject.getMonth() + 1);
    const day = (dateObject.getDate() < 10 ? "0" : "") + dateObject.getDate();

    const hours =
      (dateObject.getHours() < 10 ? "0" : "") + dateObject.getHours();
    const minutes =
      (dateObject.getMinutes() < 10 ? "0" : "") + dateObject.getMinutes();

    const dateString = `${day}/${month}/${year}`;
    const timeString = `${hours}:${minutes}`;

    return { date: dateString, time: timeString };
  }
}

displayTime();
displayStopWatchTimer();
displayTimer();
displayAlarm();
