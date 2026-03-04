export async function shareUrl(url, title) {
  if (typeof navigator === 'undefined') return { supported: false, usedNative: false };

  // Prefer the native Web Share API for environments that support it.
  if (navigator.share) {
    try {
      await navigator.share({ url, title });
      return { supported: true, usedNative: true };
    } catch (e) {
      return { supported: true, usedNative: true, error: e };
    }
  }

  return { supported: false, usedNative: false };
}

export async function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  } catch {
    return false;
  }
}

