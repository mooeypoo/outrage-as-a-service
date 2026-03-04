export function readRawParams() {
  if (typeof window === 'undefined') {
    return { cat: null, s: null, itemsArray: [] };
  }

  const search = window.location.search || '';
  const params = new URLSearchParams(search);
  const cat = params.get('cat');
  const s = params.get('s');
  const i = params.get('i') || '';
  const itemsArray = i ? i.split(',').filter(Boolean) : [];

  return { cat, s, itemsArray };
}

export function writeCanonicalParams(cat, statementId, itemKeys) {
  if (typeof window === 'undefined') return '';

  const url = new URL(window.location.href);
  const basePath = url.pathname;
  const hash = url.hash || '#/';

  const params = new URLSearchParams();
  if (cat) params.set('cat', cat);
  if (statementId) params.set('s', statementId);
  if (Array.isArray(itemKeys) && itemKeys.length) {
    params.set('i', itemKeys.join(','));
  }

  const query = params.toString();
  const newUrl = `${basePath}${query ? `?${query}` : ''}${hash}`;
  const current = `${url.pathname}${url.search}${url.hash}`;

  if (newUrl !== current) {
    // Canonicalize the visible URL so every combination has a stable, shareable link.
    window.history.replaceState({}, '', newUrl);
  }

  return newUrl;
}

