<template>
  <article>
    <div class="top-row">
      <CategorySelect
        v-if="categories && categories.length"
        :categories="categories"
        v-model="categoryModel"
      />
      <button type="button" class="randomize" @click="$emit('randomize')">
        Shuffle story
      </button>
    </div>

    <HeadlineBlock :headline="headline" :subheadline="subheadline" />
    <BylineRow :author="author" :published-label="publishedLabel" />
    <ArticleBody :paragraphs="paragraphs" />
    <ShareBar :url="canonicalUrl" :title="headline" />
    <RelatedStories
      v-if="items && statements && statements.length"
      :items="items"
      :statements="statements"
      @select-story="$emit('select-related', $event)"
    />
  </article>
</template>

<script setup>
import { computed } from 'vue';
import CategorySelect from './CategorySelect.vue';
import HeadlineBlock from './HeadlineBlock.vue';
import BylineRow from './BylineRow.vue';
import ArticleBody from './ArticleBody.vue';
import ShareBar from './ShareBar.vue';
import RelatedStories from './RelatedStories.vue';

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  categoryKey: {
    type: String,
    default: ''
  },
  headline: {
    type: String,
    required: true
  },
  subheadline: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    required: true
  },
  publishedLabel: {
    type: String,
    required: true
  },
  paragraphs: {
    type: Array,
    default: () => []
  },
  canonicalUrl: {
    type: String,
    required: true
  },
  items: {
    type: Object,
    default: () => ({})
  },
  statements: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:categoryKey', 'randomize', 'select-related']);

const categoryModel = computed({
  get() {
    return props.categoryKey;
  },
  set(val) {
    emit('update:categoryKey', val);
  }
});
</script>

<style scoped>
.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.randomize {
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  padding: 0.35rem 0.85rem;
  font-size: 0.8rem;
  cursor: pointer;
}

.randomize:hover {
  border-color: var(--color-accent);
}
</style>

