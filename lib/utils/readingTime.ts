/**
 * Calculate reading time from article content
 * @param content - Article content (HTML or plain text)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;

  // Strip HTML tags if present
  const plainText = content.replace(/<[^>]*>/g, '');

  // Count words
  const wordCount = plainText.trim().split(/\s+/).filter(word => word.length > 0).length;

  // Calculate minutes and round up
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  // Minimum 1 minute
  return Math.max(1, minutes);
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @param locale - Locale for formatting
 * @returns Formatted reading time string
 */
export function formatReadingTime(minutes: number, locale: string): string {
  if (locale === 'ar') {
    if (minutes === 1) return 'دقيقة واحدة';
    if (minutes === 2) return 'دقيقتان';
    if (minutes >= 3 && minutes <= 10) return `${minutes} دقائق`;
    return `${minutes} دقيقة`;
  }

  return minutes === 1 ? '1 min read' : `${minutes} min read`;
}
