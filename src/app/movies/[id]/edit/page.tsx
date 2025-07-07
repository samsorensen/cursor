import { notFound, redirect } from 'next/navigation'
import { MovieService } from '@/lib/services/movie-service'
import { EditMovieForm } from '@/components/edit-movie-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface EditMoviePageProps {
  params: {
    id: string
  }
}

export default async function EditMoviePage({ params }: EditMoviePageProps) {
  const movieId = parseInt(params.id, 10)
  
  if (isNaN(movieId)) {
    notFound()
  }

  const result = await MovieService.getMovieById(movieId)
  
  if (!result.success || !result.data) {
    notFound()
  }

  const movie = result.data

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href={`/movies/${movieId}`}>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-200 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Movie Details
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
            Edit Movie
          </h1>
          <p className="text-lg text-slate-300">
            Update the details for "{movie.title}"
          </p>
        </div>

        {/* Edit Form */}
        <div className="max-w-4xl">
          <EditMovieForm movie={movie} />
        </div>
      </div>
    </div>
  )
} 