<template>
  <section class="about">
    <h1>About Outrage as a Service</h1>
    <p>
      This site is a parody headline generator. All of the statements and items that power the
      fake headlines live in simple JSON files in the repository.
    </p>
    <p>
      The source lives on
      <a :href="repoUrl" target="_blank" rel="noreferrer">GitHub</a>. Contributions and playful
      pull requests are welcome.
    </p>
    <p>
      Created by
      <a href="https://moriel.tech" target="_blank" rel="noreferrer">Moriel Schottlender</a>.
    </p>
  </section>
</template>

<script setup>
const repoUrl = 'https://github.com/your-org/outrage-as-a-service';
</script>

<style scoped>
.about {
  max-width: 640px;
  font-size: 0.98rem;
  line-height: 1.7;
}

h1 {
  font-family: 'Times New Roman', 'Times', serif;
  font-size: 1.6rem;
  margin-bottom: 1rem;
}

a {
  color: var(--color-accent);
}
</style>

