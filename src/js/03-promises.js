import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

const refs = {
    formInput:document.querySelector('.form'),
    createtBtn: document.querySelector('button'),    
};

const data = {};

refs.formInput.addEventListener('input', onInput);
console.log(refs.formInput);
refs.createtBtn.addEventListener('click', onCreateBtnSubmit);

function onInput(event) {
    data[event.target.name] = Number(event.target.value);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

function onCreateBtnSubmit(event) {
  event.preventDefault();
  // refs.formInput.delay.value = '';
  // refs.formInput.step.value = '';
  // refs.formInput.amount.value = '';
    for (let position = 1; position <= data.amount; position += 1) { 
            createPromise(position, data.delay)
            .then(({position, delay}) => Notiflix.Notify.success((`✅ Fulfilled promise ${position} in ${delay}ms`)))
            .catch(({ position, delay }) => Notiflix.Notify.failure((`❌ Rejected promise ${position} in ${delay}ms`)));
        data.delay += data.step;   
    }
  
}    

