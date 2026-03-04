export async function loadIndex() {
  const res = await fetch('./content/index.json');
  return res.json();
}

export async function loadCategoryItems(key) {
  const res = await fetch(`./content/${key}/items.json`);
  return res.json();
}

export async function loadCategoryStatements(key) {
  const res = await fetch(`./content/${key}/statements.json`);
  return res.json();
}

