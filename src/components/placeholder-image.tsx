import { Film } from 'lucide-react'

interface PlaceholderImageProps {
  className?: string
  width?: number
  height?: number
  fill?: boolean
  alt?: string
}

export function PlaceholderImage({ 
  className = '', 
  width, 
  height, 
  fill = false,
  alt = 'Image placeholder'
}: PlaceholderImageProps) {
  return (
    <div 
      className={`bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center ${className}`}
      style={fill ? {} : { width, height }}
      role="img"
      aria-label={alt}
    >
      <div className="text-center">
        <Film className="w-8 h-8 text-slate-500 mx-auto mb-2" />
        <p className="text-xs text-slate-500">No Image</p>
      </div>
    </div>
  )
} 