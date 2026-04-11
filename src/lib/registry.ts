export type ToolCategory =
  | 'format'
  | 'converters'
  | 'inspect'
  | 'generators'
  | 'encoders';

export interface ToolMeta {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  keywords: string[];
}

export const TOOLS: ToolMeta[] = [
  { id: 'json-formatter', name: 'JSON Formatter', category: 'format', description: 'Format, validate, and minify JSON', keywords: ['json', 'format', 'validate', 'minify', 'beautify'] },
  // Adding just one more for visual validation of sidebar routing
  { id: 'uuid-generator', name: 'UUID/ULID Generator', category: 'generators', description: 'Generate and decode UUID identifiers', keywords: ['uuid', 'ulid', 'generate', 'id'] },
];

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  format: 'Format & Validate',
  converters: 'Data Converters',
  inspect: 'Inspect & Debug',
  generators: 'Generators',
  encoders: 'Encoders & Decoders',
};

export function searchTools(query: string): ToolMeta[] {
  const q = query.toLowerCase().trim();
  if (!q) return TOOLS;
  return TOOLS.filter(
    (tool) =>
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.includes(q))
  );
}

export function getToolsByCategory(category: ToolCategory): ToolMeta[] {
  return TOOLS.filter((t) => t.category === category);
}
