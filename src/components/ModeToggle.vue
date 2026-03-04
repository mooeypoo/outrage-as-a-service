<template>
  <button class="mode-toggle" type="button" @click="onToggle">
    <span v-if="mode === 'light'">Light</span>
    <span v-else>Dark</span>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCurrentColorMode, toggleColorMode } from '../lib/colorMode';

const mode = ref('light');

const syncMode = () => {
  mode.value = getCurrentColorMode();
};

const onToggle = () => {
  toggleColorMode();
  syncMode();
};

onMounted(() => {
  syncMode();
});
</script>

<style scoped>
.mode-toggle {
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-muted);
  font-size: 0.75rem;
  padding: 0.3rem 0.75rem;
  cursor: pointer;
}
</style>

