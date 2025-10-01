import sanitizeHtml from 'sanitize-html';

/**
 * Sanitization options for rich text content (articles)
 * Allows common formatting tags but removes dangerous elements
 */
const richTextOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'hr',
    'strong', 'b', 'em', 'i', 'u', 's', 'strike',
    'ul', 'ol', 'li',
    'a', 'img',
    'blockquote', 'pre', 'code',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
  ],
  allowedAttributes: {
    'a': ['href', 'title', 'target', 'rel'],
    'img': ['src', 'alt', 'title', 'width', 'height'],
    'code': ['class'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  // Enforce rel="noopener noreferrer" on links with target="_blank"
  transformTags: {
    'a': (tagName, attribs) => {
      if (attribs.target === '_blank') {
        return {
          tagName: 'a',
          attribs: {
            ...attribs,
            rel: 'noopener noreferrer',
          },
        };
      }
      return { tagName, attribs };
    },
  },
};

/**
 * Sanitization options for plain text with minimal formatting
 * Used for user profiles, comments, etc.
 */
const basicTextOptions: sanitizeHtml.IOptions = {
  allowedTags: ['br', 'p', 'strong', 'em'],
  allowedAttributes: {},
};

/**
 * Sanitize rich text content (articles, blog posts)
 * Allows HTML formatting but removes dangerous elements
 */
export function sanitizeRichText(html: string): string {
  if (!html) return '';
  return sanitizeHtml(html, richTextOptions);
}

/**
 * Sanitize basic text with minimal formatting
 * Used for user-generated content like bios, comments
 */
export function sanitizeBasicText(text: string): string {
  if (!text) return '';
  return sanitizeHtml(text, basicTextOptions);
}

/**
 * Sanitize plain text - strips all HTML tags
 * Used for names, titles, short descriptions
 */
export function sanitizePlainText(text: string): string {
  if (!text) return '';
  // Remove all HTML tags and normalize whitespace
  return sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Sanitize URL - ensures it's safe and uses allowed protocol
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';

  // Remove any whitespace
  const cleanUrl = url.trim();

  // Check for allowed protocols
  const allowedProtocols = ['http:', 'https:', 'mailto:'];
  try {
    const urlObj = new URL(cleanUrl);
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return '';
    }
    return cleanUrl;
  } catch {
    // If URL parsing fails, it's invalid
    return '';
  }
}

/**
 * Sanitize filename - removes dangerous characters
 */
export function sanitizeFilename(filename: string): string {
  if (!filename) return '';

  // Remove directory traversal attempts and dangerous characters
  return filename
    .replace(/\.\./g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(0, 255); // Limit length
}

/**
 * Sanitize slug - ensures URL-safe string
 */
export function sanitizeSlug(slug: string): string {
  if (!slug) return '';

  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 200);
}

/**
 * Sanitize email - basic email format validation
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';

  return email.toLowerCase().trim();
}

/**
 * Sanitize object recursively
 * Applies appropriate sanitization based on field name
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj };

  for (const key in sanitized) {
    const value = sanitized[key];

    if (typeof value === 'string') {
      // Apply sanitization based on field name
      if (key.includes('email') || key === 'email') {
        (sanitized as Record<string, unknown>)[key] = sanitizeEmail(value);
      } else if (key.includes('url') || key.includes('Url')) {
        (sanitized as Record<string, unknown>)[key] = sanitizeUrl(value);
      } else if (key === 'slug') {
        (sanitized as Record<string, unknown>)[key] = sanitizeSlug(value);
      } else if (key === 'content' || key === 'body') {
        (sanitized as Record<string, unknown>)[key] = sanitizeRichText(value);
      } else if (key === 'filename') {
        (sanitized as Record<string, unknown>)[key] = sanitizeFilename(value);
      } else if (
        key.includes('name') ||
        key.includes('title') ||
        key.includes('subject')
      ) {
        (sanitized as Record<string, unknown>)[key] = sanitizePlainText(value);
      } else if (
        key === 'bio' ||
        key === 'description' ||
        key === 'excerpt'
      ) {
        (sanitized as Record<string, unknown>)[key] = sanitizeBasicText(value);
      }
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Recursively sanitize nested objects
      (sanitized as Record<string, unknown>)[key] = sanitizeObject(value as Record<string, unknown>);
    }
  }

  return sanitized;
}
