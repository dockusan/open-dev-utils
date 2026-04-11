# Tools Implementation Plan

## Context

The devutils Tauri desktop app currently has 2 registered tools: `json-formatter` (fully implemented) and `uuid-generator` (placeholder). This plan covers adding 42 tools across 5 categories.

Architecture pattern: add a registry entry → create a component → wire up a route in `App.tsx`.

---

## Phase 1: Register All Tools

**File:** `src/lib/registry.ts`

Add all 40 missing tool entries to the `TOOLS` array.

**format:** `html-beautifier`, `css-beautifier`, `js-beautifier`, `erb-beautifier`, `less-beautifier`, `scss-beautifier`, `xml-beautifier`, `sql-formatter`, `line-sort-dedupe`

**converters:** `url-parser`, `yaml-json`, `number-base-converter`, `json-csv`, `html-to-jsx`, `string-case-converter`, `php-json`, `php-serializer`, `svg-to-css`, `curl-to-code`, `json-to-code`, `hex-ascii`

**inspect:** `unix-time-converter`, `jwt-debugger`, `regexp-tester`, `html-preview`, `text-diff`, `string-inspector`, `markdown-preview`, `cron-parser`, `color-converter`

**generators:** `lorem-ipsum`, `qr-code-generator`, `hash-generator`, `random-string-generator`
*(uuid-generator already registered)*

**encoders:** `base64-string`, `base64-image`, `url-encoder`, `html-entity-encoder`, `backslash-escape`, `certificate-decoder`

---

## Phase 2: Install npm Packages

```bash
npm install \
  prettier \
  @prettier/plugin-php \
  sql-formatter \
  js-yaml \
  papaparse @types/papaparse \
  change-case \
  diff @types/diff \
  marked \
  cronstrue \
  cron-parser \
  uuid @types/uuid \
  ulid \
  qrcode @types/qrcode \
  pkijs asn1js pvutils
```

**Pure-JS (no new deps):** URL Parser, Number Base Converter, HTML to JSX, PHP serializer, SVG to CSS, cURL to Code, JSON to Code, Hex↔ASCII, Unix Time, JWT Debugger, RegExp Tester, HTML Preview, String Inspector, Color Converter, Base64 String/Image, URL Encoder, HTML Entity, Backslash Escape, Hash (SubtleCrypto), Random String Generator.

---

## Phase 3: Create Tool Components

File pattern: `src/tools/<ComponentName>.tsx`

All tools use `ToolLayout` wrapper:
```tsx
<ToolLayout toolId={toolId}>
  <div className="flex flex-col gap-4 p-4 h-full">
    {/* input + output areas */}
  </div>
</ToolLayout>
```

### Format & Validate (2-panel: input textarea → formatted output)

| Tool | Component | Library |
|------|-----------|---------|
| HTML Beautifier | `HtmlBeautifier` | `prettier` (html parser) |
| CSS Beautifier | `CssBeautifier` | `prettier` (css parser) |
| JS Beautifier | `JsBeautifier` | `prettier` (babel parser) |
| ERB Beautifier | `ErbBeautifier` | `prettier` + `@prettier/plugin-php` or raw indent |
| LESS Beautifier | `LessBeautifier` | `prettier` (less parser) |
| SCSS Beautifier | `ScssBeautifier` | `prettier` (scss parser) |
| XML Beautifier | `XmlBeautifier` | `prettier` or manual DOM serializer |
| SQL Formatter | `SqlFormatter` | `sql-formatter` |
| Line Sort/Dedupe | `LineSortDedupe` | pure JS |

### Data Converters

| Tool | Component | Approach |
|------|-----------|---------|
| URL Parser | `UrlParser` | `new URL(input)` → display fields |
| YAML ↔ JSON | `YamlJson` | `js-yaml` parse/dump |
| Number Base Converter | `NumberBaseConverter` | `parseInt(n, from).toString(to)` |
| JSON ↔ CSV | `JsonCsv` | `papaparse` |
| HTML to JSX | `HtmlToJsx` | manual transforms (class→className, self-close voids) |
| String Case Converter | `StringCaseConverter` | `change-case` |
| PHP ↔ JSON | `PhpJson` | custom PHP array syntax parser |
| PHP Serializer | `PhpSerializer` | custom serialize/unserialize |
| SVG to CSS | `SvgToCss` | `btoa(svg)` → data URL |
| cURL to Code | `CurlToCode` | custom parser → Python/JS/Go templates |
| JSON to Code | `JsonToCode` | schema inference → TS/Python/Go types |
| Hex ↔ ASCII | `HexAscii` | `charCodeAt`/`fromCharCode` |

### Inspect, Preview & Debug

| Tool | Component | Approach |
|------|-----------|---------|
| Unix Time Converter | `UnixTimeConverter` | `new Date(ts * 1000)`, multi-format |
| JWT Debugger | `JwtDebugger` | split `.`, `atob()` each part |
| RegExp Tester | `RegexpTester` | live match highlighting |
| HTML Preview | `HtmlPreview` | sandboxed `<iframe srcDoc={html}>` |
| Text Diff | `TextDiff` | `diff` package (`diffLines`) |
| String Inspector | `StringInspector` | charCount, byteLen, wordCount, lineCount |
| Markdown Preview | `MarkdownPreview` | `marked` → `dangerouslySetInnerHTML` |
| Cron Parser | `CronParser` | `cronstrue` description + next 10 run times |
| Color Converter | `ColorConverter` | pure JS HEX↔RGB↔HSL↔HSV + swatch |

### Generators

| Tool | Component | Library |
|------|-----------|---------|
| UUID/ULID Generator | `UuidGenerator` (upgrade) | `uuid` + `ulid` |
| Lorem Ipsum | `LoremIpsum` | local word bank |
| QR Code Generator | `QrCodeGenerator` | `qrcode` (canvas render) |
| Hash Generator | `HashGenerator` | `crypto.subtle.digest` (SHA); custom MD5/Keccak |
| Random String Generator | `RandomStringGenerator` | `crypto.getRandomValues()` |

### Encoders & Decoders

| Tool | Component | Approach |
|------|-----------|---------|
| Base64 String | `Base64String` | `btoa`/`atob` |
| Base64 Image | `Base64Image` | file upload → data URL; paste → preview |
| URL Encoder/Decoder | `UrlEncoder` | `encodeURIComponent`/`decodeURIComponent` |
| HTML Entity Encoder | `HtmlEntityEncoder` | regex entity encode/decode |
| Backslash Escape | `BackslashEscape` | escape/unescape `\n`, `\t`, `\"`, `\\` |
| Certificate Decoder | `CertificateDecoder` | `pkijs` PEM/DER → subject/issuer/validity/SANs |

---

## Phase 4: Wire Routes in App.tsx

Refactor `App.tsx` to use a component lookup map (cleaner than if-else chain):

```tsx
const TOOL_COMPONENTS: Partial<Record<string, React.ReactElement>> = {
  'json-formatter': <JsonFormatter toolId="json-formatter" />,
  'html-beautifier': <HtmlBeautifier toolId="html-beautifier" />,
  // ... all 42 tools
};

// In router map:
component = TOOL_COMPONENTS[tool.id] ?? <Placeholder toolId={tool.id} />;
```

---

## Phase 5: Shared UI Components (recommended)

Create reusable components for common patterns:

- **`src/components/TwoPanel.tsx`** — side-by-side/stacked input + output textareas with copy button
- **`src/components/CopyButton.tsx`** — clipboard copy with check-icon feedback

---

## Critical Files

| File | Change |
|------|--------|
| `src/lib/registry.ts` | Add all 40 new tool entries |
| `src/App.tsx` | Refactor to component map, import all tool components |
| `src/tools/*.tsx` | Create one file per tool (41 new files) |
| `src/components/TwoPanel.tsx` | New shared UI component |
| `src/components/CopyButton.tsx` | New shared UI component |
| `package.json` | Add required npm dependencies |

---

## Verification

1. `npm run dev` — app loads, all 42 tools appear in sidebar under correct categories
2. Each tool renders without crashing
3. For each implemented tool: test with sample inputs, verify output is correct
4. `npm run build` — TypeScript compiles cleanly
5. Verify dark mode works on all new tool UIs
