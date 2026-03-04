export function randomItem(list) {
  if (!Array.isArray(list) || list.length === 0) return null;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

export function randomKeyFromObject(obj) {
  if (!obj) return null;
  const keys = Object.keys(obj);
  return randomItem(keys);
}

