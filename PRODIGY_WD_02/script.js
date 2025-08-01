let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let intervalId;
let timeValue = document.getElementById("time");

function updateTime() {
  const time = new Date(elapsedTime);
  const hours = String(time.getUTCHours()).padStart(2, '0');
  const minutes = String(time.getUTCMinutes()).padStart(2, '0');
  const seconds = String(time.getUTCSeconds()).padStart(2, '0');
  const milliSeconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0')
  timeValue.textContent = `${hours}:${minutes}:${seconds}:${milliSeconds}`;
}

function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateTime();
    }, 10)
  }
  isRunning = true;
}

function stop() {
  if (isRunning) {
    isRunning = false;
    clearInterval(intervalId);
  }
}

function reset() {
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  clearInterval(intervalId);
  updateTime();
  document.getElementById("laps").innerHTML = "";
}

function recordLap() {
  if (isRunning) {
    const recordLap = document.createElement("li");
    recordLap.textContent = timeValue.textContent;
    document.getElementById("laps").appendChild(recordLap);
  }
}