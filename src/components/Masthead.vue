<template>
  <div class="masthead">
    <div class="title">{{ publicationName }}</div>
    <div v-if="tagline" class="tagline">
      {{ tagline }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  publicationName: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.masthead {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.title {
  font-family: 'Times New Roman', 'Times', serif;
  font-size: 2.1rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.tagline {
  font-size: 0.9rem;
  color: var(--color-muted);
}
</style>

