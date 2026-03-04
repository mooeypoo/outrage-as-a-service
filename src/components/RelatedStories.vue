<template>
  <section class="related">
    <h2>Related stories</h2>
    <ul>
      <li v-for="story in stories" :key="story.id">
        <button type="button" @click="$emit('select-story', story)">
          {{ story.headline }}
        </button>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { randomItem, randomKeyFromObject } from '../lib/random';
import { renderTemplate } from '../lib/renderTemplate';

const props = defineProps({
  items: {
    type: Object,
    required: true
  },
  statements: {
    type: Array,
    required: true
  }
});

defineEmits(['select-story']);

const stories = ref([]);

function makeStory(idPrefix) {
  const st = randomItem(props.statements);
  if (!st) return null;
  const slots = st.slots || [];
  const itemKeys = slots.map((slotType) => {
    const map = props.items.types?.[slotType] || {};
    return randomKeyFromObject(map);
  });
  const headline = renderTemplate(st.template, slots, props.items.types || {}, itemKeys);
  return {
    id: `${idPrefix}-${st.id}-${itemKeys.join('-')}`,
    statementId: st.id,
    itemKeys,
    headline
  };
}

function refreshStories() {
  const next = [];
  for (let i = 0; i < 3; i += 1) {
    const story = makeStory(i);
    if (story) next.push(story);
  }
  stories.value = next;
}

watch(
  () => [props.items, props.statements],
  () => {
    refreshStories();
  },
  { deep: true }
);

onMounted(() => {
  refreshStories();
});
</script>

<style scoped>
.related {
  border-top: 1px solid var(--color-border);
  padding-top: 1.25rem;
}

h2 {
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  margin: 0 0 0.75rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li + li {
  margin-top: 0.25rem;
}

button {
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  font: inherit;
  text-align: left;
  cursor: pointer;
  color: var(--color-text);
}

button:hover {
  text-decoration: underline;
}
</style>

