<template>
  <section class="headline-block">
    <h1 class="headline">
      {{ headline }}
    </h1>
    <p v-if="subheadline" class="subheadline">
      {{ subheadline }}
    </p>
  </section>
</template>

<script setup>
defineProps({
  headline: {
    type: String,
    required: true
  },
  subheadline: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
.headline-block {
  margin-bottom: 0.75rem;
}

.headline {
  font-family: 'Times New Roman', 'Times', serif;
  font-size: 2rem;
  line-height: 1.1;
  margin: 0 0 0.4rem;
  text-transform: capitalize;
}

.subheadline {
  margin: 0;
  font-size: 1rem;
  color: var(--color-muted);
}
</style>

