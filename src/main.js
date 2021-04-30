import { auth } from './firebase/config';
import { createApp } from 'vue';

import router from './router';
import App from './App.vue';

import './assets/main.css';

let app = null;

// Set '--vh' Custom Property equivalent to 1vh
const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  console.log(document.documentElement.style.getPropertyValue('--vh'));
};
const setVhListeners = () =>
  ['load', 'resize'].forEach(e => addEventListener(e, setVh));

setVhListeners();

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .mount('#app');
  }
});
