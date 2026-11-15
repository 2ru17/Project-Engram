import DOMPurify, { type Config } from "dompurify";

export type SanitizeConfig = Omit<
  Config,
  "RETURN_DOM" | "RETURN_DOM_FRAGMENT" | "RETURN_TRUSTED_TYPE"
>;

const SSR_BLOCKED_TAGS = [
  "script",
  "iframe",
  "object",
  "embed",
  "applet",
  "base",
  "meta",
  "link",
  "form",
  "style",
  "template",
  "noscript",
  "frame",
  "frameset",
  "plaintext",
  "xmp",
];

const INLINE_EVENT_ATTR_RE =
  /(?:^|[\s/])on[a-z0-9_-]*\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const SRCDOC_ATTR_RE =
  /(?:^|[\s/])srcdoc\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const URI_ATTR_RE =
  /((?:^|[\s/])(?:href|xlink:href|src|action|formaction|poster|background)\s*=\s*)(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
const DANGEROUS_STYLE_RE =
  /((?:^|[\s/])style\s*=\s*)(?:"([^"]*)"|'([^']*)')/gi;

function decodeSimpleHtmlEntities(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);?/gi, (_, hex: string) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);?/g, (_, dec: string) =>
      String.fromCodePoint(parseInt(dec, 10)),
    )
    .replace(/&colon;/gi, ":");
}

function isUnsafeUriValue(rawValue: string): boolean {
  const normalized = decodeSimpleHtmlEntities(rawValue)
    .replace(/[\u0000-\u0020\u007f]+/g, "")
    .toLowerCase();
  return (
    normalized.startsWith("javascript:") ||
    normalized.startsWith("vbscript:") ||
    normalized.startsWith("data:text/html")
  );
}

function sanitizeTagAttributesForSsr(rawAttrs: string): string {
  if (!rawAttrs) return "";
  return rawAttrs
    .replace(INLINE_EVENT_ATTR_RE, "")
    .replace(SRCDOC_ATTR_RE, "")
    .replace(
      URI_ATTR_RE,
      (full, prefix: string, dq?: string, sq?: string, uq?: string) => {
        const val = dq ?? sq ?? uq ?? "";
        return isUnsafeUriValue(val) ? `${prefix}""` : full;
      },
    )
    .replace(
      DANGEROUS_STYLE_RE,
      (full, prefix: string, dq?: string, sq?: string) => {
        const val = dq ?? sq ?? "";
        const decoded = decodeSimpleHtmlEntities(val);
        if (/expression\s*\(|javascript\s*:/i.test(decoded)) {
          return `${prefix}""`;
        }
        return full;
      },
    );
}

function stripUnsafeHtmlForSsr(dirty: string, config?: SanitizeConfig): string {
  const disallowSvg = Boolean(config?.USE_PROFILES && !config.USE_PROFILES.svg);
  const blockedTags = disallowSvg
    ? [...SSR_BLOCKED_TAGS, "svg"]
    : SSR_BLOCKED_TAGS;
  const tagGroup = blockedTags.join("|");
  const pairedBlockRe = new RegExp(
    `<(${tagGroup})\\b[^>]*>[\\s\\S]*?<\\/\\s*\\1\\s*>`,
    "gi",
  );
  const singleTagRe = new RegExp(`<\\s*\\/?\\s*(?:${tagGroup})\\b[^>]*>`, "gi");

  let sanitized = dirty;
  let prev = "";
  while (sanitized !== prev) {
    prev = sanitized;
    sanitized = sanitized
      .replace(pairedBlockRe, "")
      .replace(singleTagRe, "");
  }

  return sanitized.replace(
    /<([a-zA-Z][^\s/>]*)([^>]*)>/g,
    (full, tagName: string, attrs: string) => {
      if (!attrs) return full;
      return `<${tagName}${sanitizeTagAttributesForSsr(attrs)}>`;
    },
  );
}

/**
 * Sanitizes untrusted HTML, SVG, or MathML strings.
 * Uses DOMPurify directly in the browser and falls back to a pure-JS tag/attribute
 * filter during SSR prerendering so Node/Turbopack never bundles or executes jsdom.
 */
export function sanitizeHtml(dirty: string, config?: SanitizeConfig): string {
  if (!dirty) return "";
  if (typeof window !== "undefined" && DOMPurify.isSupported) {
    return DOMPurify.sanitize(dirty, config);
  }
  return stripUnsafeHtmlForSsr(dirty, config);
}
