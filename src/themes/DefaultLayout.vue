<template>
  <div class="layout">
    <header class="masthead">
      <Masthead :publication-name="theme.tokens.publicationName" :tagline="theme.tokens.tagline" />
      <div class="masthead-right">
        <ParodyBadge />
        <ModeToggle />
      </div>
    </header>

    <nav class="nav">
      <a href="#/" :class="{ active: isHome }">Home</a>
      <a href="#/about" :class="{ active: !isHome }">About</a>
    </nav>

    <main class="main">
      <slot />
    </main>

    <ParodyFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Masthead from '../components/Masthead.vue';
import ParodyBadge from '../components/ParodyBadge.vue';
import ParodyFooter from '../components/ParodyFooter.vue';
import ModeToggle from '../components/ModeToggle.vue';

const props = defineProps({
  theme: {
    type: Object,
    required: true
  }
});

const isHome = computed(() => !window.location.hash || window.location.hash === '#/');
</script>

<style scoped>
.layout {
  max-width: 960px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
}

.masthead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.75rem;
  gap: 1rem;
}

.masthead-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav {
  display: flex;
  gap: 1rem;
  padding: 0.75rem 0 1.25rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-bottom: 1px solid var(--color-border);
}

.nav a {
  color: var(--color-muted);
}

.nav a.active {
  color: var(--color-text);
  font-weight: 600;
}

.main {
  padding-top: 1.75rem;
}
</style>

