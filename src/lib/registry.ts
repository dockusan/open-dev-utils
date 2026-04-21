export type ToolCategory =
  | 'format'
  | 'converters'
  | 'inspect'
  | 'generators'
  | 'encoders';

export type ToolIconKey =
  | 'braces'
  | 'wrench'
  | 'code'
  | 'file-json'
  | 'arrow-left-right'
  | 'binary'
  | 'palette'
  | 'shield'
  | 'clock'
  | 'search'
  | 'diff'
  | 'qr'
  | 'hash'
  | 'wand'
  | 'image'
  | 'link'
  | 'type'
  | 'globe'
  | 'terminal'
  | 'key'
  | 'scan'
  | 'file-code'
  | 'list'
  | 'sparkles';

export interface ToolMeta {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  keywords: string[];
  icon?: ToolIconKey;
  featured?: boolean;
  pinned?: boolean;
}

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  format: 'Format & Validate',
  converters: 'Data Converters',
  inspect: 'Inspect & Debug',
  generators: 'Generators',
  encoders: 'Encoders & Decoders',
};

export const CATEGORY_SHORT_LABELS: Record<ToolCategory, string> = {
  format: 'Format',
  converters: 'Convert',
  inspect: 'Inspect',
  generators: 'Generate',
  encoders: 'Encode',
};

export const TOOLS: ToolMeta[] = [
  { id: 'json-formatter', name: 'JSON Formatter', category: 'format', description: 'Format, validate, and minify JSON', keywords: ['json', 'format', 'validate', 'minify', 'beautify'], icon: 'file-json', featured: true, pinned: true },
  { id: 'json-repair', name: 'JSON Repair', category: 'format', description: 'Repair broken JSON (unquoted keys, etc.)', keywords: ['json', 'repair', 'fix', 'broken'], icon: 'wrench', featured: true },
  { id: 'html-beautifier', name: 'HTML Beautifier', category: 'format', description: 'Format and beautify HTML code', keywords: ['html', 'format', 'beautify', 'indent'], icon: 'code' },
  { id: 'css-beautifier', name: 'CSS Beautifier', category: 'format', description: 'Format and beautify CSS code', keywords: ['css', 'format', 'beautify', 'indent'], icon: 'palette' },
  { id: 'js-beautifier', name: 'JS Beautifier', category: 'format', description: 'Format and beautify JavaScript/TypeScript', keywords: ['js', 'javascript', 'ts', 'typescript', 'format', 'beautify'], icon: 'code' },
  { id: 'erb-beautifier', name: 'ERB Beautifier', category: 'format', description: 'Format and beautify ERB templates', keywords: ['erb', 'ruby', 'format', 'beautify'], icon: 'file-code' },
  { id: 'less-beautifier', name: 'LESS Beautifier', category: 'format', description: 'Format and beautify LESS code', keywords: ['less', 'css', 'format', 'beautify'], icon: 'palette' },
  { id: 'scss-beautifier', name: 'SCSS Beautifier', category: 'format', description: 'Format and beautify SCSS/SASS code', keywords: ['scss', 'sass', 'css', 'format', 'beautify'], icon: 'palette' },
  { id: 'xml-beautifier', name: 'XML Beautifier', category: 'format', description: 'Format and beautify XML code', keywords: ['xml', 'format', 'beautify'], icon: 'code' },
  { id: 'sql-formatter', name: 'SQL Formatter', category: 'format', description: 'Format and beautify SQL queries', keywords: ['sql', 'query', 'format', 'beautify'], icon: 'terminal' },
  { id: 'line-sort-dedupe', name: 'Line Sort/Dedupe', category: 'format', description: 'Sort lines and remove duplicates', keywords: ['lines', 'sort', 'dedupe', 'unique'], icon: 'list' },

  { id: 'url-parser', name: 'URL Parser', category: 'converters', description: 'Parse URL into constituent parts', keywords: ['url', 'parse', 'extract', 'query'], icon: 'globe' },
  { id: 'yaml-json', name: 'YAML ↔ JSON', category: 'converters', description: 'Convert between YAML and JSON', keywords: ['yaml', 'json', 'convert'], icon: 'arrow-left-right' },
  { id: 'number-base-converter', name: 'Number Base Converter', category: 'converters', description: 'Convert numbers between different bases', keywords: ['number', 'base', 'hex', 'binary', 'decimal', 'octal'], icon: 'binary' },
  { id: 'json-csv', name: 'JSON ↔ CSV', category: 'converters', description: 'Convert between JSON and CSV', keywords: ['json', 'csv', 'convert', 'table'], icon: 'arrow-left-right' },
  { id: 'html-to-jsx', name: 'HTML to JSX', category: 'converters', description: 'Convert HTML to React JSX', keywords: ['html', 'jsx', 'react', 'convert'], icon: 'code' },
  { id: 'string-case-converter', name: 'String Case Converter', category: 'converters', description: 'Convert text between different casing styles', keywords: ['string', 'case', 'camel', 'snake', 'kebab', 'pascal'], icon: 'type' },
  { id: 'php-json', name: 'PHP ↔ JSON', category: 'converters', description: 'Convert between PHP arrays and JSON', keywords: ['php', 'json', 'array', 'convert'], icon: 'arrow-left-right' },
  { id: 'php-serializer', name: 'PHP Serializer', category: 'converters', description: 'Serialize and unserialize PHP data', keywords: ['php', 'serialize', 'unserialize', 'convert'], icon: 'arrow-left-right' },
  { id: 'svg-to-css', name: 'SVG to CSS', category: 'converters', description: 'Convert SVG to CSS Data URI', keywords: ['svg', 'css', 'data', 'uri', 'convert'], icon: 'palette' },
  { id: 'curl-to-code', name: 'cURL to Code', category: 'converters', description: 'Convert cURL commands to code in various languages', keywords: ['curl', 'code', 'convert', 'http'], icon: 'terminal', featured: true, pinned: true },
  { id: 'json-to-code', name: 'JSON to Code', category: 'converters', description: 'Generate types/interfaces from JSON', keywords: ['json', 'code', 'types', 'interfaces', 'typescript'], icon: 'file-code' },
  { id: 'hex-ascii', name: 'Hex ↔ ASCII', category: 'converters', description: 'Convert between Hex and ASCII text', keywords: ['hex', 'ascii', 'text', 'convert'], icon: 'binary' },

  { id: 'unix-time-converter', name: 'Unix Time Converter', category: 'inspect', description: 'Convert Unix timestamps to dates and vice-versa', keywords: ['unix', 'time', 'date', 'timestamp', 'epoch'], icon: 'clock', featured: true },
  { id: 'jwt-debugger', name: 'JWT Debugger', category: 'inspect', description: 'Decode and inspect JSON Web Tokens', keywords: ['jwt', 'token', 'decode', 'inspect', 'auth'], icon: 'shield', featured: true, pinned: true },
  { id: 'regexp-tester', name: 'RegExp Tester', category: 'inspect', description: 'Test regular expressions against text', keywords: ['regex', 'regexp', 'test', 'match'], icon: 'search', featured: true, pinned: true },
  { id: 'html-preview', name: 'HTML Preview', category: 'inspect', description: 'Preview HTML code in a sandbox', keywords: ['html', 'preview', 'sandbox', 'render'], icon: 'globe' },
  { id: 'text-diff', name: 'Text Diff', category: 'inspect', description: 'Compare two texts and find differences', keywords: ['text', 'diff', 'compare', 'difference'], icon: 'diff', featured: true, pinned: true },
  { id: 'string-inspector', name: 'String Inspector', category: 'inspect', description: 'Analyze string length, words, and characters', keywords: ['string', 'inspect', 'count', 'length', 'words', 'characters'], icon: 'scan' },
  { id: 'markdown-preview', name: 'Markdown Preview', category: 'inspect', description: 'Preview rendered Markdown text', keywords: ['markdown', 'preview', 'render', 'md'], icon: 'file-code' },
  { id: 'cron-parser', name: 'Cron Parser', category: 'inspect', description: 'Parse cron expressions and view upcoming runs', keywords: ['cron', 'parse', 'schedule', 'time'], icon: 'clock' },
  { id: 'color-converter', name: 'Color Converter', category: 'inspect', description: 'Convert between HEX, RGB, HSL color formats', keywords: ['color', 'convert', 'hex', 'rgb', 'hsl', 'hsv'], icon: 'palette' },

  { id: 'uuid-generator', name: 'UUID/ULID', category: 'generators', description: 'Generate UUIDs and ULIDs', keywords: ['uuid', 'ulid', 'generate', 'id', 'guid'], icon: 'sparkles' },
  { id: 'lorem-ipsum', name: 'Lorem Ipsum', category: 'generators', description: 'Generate dummy placeholder text', keywords: ['lorem', 'ipsum', 'text', 'generate', 'placeholder'], icon: 'type' },
  { id: 'qr-code-generator', name: 'QR Code Generator', category: 'generators', description: 'Generate QR codes from text', keywords: ['qr', 'code', 'generate', 'barcode'], icon: 'qr', featured: true },
  { id: 'hash-generator', name: 'Hash Generator', category: 'generators', description: 'Generate MD5, SHA1, SHA256 hashes', keywords: ['hash', 'md5', 'sha1', 'sha256', 'generate', 'crypto'], icon: 'hash' },
  { id: 'random-string-generator', name: 'Random String', category: 'generators', description: 'Generate secure random strings', keywords: ['random', 'string', 'generate', 'password'], icon: 'wand' },

  { id: 'base64-string', name: 'Base64 String', category: 'encoders', description: 'Encode and decode Base64 strings', keywords: ['base64', 'string', 'encode', 'decode'], icon: 'arrow-left-right' },
  { id: 'base64-image', name: 'Base64 Image', category: 'encoders', description: 'Encode images to Base64 data URIs', keywords: ['base64', 'image', 'encode', 'decode', 'data', 'uri'], icon: 'image' },
  { id: 'url-encoder', name: 'URL Encoder/Decoder', category: 'encoders', description: 'URL encode and decode strings', keywords: ['url', 'encode', 'decode', 'percent'], icon: 'link' },
  { id: 'html-entity-encoder', name: 'HTML Entity Encoder', category: 'encoders', description: 'Encode and decode HTML entities', keywords: ['html', 'entity', 'encode', 'decode'], icon: 'code' },
  { id: 'backslash-escape', name: 'Backslash Escape', category: 'encoders', description: 'Escape and unescape special characters', keywords: ['backslash', 'escape', 'unescape', 'string'], icon: 'type' },
  { id: 'certificate-decoder', name: 'Certificate Decoder', category: 'encoders', description: 'Decode X.509 SSL/TLS certificates', keywords: ['certificate', 'cert', 'x509', 'ssl', 'tls', 'decode', 'pem'], icon: 'key' },
];

export const FEATURED_TOOL_IDS = TOOLS.filter((tool) => tool.featured).map((tool) => tool.id);
export const PINNED_TOOL_IDS = TOOLS.filter((tool) => tool.pinned).map((tool) => tool.id);

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

export function getToolById(id: string) {
  return TOOLS.find((tool) => tool.id === id);
}

export function getFeaturedTools() {
  return TOOLS.filter((tool) => tool.featured);
}

export function getPinnedTools() {
  return TOOLS.filter((tool) => tool.pinned);
}
