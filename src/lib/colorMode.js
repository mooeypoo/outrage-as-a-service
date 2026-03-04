const STORAGE_KEY = 'colorMode';

function systemPrefersDark() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function initColorMode() {
  const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
  const initial = stored === 'light' || stored === 'dark' ? stored : systemPrefersDark() ? 'dark' : 'light';
  applyColorMode(initial);
}

export function getCurrentColorMode() {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.getAttribute('data-theme') || 'light';
}

export function toggleColorMode() {
  const current = getCurrentColorMode();
  const next = current === 'light' ? 'dark' : 'light';
  applyColorMode(next);
}

function applyColorMode(mode) {
  if (typeof document === 'undefined') return;
  // Persisted mode wins over system preference for subsequent visits.
  document.documentElement.setAttribute('data-theme', mode);
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch (e) {
    // Ignore storage failures.
  }
}

