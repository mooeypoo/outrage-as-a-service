<template>
  <footer class="footer">
    <div class="disclaimer">
      This is a parody/satire project. Not a real news publication.
    </div>
    <div class="meta">
      <a :href="repoUrl" target="_blank" rel="noreferrer">GitHub repository</a>
      <span aria-hidden="true">·</span>
      <a href="https://moriel.tech" target="_blank" rel="noreferrer">Moriel Schottlender</a>
    </div>
  </footer>
</template>

<script setup>
const repoUrl = 'https://github.com/mooeypoo/outrage-as-a-service';
</script>

<style scoped>
.footer {
  margin-top: 3rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border);
  font-size: 0.8rem;
  color: var(--color-muted);
}

.disclaimer {
  margin-bottom: 0.4rem;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
  align-items: center;
}

a {
  color: inherit;
}
</style>

