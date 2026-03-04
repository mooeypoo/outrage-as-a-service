<template>
  <component :is="layoutComponent" :theme="currentTheme">
    <template #default>
      <HomePage
        v-if="route === 'home'"
        :categories="categories"
        @update-categories="setCategories"
      />
      <AboutPage v-else />
    </template>
  </component>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import HomePage from './pages/HomePage.vue';
import AboutPage from './pages/AboutPage.vue';
import { getThemes } from './themes/registry';
import { initColorMode } from './lib/colorMode';

const route = ref('home');
const themes = ref([]);
const currentThemeId = ref(null);
const categories = ref([]);

const setCategories = (val) => {
  categories.value = val;
};

const updateRouteFromHash = () => {
  const hash = window.location.hash || '#/';
  route.value = hash.startsWith('#/about') ? 'about' : 'home';
};

const loadThemes = () => {
  themes.value = getThemes();
  currentThemeId.value = themes.value[0]?.id || null;
};

const currentTheme = computed(() =>
  themes.value.find((t) => t.id === currentThemeId.value) || themes.value[0] || null
);

const layoutComponent = computed(() => currentTheme.value?.layout || 'div');

const handleHashChange = () => {
  updateRouteFromHash();
};

onMounted(() => {
  initColorMode();
  updateRouteFromHash();
  loadThemes();
  window.addEventListener('hashchange', handleHashChange);
});

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', handleHashChange);
});
</script>

