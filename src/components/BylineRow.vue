<template>
  <div class="byline-row">
    <div class="primary">
      By <span class="author">{{ author }}</span>
    </div>
    <div class="meta">
      {{ publishedLabel }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  author: {
    type: String,
    required: true
  },
  publishedLabel: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.byline-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  font-size: 0.85rem;
  color: var(--color-muted);
  margin-bottom: 1rem;
}

.author {
  font-weight: 600;
}

.primary::first-letter,
.meta::first-letter {
  text-transform: uppercase;
}
</style>

