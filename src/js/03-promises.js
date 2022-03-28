import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  })
  
}

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
}

function onFormSubmit(event) {
  event.preventDefault();
  let time = Number(formData.delay);
  for (let i = 0; i < formData.amount; i += 1) {
    setTimeout(() => {
      createPromise(i + 1, time + i * Number(formData.step))
      .then(message => Notiflix.Notify.success(message))
      .catch(error => Notiflix.Notify.failure(error));
    }, time + i * Number(formData.step));
  }
}

let formData = {};
const ref = {
  form: document.querySelector('.form')
}

ref.form.addEventListener('submit', onFormSubmit);
ref.form.addEventListener('input', onFormInput);

