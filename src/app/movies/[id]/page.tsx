import { notFound } from 'next/navigation'
import { MovieService } from '@/lib/services/movie-service'
import { MovieCard } from '@/components/movie-card'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Star, Users, TrendingUp, Film, Award, Edit } from 'lucide-react'
import Link from 'next/link'
import { headers } from 'next/headers'

interface MovieDetailPageProps {
  params: {
    id: string
  }
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movieId = parseInt(params.id, 10)
  
  if (isNaN(movieId)) {
    notFound()
  }

  const result = await MovieService.getMovieById(movieId)
  
  if (!result.success || !result.data) {
    notFound()
  }

  const movie = result.data

  // Get the referrer to determine where the user came from
  const headersList = headers()
  const referer = headersList.get('referer')
  
  // Determine the back navigation URL
  let backUrl = '/movies'
  let backText = 'Back to Movies'
  
  if (referer) {
    const refererUrl = new URL(referer)
    if (refererUrl.pathname === '/sci-fi-movies') {
      backUrl = '/sci-fi-movies'
      backText = 'Back to Sci-Fi Movies'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation and Actions */}
        <div className="mb-8 flex justify-between items-center">
          <Link href={backUrl}>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-200 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              {backText}
            </Button>
          </Link>
          
          <Link href={`/movies/${movieId}/edit`}>
            <Button 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
            >
              <Edit className="h-4 w-4" />
              Edit Movie
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster and Basic Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div>
                <MovieCard movie={movie} disableHover={true} />
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Overview */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  {movie.title}
                </CardTitle>
                <CardDescription className="text-lg text-slate-300 leading-relaxed mt-4">
                  {movie.overview}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Statistics */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-white">
                  <Film className="h-5 w-5 text-blue-400" />
                  Movie Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-700/30 border border-slate-600 hover:bg-slate-700/50 transition-colors duration-200">
                    <div className="p-2 rounded-full bg-yellow-500/20">
                      <Star className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Rating</p>
                      <p className="font-bold text-lg text-white">{movie.voteAverage.toFixed(1)}/10</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-700/30 border border-slate-600 hover:bg-slate-700/50 transition-colors duration-200">
                    <div className="p-2 rounded-full bg-blue-500/20">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Votes</p>
                      <p className="font-bold text-lg text-white">{movie.voteCount.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-700/30 border border-slate-600 hover:bg-slate-700/50 transition-colors duration-200">
                    <div className="p-2 rounded-full bg-green-500/20">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Popularity</p>
                      <p className="font-bold text-lg text-white">{movie.popularity.toFixed(1)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-700/30 border border-slate-600 hover:bg-slate-700/50 transition-colors duration-200">
                    <div className="p-2 rounded-full bg-purple-500/20">
                      <Calendar className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Release Date</p>
                      <p className="font-bold text-lg text-white">
                        {new Date(movie.releaseDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Genres */}
            {movie.genres.length > 0 && (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-xl">
                <CardHeader className="pb-4">
                                  <CardTitle className="flex items-center gap-2 text-xl text-white">
                  <Award className="h-5 w-5 text-amber-400" />
                  Genres
                </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {movie.genres.map(({ genre }) => (
                      <Badge 
                        key={genre.id} 
                        variant="secondary"
                        className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white border-slate-600 px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
                      >
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cast */}
            {movie.actors.length > 0 && (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-white">Cast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {movie.actors.map(({ actor }) => (
                      <div 
                        key={actor.id} 
                        className="p-3 rounded-lg bg-slate-700/30 border border-slate-600 hover:bg-slate-700/50 transition-colors duration-200 text-sm text-slate-200 hover:text-white"
                      >
                        {actor.name}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Directors */}
            {movie.directors.length > 0 && (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-white">Directors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {movie.directors.map(({ director }) => (
                      <div 
                        key={director.id} 
                        className="p-3 rounded-lg bg-slate-700/30 border border-slate-600 hover:bg-slate-700/50 transition-colors duration-200 text-sm text-slate-200 hover:text-white"
                      >
                        {director.name}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 