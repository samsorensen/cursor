import { db } from '@/lib/db'

export default async function MoviesPage() {
  // Fetch movies with their relationships
  const movies = await db.movie.findMany({
    take: 10, // Limit to 10 movies for demo
    include: {
      genres: {
        include: {
          genre: true
        }
      },
      actors: {
        include: {
          actor: true
        }
      },
      directors: {
        include: {
          director: true
        }
      }
    },
    orderBy: {
      voteAverage: 'desc'
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Top Rated Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
            <p className="text-gray-600 text-sm mb-2">
              {movie.releaseDate.toLocaleDateString()}
            </p>
            <p className="text-sm mb-3 line-clamp-3">{movie.overview}</p>
            
            <div className="mb-3">
              <span className="text-sm font-medium">Rating: </span>
              <span className="text-sm text-gray-600">
                {movie.voteAverage.toFixed(1)}/10 ({movie.voteCount} votes)
              </span>
            </div>

            {movie.genres.length > 0 && (
              <div className="mb-3">
                <span className="text-sm font-medium">Genres: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {movie.genres.map(({ genre }) => (
                    <span
                      key={genre.id}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {movie.directors.length > 0 && (
              <div className="mb-3">
                <span className="text-sm font-medium">Director{movie.directors.length > 1 ? 's' : ''}: </span>
                <span className="text-sm text-gray-600">
                  {movie.directors.map(({ director }) => director.name).join(', ')}
                </span>
              </div>
            )}

            {movie.actors.length > 0 && (
              <div>
                <span className="text-sm font-medium">Cast: </span>
                <span className="text-sm text-gray-600">
                  {movie.actors.slice(0, 3).map(({ actor }) => actor.name).join(', ')}
                  {movie.actors.length > 3 && ` +${movie.actors.length - 3} more`}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 