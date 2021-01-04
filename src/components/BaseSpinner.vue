<template>
  <span class="spin"></span>
</template>

<style>
.spin {
  display: inline-block;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #444;

  animation: spin 0.5s ease infinite;
}
@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}
</style>
