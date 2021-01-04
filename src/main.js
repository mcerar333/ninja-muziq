import { auth } from './firebase/config';
import { createApp } from 'vue';

import router from './router';
import App from './App.vue';

import './assets/main.css';

let app = null;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .mount('#app');
  }
});
