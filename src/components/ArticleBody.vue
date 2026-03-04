<template>
  <div class="body">
    <p v-for="(para, idx) in paragraphs" :key="idx">
      {{ para }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  paragraphs: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
.body {
  font-size: 0.98rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

p {
  margin: 0 0 0.75rem;
}

.body p::first-letter {
  text-transform: uppercase;
}
</style>

