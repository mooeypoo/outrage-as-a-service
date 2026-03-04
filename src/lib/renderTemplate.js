export function renderTemplate(template, slots, typesByKey, itemKeys) {
  if (!template || !Array.isArray(slots) || !Array.isArray(itemKeys)) return template || '';
  let result = template;

  // Sequentially replace placeholders so repeated slot types map to the correct item key order.
  slots.forEach((slotType, index) => {
    const typeMap = typesByKey && typesByKey[slotType] ? typesByKey[slotType] : {};
    const key = itemKeys[index];
    const display = typeMap[key] || key || '';
    result = result.replace(`{${slotType}}`, display);
  });

  return result;
}

export function renderStatementTemplate(template, slots, itemsByType) {
  let result = template;
  const replacements = {};

  slots.forEach((slotType, index) => {
    const key = `${slotType}_${index}`;
    const typeMap = itemsByType[slotType] || {};
    replacements[key] = typeMap[slotType] || '';
  });

  return result;
}

