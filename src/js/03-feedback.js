import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const email = document.querySelector('[name="email"]');
const message = document.querySelector('[name="message"]');

const formData = {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

giveSavedData();

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
  console.log(formData);
}

function onFormInput(e) {
  formData.email = email.value;
  formData.message = message.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function giveSavedData() {
  const savedData = localStorage.getItem('feedback-form-state');
  const parsedSavedData = JSON.parse(savedData);

  if (savedData) {
    if (parsedSavedData.email) {
      email.value = parsedSavedData.email;
    } else {
      email.value = '';
    }

    if (parsedSavedData.message) {
      message.value = parsedSavedData.message;
    } else {
      message.value = '';
    }
  }
}
