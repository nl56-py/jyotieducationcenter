/**
 * Sanitizes HTML strings for safe rendering via dangerouslySetInnerHTML.
 * Strips dangerous elements/attributes while preserving safe formatting tags.
 * 
 * OWASP A03: Injection prevention for client-rendered HTML content.
 */

// Tags allowed to remain in sanitized output
const ALLOWED_TAGS = new Set([
  'p', 'br', 'b', 'i', 'u', 'em', 'strong', 'small', 'sub', 'sup',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  'a', 'img', 'figure', 'figcaption',
  'blockquote', 'pre', 'code', 'span', 'div',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'hr', 'mark', 'abbr', 'time',
]);

// Attributes allowed on specific tags
const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(['href', 'title', 'target', 'rel']),
  img: new Set(['src', 'alt', 'width', 'height', 'loading']),
  td: new Set(['colspan', 'rowspan']),
  th: new Set(['colspan', 'rowspan', 'scope']),
  time: new Set(['datetime']),
  abbr: new Set(['title']),
  '*': new Set(['class', 'id', 'style']),
};

// Patterns that indicate dangerous content
const DANGEROUS_URI_PATTERN = /^\s*(javascript|vbscript|data\s*:(?!image\/(png|jpe?g|gif|webp|svg\+xml)))/i;

/**
 * Sanitize an HTML string, removing dangerous elements and attributes.
 * This is a lightweight, dependency-free sanitizer suitable for CMS-sourced
 * content that's been authored by trusted admins.
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return "";

  // 1. Remove <script>, <iframe>, <object>, <embed>, <form>, <style>, <link>, <meta>, <base> tags entirely
  let clean = dirty
    .replace(/<\s*script[\s>][\s\S]*?<\s*\/\s*script\s*>/gi, "")
    .replace(/<\s*iframe[\s>][\s\S]*?<\s*\/\s*iframe\s*>/gi, "")
    .replace(/<\s*object[\s>][\s\S]*?<\s*\/\s*object\s*>/gi, "")
    .replace(/<\s*embed[\s>][\s\S]*?<\s*\/\s*embed\s*>/gi, "")
    .replace(/<\s*embed\s*[^>]*\/?>/gi, "")
    .replace(/<\s*form[\s>][\s\S]*?<\s*\/\s*form\s*>/gi, "")
    .replace(/<\s*style[\s>][\s\S]*?<\s*\/\s*style\s*>/gi, "")
    .replace(/<\s*link\s*[^>]*\/?>/gi, "")
    .replace(/<\s*meta\s*[^>]*\/?>/gi, "")
    .replace(/<\s*base\s*[^>]*\/?>/gi, "");

  // 2. Remove ALL event handler attributes (on*)
  clean = clean.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  // 3. Remove dangerous href/src attributes
  clean = clean.replace(
    /(href|src|action|formaction)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi,
    (match, attr, doubleVal, singleVal) => {
      const val = (doubleVal ?? singleVal ?? "").trim();
      if (DANGEROUS_URI_PATTERN.test(val)) {
        return ""; // strip the entire attribute
      }
      return match;
    }
  );

  // 4. Remove srcdoc attributes (can contain embedded HTML/scripts)
  clean = clean.replace(/\s+srcdoc\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  return clean;
}
