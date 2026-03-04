<template>
  <div class="share-bar">
    <button
      type="button"
      class="btn"
      :disabled="!shareSupported && sharing"
      :title="shareTitle"
      @click="onShare"
    >
      Share
    </button>
    <button type="button" class="btn" @click="onCopy">
      <span v-if="copied">Copied</span>
      <span v-else>Copy URL</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { shareUrl, copyToClipboard } from '../lib/share';

const props = defineProps({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Outrage as a Service'
  }
});

const copied = ref(false);
const shareSupported = 'navigator' in window && !!window.navigator.share;
const sharing = ref(false);

const shareTitle = computed(() =>
  shareSupported ? 'Share via your device' : 'Sharing is disabled (not supported here)'
);

const onShare = async () => {
  sharing.value = true;
  const result = await shareUrl(props.url, props.title);
  sharing.value = false;
  if (!result.supported) {
    await onCopy();
  }
};

const onCopy = async () => {
  const ok = await copyToClipboard(props.url);
  if (ok) {
    copied.value = true;
    window.setTimeout(() => {
      copied.value = false;
    }, 1500);
  }
};
</script>

<style scoped>
.share-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.btn {
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  padding: 0.35rem 0.9rem;
  font-size: 0.8rem;
  cursor: pointer;
}

.btn:hover:not(:disabled) {
  border-color: var(--color-accent);
}

.btn:disabled {
  opacity: 0.6;
  cursor: default;
}
</style>

