<template>
  <label class="category-select">
    <span class="label">Category</span>
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option v-for="cat in categories" :key="cat.key" :value="cat.key">
        {{ cat.label }}
      </option>
    </select>
  </label>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.category-select {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

select {
  font-size: 0.8rem;
  padding: 0.2rem 0.4rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
}
</style>

