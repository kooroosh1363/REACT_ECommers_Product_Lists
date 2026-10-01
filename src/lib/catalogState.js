export const SHORTLIST_STORAGE_KEY = "meridian:shortlist:v1";
export const MAX_SHORTLIST = 3;

export function normalizeQuery(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 100);
}

export function normalizeColor(value, allowedColors) {
  const colors = Array.isArray(allowedColors) ? allowedColors : [];
  return colors.includes(value) ? value : "all";
}

export function normalizeSort(value, allowedSorts) {
  const sorts = Array.isArray(allowedSorts) ? allowedSorts : [];
  return sorts.includes(value) ? value : "featured";
}

export function filterProducts(products, { query = "", color = "all" } = {}) {
  const normalizedQuery = normalizeQuery(query).toLowerCase();

  return products.filter((product) => {
    const colorMatches = color === "all" || product.color === color;
    if (!colorMatches) return false;
    if (!normalizedQuery) return true;

    const searchable = [
      product.name,
      product.color,
      product.profile,
      product.finish,
      product.description
    ].join(" ").toLowerCase();

    return searchable.includes(normalizedQuery);
  });
}

export function sortProducts(products, sort = "featured") {
  const result = [...products];

  switch (sort) {
    case "price-asc":
      return result.sort((a, b) => a.referencePrice - b.referencePrice || a.name.localeCompare(b.name));
    case "price-desc":
      return result.sort((a, b) => b.referencePrice - a.referencePrice || a.name.localeCompare(b.name));
    case "name":
      return result.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return result;
  }
}

export function selectProducts(products, state) {
  return sortProducts(filterProducts(products, state), state?.sort);
}

export function sanitizeShortlist(value, products, max = MAX_SHORTLIST) {
  if (!Array.isArray(value)) return [];

  const allowed = new Set(products.map((product) => product.id));
  const unique = [];

  for (const id of value.map(String)) {
    if (allowed.has(id) && !unique.includes(id)) unique.push(id);
    if (unique.length === max) break;
  }

  return unique;
}

export function toggleShortlist(current, id, products, max = MAX_SHORTLIST) {
  const safe = sanitizeShortlist(current, products, max);

  if (safe.includes(id)) {
    return safe.filter((item) => item !== id);
  }

  if (safe.length >= max) return safe;
  return sanitizeShortlist([...safe, id], products, max);
}

export function shortlistSummary(shortlist, products) {
  const ids = sanitizeShortlist(shortlist, products);
  const selected = ids
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  const totalReferencePrice = selected.reduce(
    (total, product) => total + product.referencePrice,
    0
  );

  return {
    count: selected.length,
    ids,
    totalReferencePrice,
    averageReferencePrice: selected.length
      ? Number((totalReferencePrice / selected.length).toFixed(2))
      : 0,
    colors: selected.map((product) => product.color)
  };
}

export function readCatalogState(search, allowedColors, allowedSorts) {
  const params = new URLSearchParams(search || "");

  return {
    query: normalizeQuery(params.get("q") || ""),
    color: normalizeColor(params.get("color") || "all", allowedColors),
    sort: normalizeSort(params.get("sort") || "featured", allowedSorts)
  };
}

export function writeCatalogState(search, state) {
  const params = new URLSearchParams(search || "");
  const query = normalizeQuery(state?.query);

  if (query) params.set("q", query);
  else params.delete("q");

  if (state?.color && state.color !== "all") params.set("color", state.color);
  else params.delete("color");

  if (state?.sort && state.sort !== "featured") params.set("sort", state.sort);
  else params.delete("sort");

  const next = params.toString();
  return next ? `?${next}` : "";
}
