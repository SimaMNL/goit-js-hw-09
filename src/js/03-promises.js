import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

async function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);
function onSubmitForm(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  if (delay.value < 0 || step.value < 0 || amount.value < 0) {
    Notiflix.Notify.warning(`!!! Please enter a positive number`);
  } else {
    for (let i = 0; i < amount.value; i++) {
      let position = i + 1;
      const delays = Number(delay.value) + step.value * i;
      createPromise(position, delays)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          ),
            console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          ),
            console.log(
              `❌ Promisiunea ${position} a fost respinsă în ${delay}ms`
            );
        });
    }
  }
  event.currentTarget.reset();
}
