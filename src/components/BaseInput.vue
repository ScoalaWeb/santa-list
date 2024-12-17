<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

defineProps<{
    prefix?: string
}>();

const modelValue = defineModel<string>();
</script>

<template>
  <label>
    <span v-if="prefix">{{ prefix }}</span>
    <input v-model="modelValue" v-bind="$attrs" type="text" />
  </label>
</template>

<style scoped>
label {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  border-block-end: 1px solid transparent;
}

input {
  border: 0;
  outline: 0;
  padding: 0;
  background: transparent;
  font-family: inherit;
  font-size: var(--font-size);
  flex-grow: 1;
}

input::placeholder {
  color: #CECECE;
}

label:focus-within {
  border-block-end-color: #847CC4;
}
</style>
