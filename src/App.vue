<template>
  <TheNavbar />
  <main class="content">
    <router-view />
  </main>
</template>

<script>
import TheNavbar from './components/TheNavbar';

import { onMounted } from 'vue';

export default {
  components: { TheNavbar },

  setup() {
    // Set '--vh' Custom Property equivalent to 1vh
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    const setVhListeners = () =>
      ['load', 'resize'].forEach(e => addEventListener(e, setVh));

    onMounted(() => setVhListeners());
  },
};
</script>

<style>
.content {
  margin: 0 auto;
  padding: 0 2rem;
  max-width: 120rem;
  min-height: calc(85vh - 10rem);

  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 46.9em) {
  .content {
    min-height: calc(90vh - 26.2rem);
  }
}
</style>
