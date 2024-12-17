<script setup lang="ts">

</script>

<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button:hover {
  border-block-end-width: 8px;
  margin-block-start: 0;
}

button, button:active {
  background-color: #fff;
  color: #A30000;
  border: 1px solid;
  border-block-end-width: 4px;
  margin-block-start: 4px;
  padding: 0.75rem 1.25rem;
  border-radius: 2rem;
  font-family: "Josefin Sans", sans-serif;
  font-weight: 300;
  font-size: 1.25rem;
  white-space: nowrap;

  transition-property: border-block-end-width, margin-block-start;
  transition-duration: 0.8s;
  transition-timing-function: cubic-bezier(.4,1.75,.8,.17);
}
</style>
