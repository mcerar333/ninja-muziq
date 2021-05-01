<template>
  <TheNavbar />
  <main class="content">
    <router-view />
  </main>
</template>

<script>
import TheNavbar from './components/TheNavbar';

export default {
  components: { TheNavbar },
};
</script>

<style>
.content {
  margin: 0 auto;
  padding: 0 2rem;
  max-width: 120rem;
  min-height: calc(85vh - 10rem);
  min-height: calc(var(--vh, 1vh) * 85 - 10rem);

  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 46.9em) {
  .content {
    min-height: calc(90vh - 26.2rem);
    min-height: calc(var(--vh, 1vh) * 90 - 26.2rem);
  }
}
</style>
