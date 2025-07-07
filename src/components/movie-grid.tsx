import { MovieCard } from "./movie-card"
import { Movie } from "@/types/movie"

interface MovieGridProps {
  movies: Movie[]
  emptyMessage?: string
  showCount?: boolean
  countLabel?: string
}

export function MovieGrid({ 
  movies, 
  emptyMessage = "No movies found.",
  showCount = false,
  countLabel
}: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
          />
        ))}
      </div>
      
      {showCount && (
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            {countLabel || `Found ${movies.length} movie${movies.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      )}
    </>
  )
} 