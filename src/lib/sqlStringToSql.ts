import { format } from 'sql-formatter';

type Segment =
  | { type: 'string'; value: string }
  | { type: 'text'; value: string };

function decodeEscapeSequence(char: string, source: string, index: number) {
  switch (char) {
    case 'n':
      return { value: '\n', nextIndex: index + 1 };
    case 'r':
      return { value: '\r', nextIndex: index + 1 };
    case 't':
      return { value: '\t', nextIndex: index + 1 };
    case 'b':
      return { value: '\b', nextIndex: index + 1 };
    case 'f':
      return { value: '\f', nextIndex: index + 1 };
    case 'v':
      return { value: '\v', nextIndex: index + 1 };
    case '\\':
      return { value: '\\', nextIndex: index + 1 };
    case '"':
      return { value: '"', nextIndex: index + 1 };
    case '\'':
      return { value: '\'', nextIndex: index + 1 };
    case '`':
      return { value: '`', nextIndex: index + 1 };
    case 'x': {
      const hex = source.slice(index + 1, index + 3);
      if (/^[0-9a-fA-F]{2}$/.test(hex)) {
        return { value: String.fromCharCode(parseInt(hex, 16)), nextIndex: index + 3 };
      }
      return { value: 'x', nextIndex: index + 1 };
    }
    case 'u': {
      if (source[index + 1] === '{') {
        const closingBrace = source.indexOf('}', index + 2);
        const codePoint = source.slice(index + 2, closingBrace);
        if (closingBrace !== -1 && /^[0-9a-fA-F]+$/.test(codePoint)) {
          return {
            value: String.fromCodePoint(parseInt(codePoint, 16)),
            nextIndex: closingBrace + 1,
          };
        }
      }
      const hex = source.slice(index + 1, index + 5);
      if (/^[0-9a-fA-F]{4}$/.test(hex)) {
        return { value: String.fromCharCode(parseInt(hex, 16)), nextIndex: index + 5 };
      }
      return { value: 'u', nextIndex: index + 1 };
    }
    default:
      return { value: char, nextIndex: index + 1 };
  }
}

function parseQuotedString(source: string, start: number, quote: '"' | '\'') {
  let value = '';
  let index = start + 1;

  while (index < source.length) {
    const char = source[index];
    if (char === '\\') {
      const nextChar = source[index + 1];
      if (nextChar === undefined) {
        break;
      }
      const decoded = decodeEscapeSequence(nextChar, source, index + 1);
      value += decoded.value;
      index = decoded.nextIndex;
      continue;
    }
    if (char === quote) {
      return { value, nextIndex: index + 1 };
    }
    value += char;
    index += 1;
  }

  throw new Error(`Unterminated ${quote} string literal`);
}

function parseTemplateLiteral(source: string, start: number) {
  let value = '';
  let index = start + 1;

  while (index < source.length) {
    const char = source[index];
    if (char === '\\') {
      const nextChar = source[index + 1];
      if (nextChar === undefined) {
        break;
      }
      const decoded = decodeEscapeSequence(nextChar, source, index + 1);
      value += decoded.value;
      index = decoded.nextIndex;
      continue;
    }
    if (char === '`') {
      return { value, nextIndex: index + 1 };
    }
    if (char === '$' && source[index + 1] === '{') {
      let depth = 1;
      let cursor = index + 2;
      while (cursor < source.length && depth > 0) {
        if (source[cursor] === '{') {
          depth += 1;
        } else if (source[cursor] === '}') {
          depth -= 1;
        }
        cursor += 1;
      }
      if (depth !== 0) {
        throw new Error('Unterminated template expression');
      }
      const expression = source.slice(index + 2, cursor - 1).trim();
      value += expression ? `{{${expression}}}` : '';
      index = cursor;
      continue;
    }
    value += char;
    index += 1;
  }

  throw new Error('Unterminated template literal');
}

function tokenize(source: string) {
  const segments: Segment[] = [];
  let textBuffer = '';
  let index = 0;

  while (index < source.length) {
    const char = source[index];
    if (char === '"' || char === '\'') {
      if (textBuffer) {
        segments.push({ type: 'text', value: textBuffer });
        textBuffer = '';
      }
      const parsed = parseQuotedString(source, index, char);
      segments.push({ type: 'string', value: parsed.value });
      index = parsed.nextIndex;
      continue;
    }
    if (char === '`') {
      if (textBuffer) {
        segments.push({ type: 'text', value: textBuffer });
        textBuffer = '';
      }
      const parsed = parseTemplateLiteral(source, index);
      segments.push({ type: 'string', value: parsed.value });
      index = parsed.nextIndex;
      continue;
    }
    textBuffer += char;
    index += 1;
  }

  if (textBuffer) {
    segments.push({ type: 'text', value: textBuffer });
  }

  return segments;
}

function stripComments(value: string) {
  return value
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/\/\/.*$/gm, ' ');
}

function toExpressionTokens(value: string) {
  return stripComments(value)
    .split('+')
    .map((token) => token.trim())
    .map((token) =>
      token
        .replace(/^(?:final\s+)?(?:String|const|let|var)\s+[\w$]+\s*=\s*/g, '')
        .replace(/^[\s(]+|[\s);]+$/g, '')
    )
    .filter(Boolean)
    .filter((token) => token !== ',');
}

function normalizeSegments(segments: Segment[]) {
  const stringCount = segments.filter((segment) => segment.type === 'string').length;
  if (stringCount === 0) {
    return [];
  }

  const normalized: string[] = [];

  segments.forEach((segment, index) => {
    if (segment.type === 'string') {
      normalized.push(segment.value);
      return;
    }

    const tokens = toExpressionTokens(segment.value);
    tokens.forEach((token) => {
      if (!token) {
        return;
      }
      const isEdge = index === 0 || index === segments.length - 1;
      if (isEdge && /^[\w$.\[\]]+$/.test(token) === false && token.includes('=')) {
        return;
      }
      if (token === 'new StringBuilder') {
        return;
      }
      normalized.push(`{{${token}}}`);
    });
  });

  return normalized;
}

export function extractSqlFromCode(source: string) {
  const trimmed = source.trim();
  if (!trimmed) {
    return '';
  }

  const segments = normalizeSegments(tokenize(source));
  if (segments.length === 0) {
    return trimmed;
  }

  return segments.join('').trim();
}

export function convertCodeStringToSql(source: string) {
  const sql = extractSqlFromCode(source);
  if (!sql) {
    return '';
  }

  try {
    return format(sql, {
      language: 'sql',
      tabWidth: 2,
      keywordCase: 'upper',
    });
  } catch {
    return sql;
  }
}
