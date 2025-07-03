import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Movie } from "@/types/movie"
import { Star } from "lucide-react"

interface MovieCardProps {
  movie: Movie
  highlightGenre?: string
}

export function MovieCard({ movie, highlightGenre }: MovieCardProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
          {movie.title}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>{movie.releaseDate.toLocaleDateString()}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span>{movie.voteAverage.toFixed(1)}</span>
            <span className="text-slate-500">({movie.voteCount})</span>
          </div>
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