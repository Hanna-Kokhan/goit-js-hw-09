const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.form-input'),
  message: document.querySelector('.form-textarea'),
};

let formData = {
  email: '',
  message: '',
};

const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  return savedData ? JSON.parse(savedData) : null;
};

refs.form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value.trim();
  saveToLocalStorage();
});

const initPage = () => {
  const savedData = loadFromLocalStorage();
  if (savedData) {
    formData = savedData;
    refs.email.value = formData.email || '';
    refs.message.value = formData.message || '';
  }
};

initPage();

refs.form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };

  refs.form.reset();
});
