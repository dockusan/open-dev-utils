import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Placeholder } from './tools/Placeholder';
import { JsonFormatter } from './tools/JsonFormatter';
import { HtmlBeautifier } from './tools/HtmlBeautifier';
import { CssBeautifier } from './tools/CssBeautifier';
import { JsBeautifier } from './tools/JsBeautifier';
import { ErbBeautifier } from './tools/ErbBeautifier';
import { LessBeautifier } from './tools/LessBeautifier';
import { ScssBeautifier } from './tools/ScssBeautifier';
import { XmlBeautifier } from './tools/XmlBeautifier';
import { SqlFormatter } from './tools/SqlFormatter';
import { LineSortDedupe } from './tools/LineSortDedupe';
import { UuidGenerator } from './tools/UuidGenerator';
import { LoremIpsum } from './tools/LoremIpsum';
import { QrCodeGenerator } from './tools/QrCodeGenerator';
import { HashGenerator } from './tools/HashGenerator';
import { RandomStringGenerator } from './tools/RandomStringGenerator';
import { Base64String } from './tools/Base64String';
import { Base64Image } from './tools/Base64Image';
import { UrlEncoder } from './tools/UrlEncoder';
import { HtmlEntityEncoder } from './tools/HtmlEntityEncoder';
import { BackslashEscape } from './tools/BackslashEscape';
import { CertificateDecoder } from './tools/CertificateDecoder';
import { UrlParser } from './tools/UrlParser';
import { YamlJson } from './tools/YamlJson';
import { NumberBaseConverter } from './tools/NumberBaseConverter';
import { JsonCsv } from './tools/JsonCsv';
import { HtmlToJsx } from './tools/HtmlToJsx';
import { StringCaseConverter } from './tools/StringCaseConverter';
import { PhpJson } from './tools/PhpJson';
import { PhpSerializer } from './tools/PhpSerializer';
import { SvgToCss } from './tools/SvgToCss';
import { CurlToCode } from './tools/CurlToCode';
import { JsonToCode } from './tools/JsonToCode';
import { HexAscii } from './tools/HexAscii';
import { UnixTimeConverter } from './tools/UnixTimeConverter';
import { JwtDebugger } from './tools/JwtDebugger';
import { RegexpTester } from './tools/RegexpTester';
import { HtmlPreview } from './tools/HtmlPreview';
import { TextDiff } from './tools/TextDiff';
import { StringInspector } from './tools/StringInspector';
import { MarkdownPreview } from './tools/MarkdownPreview';
import { CronParser } from './tools/CronParser';
import { ColorConverter } from './tools/ColorConverter';
import { JsonRepair } from './tools/JsonRepair';
import { TOOLS } from './lib/registry';

const TOOL_COMPONENTS: Partial<Record<string, React.ReactElement>> = {
  'json-formatter': <JsonFormatter toolId="json-formatter" />,
  'html-beautifier': <HtmlBeautifier toolId="html-beautifier" />,
  'css-beautifier': <CssBeautifier toolId="css-beautifier" />,
  'js-beautifier': <JsBeautifier toolId="js-beautifier" />,
  'erb-beautifier': <ErbBeautifier toolId="erb-beautifier" />,
  'less-beautifier': <LessBeautifier toolId="less-beautifier" />,
  'scss-beautifier': <ScssBeautifier toolId="scss-beautifier" />,
  'xml-beautifier': <XmlBeautifier toolId="xml-beautifier" />,
  'sql-formatter': <SqlFormatter toolId="sql-formatter" />,
  'line-sort-dedupe': <LineSortDedupe toolId="line-sort-dedupe" />,
  'uuid-generator': <UuidGenerator toolId="uuid-generator" />,
  'lorem-ipsum': <LoremIpsum toolId="lorem-ipsum" />,
  'qr-code-generator': <QrCodeGenerator toolId="qr-code-generator" />,
  'hash-generator': <HashGenerator toolId="hash-generator" />,
  'random-string-generator': <RandomStringGenerator toolId="random-string-generator" />,
  'base64-string': <Base64String toolId="base64-string" />,
  'base64-image': <Base64Image toolId="base64-image" />,
  'url-encoder': <UrlEncoder toolId="url-encoder" />,
  'html-entity-encoder': <HtmlEntityEncoder toolId="html-entity-encoder" />,
  'backslash-escape': <BackslashEscape toolId="backslash-escape" />,
  'certificate-decoder': <CertificateDecoder toolId="certificate-decoder" />,
  'url-parser': <UrlParser toolId="url-parser" />,
  'yaml-json': <YamlJson toolId="yaml-json" />,
  'number-base-converter': <NumberBaseConverter toolId="number-base-converter" />,
  'json-csv': <JsonCsv toolId="json-csv" />,
  'html-to-jsx': <HtmlToJsx toolId="html-to-jsx" />,
  'string-case-converter': <StringCaseConverter toolId="string-case-converter" />,
  'php-json': <PhpJson toolId="php-json" />,
  'php-serializer': <PhpSerializer toolId="php-serializer" />,
  'svg-to-css': <SvgToCss toolId="svg-to-css" />,
  'curl-to-code': <CurlToCode toolId="curl-to-code" />,
  'json-to-code': <JsonToCode toolId="json-to-code" />,
  'hex-ascii': <HexAscii toolId="hex-ascii" />,
  'unix-time-converter': <UnixTimeConverter toolId="unix-time-converter" />,
  'jwt-debugger': <JwtDebugger toolId="jwt-debugger" />,
  'regexp-tester': <RegexpTester toolId="regexp-tester" />,
  'html-preview': <HtmlPreview toolId="html-preview" />,
  'text-diff': <TextDiff toolId="text-diff" />,
  'string-inspector': <StringInspector toolId="string-inspector" />,
  'markdown-preview': <MarkdownPreview toolId="markdown-preview" />,
  'cron-parser': <CronParser toolId="cron-parser" />,
  'color-converter': <ColorConverter toolId="color-converter" />,
  'json-repair': <JsonRepair toolId="json-repair" />,
};

// Hash router works reliably under the tauri:// scheme
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/json-formatter" replace /> },
      ...TOOLS.map((tool) => {
        const component = TOOL_COMPONENTS[tool.id] ?? <Placeholder toolId={tool.id} />;
        return {
          path: tool.id,
          element: component,
        };
      }),
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
