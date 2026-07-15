export type Category = {
  id: string;
  label: string;
  labelMl: string;
  description?: string;
  createdAt: string;
};

export const defaultCategories: Category[] = [
  { id: "health-tips", label: "Health Tips", labelMl: "ആരോഗ്യ നുറുങ്ങുകൾ", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "treatments", label: "Treatments", labelMl: "ചികിൽസകൾ", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "seasonal", label: "Seasonal", labelMl: "ഋതു ചികിൽസ", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "visha-chikitsa", label: "Visha Chikitsa", labelMl: "വിഷ ചികിൽസ", createdAt: "2026-01-01T00:00:00.000Z" },
  { id: "classical-medicines", label: "Classical Medicines", labelMl: "ക്ലാസിക്കൽ ഔഷധങ്ങൾ", createdAt: "2026-01-01T00:00:00.000Z" },
];

/** Resolve a stored article.category (id, or a legacy label) to its display label. */
export function categoryLabel(value: string, cats: Category[]): string {
  const c = cats.find((x) => x.id === value || x.label === value);
  return c ? c.label : value;
}
