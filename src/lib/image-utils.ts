import { ValidationError } from '@/types/errors'

// Allowed image domains and their validation patterns
const ALLOWED_IMAGE_DOMAINS = {
  'image.tmdb.org': {
    protocol: 'https',
    pathPattern: /^\/t\/p\/[a-zA-Z0-9]+/,
    allowedSizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
  }
} as const

// Default fallback image as a data URL (1x1 transparent pixel)
const DEFAULT_FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+'

/**
 * Validates and sanitizes external image URLs
 * @param url The URL to validate
 * @param domain The expected domain
 * @returns Validated URL or null if invalid
 */
export function validateImageUrl(url: string | null | undefined, domain: keyof typeof ALLOWED_IMAGE_DOMAINS): string | null {
  if (!url || typeof url !== 'string') {
    return null
  }

  try {
    const urlObj = new URL(url)
    const domainConfig = ALLOWED_IMAGE_DOMAINS[domain]

    // Check protocol
    if (urlObj.protocol !== `${domainConfig.protocol}:`) {
      throw new ValidationError(
        `Invalid protocol for ${domain}. Expected ${domainConfig.protocol}`,
        'INVALID_IMAGE_PROTOCOL',
        { providedUrl: url, expectedProtocol: domainConfig.protocol }
      )
    }

    // Check hostname
    if (urlObj.hostname !== domain) {
      throw new ValidationError(
        `Invalid hostname. Expected ${domain}`,
        'INVALID_IMAGE_HOSTNAME',
        { providedUrl: url, expectedHostname: domain }
      )
    }

    // Check path pattern
    if (!domainConfig.pathPattern.test(urlObj.pathname)) {
      throw new ValidationError(
        `Invalid image path pattern for ${domain}`,
        'INVALID_IMAGE_PATH',
        { providedUrl: url, expectedPattern: domainConfig.pathPattern.toString() }
      )
    }

    // Additional security checks
    if (urlObj.search || urlObj.hash) {
      throw new ValidationError(
        'Image URL contains query parameters or hash fragments',
        'INVALID_IMAGE_URL_COMPONENTS',
        { providedUrl: url }
      )
    }

    return url
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error
    }
    
    // Handle URL parsing errors
    throw new ValidationError(
      'Invalid image URL format',
      'INVALID_IMAGE_URL_FORMAT',
      { providedUrl: url, originalError: error instanceof Error ? error.message : String(error) }
    )
  }
}

/**
 * Builds a secure TMDB image URL
 * @param posterPath The poster path from TMDB API
 * @param size The desired image size
 * @returns Secure image URL or null if invalid
 */
export function buildTmdbImageUrl(posterPath: string | null | undefined, size: string = 'w500'): string | null {
  if (!posterPath || typeof posterPath !== 'string') {
    return null
  }

  // Validate poster path format
  if (!posterPath.startsWith('/') || posterPath.includes('..') || posterPath.includes('//')) {
    console.warn('Invalid poster path format:', posterPath)
    return null
  }

  // Validate size parameter
  const domainConfig = ALLOWED_IMAGE_DOMAINS['image.tmdb.org']
  if (!domainConfig.allowedSizes.includes(size as any)) {
    console.warn('Invalid image size:', size)
    return null
  }

  try {
    const url = `https://image.tmdb.org/t/p/${size}${posterPath}`
    return validateImageUrl(url, 'image.tmdb.org')
  } catch (error) {
    console.error('Failed to build TMDB image URL:', error)
    return null
  }
}

/**
 * Gets the fallback image URL
 * @returns Fallback image URL
 */
export function getFallbackImageUrl(): string {
  return DEFAULT_FALLBACK_IMAGE
}

/**
 * Checks if an image URL is from an allowed domain
 * @param url The URL to check
 * @returns True if the URL is from an allowed domain
 */
export function isAllowedImageDomain(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return Object.keys(ALLOWED_IMAGE_DOMAINS).includes(urlObj.hostname)
  } catch {
    return false
  }
}

/**
 * Sanitizes image alt text to prevent XSS
 * @param altText The alt text to sanitize
 * @returns Sanitized alt text
 */
export function sanitizeImageAltText(altText: string): string {
  // Remove any HTML tags and limit length
  return altText
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')
    .substring(0, 100)
    .trim()
} 