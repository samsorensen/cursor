'use client'

import Image from 'next/image'
import { useState } from 'react'
import { buildTmdbImageUrl, sanitizeImageAltText } from '@/lib/image-utils'
import { PlaceholderImage } from './placeholder-image'

interface SecureImageProps {
  src: string | null | undefined
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
  onError?: () => void
  fallbackSrc?: string
}

export function SecureImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  sizes,
  priority = false,
  onError,
  fallbackSrc
}: SecureImageProps) {
  const [imageError, setImageError] = useState(false)

  // Build secure image URL
  const secureSrc = buildTmdbImageUrl(src)

  // Handle image load error
  const handleImageError = () => {
    setImageError(true)
    onError?.()
  }

  // If no valid image source or error occurred, show placeholder
  if (!secureSrc || imageError) {
    return (
      <PlaceholderImage
        className={className}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        alt={alt}
      />
    )
  }

  const sanitizedAlt = sanitizeImageAltText(alt)

  return (
    <Image
      src={secureSrc}
      alt={sanitizedAlt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={handleImageError}
      onLoad={() => setImageError(false)}
      // Security attributes
      crossOrigin="anonymous"
      loading={priority ? 'eager' : 'lazy'}
    />
  )
} 