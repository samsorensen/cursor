import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Movie } from "@/types/movie"
import { Star, Film } from "lucide-react"
import Image from "next/image"

interface MovieCardProps {
  movie: Movie
  highlightGenre?: string
}

export function MovieCard({ movie, highlightGenre }: MovieCardProps) {
  const posterUrl = movie.posterPath 
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : null

  return (
    <Card className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group overflow-hidden">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={`${movie.title} poster`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <Film className="h-12 w-12 text-slate-500" />
          </div>
        )}
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span className="text-xs font-medium text-white">{movie.voteAverage.toFixed(1)}</span>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
          {movie.title}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>{movie.releaseDate.toLocaleDateString()}</span>
          <span>•</span>
          <span className="text-slate-500">({movie.voteCount} votes)</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
          {movie.overview}
        </p>
        
        {movie.genres.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Genres</span>
            <div className="flex flex-wrap gap-1">
              {movie.genres.map(({ genre }) => (
                <Badge
                  key={genre.id}
                  variant="secondary"
                  className={
                    highlightGenre && genre.name === highlightGenre
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30'
                      : 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30'
                  }
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {movie.directors.length > 0 && (
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Director{movie.directors.length > 1 ? 's' : ''}
            </span>
            <p className="text-sm text-slate-300">
              {movie.directors.map(({ director }) => director.name).join(', ')}
            </p>
          </div>
        )}

        {movie.actors.length > 0 && (
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Cast</span>
            <p className="text-sm text-slate-300">
              {movie.actors.slice(0, 3).map(({ actor }) => actor.name).join(', ')}
              {movie.actors.length > 3 && (
                <span className="text-slate-500"> +{movie.actors.length - 3} more</span>
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 