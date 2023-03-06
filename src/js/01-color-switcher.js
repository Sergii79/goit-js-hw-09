const body = document.querySelector('body');

const buttonStart = document.querySelector('button[data-start]');

const buttonStop = document.querySelector('button[data-stop]');

buttonStart.addEventListener('click', onStartClick);
buttonStop.addEventListener('click', onStopClick);

buttonStop.setAttribute('disabled', '');
const colorInterval = 1000;
let intervalId = null;

// генерування випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartClick() {
  buttonStart.setAttribute('disabled', '');
  buttonStop.removeAttribute('disabled', '');
  body.style.backgroundColor = getRandomHexColor();
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, colorInterval);
}

function onStopClick() {
  buttonStop.setAttribute('disabled', '');
  buttonStart.removeAttribute('disabled', '');
  clearInterval(intervalId);
}