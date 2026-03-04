<template>
  <section v-if="ready">
    <ArticlePage
      :categories="categories"
      :category-key="categoryKey"
      :headline="headline"
      :subheadline="subheadline"
      :author="author"
      :published-label="publishedLabel"
      :paragraphs="paragraphs"
      :canonical-url="canonicalUrl"
      :items="itemsData"
      :statements="statements"
      @update:categoryKey="onCategoryChange"
      @randomize="onRandomize"
      @select-related="onSelectRelated"
    />
  </section>
  <section v-else>
    <p>Loading outrage...</p>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import ArticlePage from '../components/ArticlePage.vue';
import { loadIndex, loadCategoryItems, loadCategoryStatements } from '../lib/contentLoader';
import { readRawParams, writeCanonicalParams } from '../lib/params';
import { randomItem, randomKeyFromObject } from '../lib/random';
import { renderTemplate } from '../lib/renderTemplate';
import { relativePublishedLabel } from '../lib/time';

const emit = defineEmits(['update-categories']);

const categories = ref([]);
const categoryKey = ref('');
const itemsData = ref({ types: {} });
const statements = ref([]);
const currentStatement = ref(null);
const currentItemKeys = ref([]);
const headline = ref('');
const subheadline = ref('');
const paragraphs = ref([]);
const canonicalUrl = ref(window.location.href);

const ready = ref(false);

const author = computed(() => {
  const pool = ['Staff Algorithm', 'Opinion Desk', 'Anonymous Engineer'];
  return pool[Math.floor(Math.random() * pool.length)];
});

const publishedLabel = computed(() => relativePublishedLabel());

function chooseStatement(rawS, allStatements) {
  const found = allStatements.find((s) => s.id === rawS);
  return found || randomItem(allStatements);
}

function resolveItemsForSlots(rawItemsArray, slots, types) {
  const keys = [];
  slots.forEach((slotType, index) => {
    const typeMap = types[slotType] || {};
    const candidate = rawItemsArray[index];
    if (candidate && Object.prototype.hasOwnProperty.call(typeMap, candidate)) {
      keys.push(candidate);
    } else {
      keys.push(randomKeyFromObject(typeMap));
    }
  });
  return keys;
}

function buildBodyParagraphs(headlineText, displayValues) {
  const [first = '', second = '', third = ''] = displayValues;
  return [
    `${headlineText} At least, that's what today's discourse would have you believe.`,
    `Proponents of ${second || first} insist that the old ways of ${third || first} are holding the industry back, while critics argue the outrage cycle is mostly branding.`,
    `Regardless, the comparison between ${first} and ${second || third || first} shows no sign of leaving your feeds any time soon.`
  ];
}

async function initializeFromUrl() {
  const indexData = await loadIndex();
  categories.value = indexData.categories || [];
  emit('update-categories', categories.value);

  const catKeys = categories.value.map((c) => c.key);
  const raw = readRawParams();
  const requestedCat = raw.cat;
  const resolvedCat = catKeys.includes(requestedCat) ? requestedCat : randomItem(catKeys);

  categoryKey.value = resolvedCat;

  const [items, stmts] = await Promise.all([
    loadCategoryItems(resolvedCat),
    loadCategoryStatements(resolvedCat)
  ]);

  itemsData.value = items;
  statements.value = stmts.statements || [];

  const st = chooseStatement(raw.s, statements.value);
  currentStatement.value = st;

  const itemKeys = resolveItemsForSlots(raw.itemsArray, st.slots || [], itemsData.value.types || {});
  currentItemKeys.value = itemKeys;

  applyContentFromState();
}

function applyContentFromState() {
  const st = currentStatement.value;
  const itemsTypes = itemsData.value.types || {};
  const slots = st.slots || [];
  const itemKeys = currentItemKeys.value;

  const text = renderTemplate(st.template, slots, itemsTypes, itemKeys);
  headline.value = text;

  const displayValues = slots.map((slotType, index) => {
    const typeMap = itemsTypes[slotType] || {};
    const key = itemKeys[index];
    return typeMap[key] || key || '';
  });

  subheadline.value = `Readers pit ${displayValues[0]} against ${displayValues[1] || displayValues[0]} yet again.`;
  paragraphs.value = buildBodyParagraphs(text, displayValues);

  canonicalUrl.value = writeCanonicalParams(categoryKey.value, st.id, itemKeys);
  ready.value = true;
}

async function reloadForCategory(newKey) {
  categoryKey.value = newKey;
  const [items, stmts] = await Promise.all([
    loadCategoryItems(newKey),
    loadCategoryStatements(newKey)
  ]);
  itemsData.value = items;
  statements.value = stmts.statements || [];
  const st = randomItem(statements.value);
  currentStatement.value = st;
  currentItemKeys.value = resolveItemsForSlots([], st.slots || [], itemsData.value.types || {});
  applyContentFromState();
}

function onCategoryChange(newKey) {
  reloadForCategory(newKey);
}

function onRandomize() {
  const st = randomItem(statements.value);
  currentStatement.value = st;
  currentItemKeys.value = resolveItemsForSlots([], st.slots || [], itemsData.value.types || {});
  applyContentFromState();
}

function onSelectRelated(story) {
  const st = statements.value.find((s) => s.id === story.statementId);
  if (!st) return;
  currentStatement.value = st;
  currentItemKeys.value = story.itemKeys;
  applyContentFromState();
}

watch(categoryKey, () => {
  // No-op hook placeholder if future side effects are needed.
});

onMounted(() => {
  initializeFromUrl();
});
</script>

