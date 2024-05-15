function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');

  let intervalId = null;

  function startColorSwitching() {
    intervalId = setInterval(function () {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 10);

    startButton.disabled = true;
  }

  function stopColorSwitching() {
    clearInterval(intervalId);
    startButton.disabled = false;
  }

  startButton.addEventListener('click', startColorSwitching);
  stopButton.addEventListener('click', stopColorSwitching);
});
