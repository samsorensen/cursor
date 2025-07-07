'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Movie } from '@/types/movie'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { updateMovieAction } from '@/lib/actions/movie-actions'
import { Loader2, Save, X } from 'lucide-react'

interface EditMovieFormProps {
  movie: Movie
}

export function EditMovieForm({ movie }: EditMovieFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await updateMovieAction(movie.id, formData)
      
      if (result.success) {
        // Redirect to the movie details page
        router.push(`/movies/${movie.id}`)
        router.refresh()
      } else {
        setError(result.error?.message || 'Failed to update movie')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Error updating movie:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Movie Details</CardTitle>
        <CardDescription className="text-slate-300">
          Update the movie information below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
          {/* Error Display */}
          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">
              Title *
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              defaultValue={movie.title}
              required
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter movie title"
            />
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <Label htmlFor="overview" className="text-white">
              Overview *
            </Label>
            <Textarea
              id="overview"
              name="overview"
              defaultValue={movie.overview}
              required
              rows={4}
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500 resize-none"
              placeholder="Enter movie overview"
            />
          </div>

          {/* Release Date */}
          <div className="space-y-2">
            <Label htmlFor="releaseDate" className="text-white">
              Release Date *
            </Label>
            <Input
              id="releaseDate"
              name="releaseDate"
              type="date"
              defaultValue={new Date(movie.releaseDate).toISOString().split('T')[0]}
              required
              className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Vote Average */}
          <div className="space-y-2">
            <Label htmlFor="voteAverage" className="text-white">
              Vote Average (0-10)
            </Label>
            <Input
              id="voteAverage"
              name="voteAverage"
              type="number"
              step="any"
              min="0"
              max="10"
              defaultValue={movie.voteAverage}
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter vote average"
            />
          </div>

          {/* Vote Count */}
          <div className="space-y-2">
            <Label htmlFor="voteCount" className="text-white">
              Vote Count
            </Label>
            <Input
              id="voteCount"
              name="voteCount"
              type="number"
              min="0"
              defaultValue={movie.voteCount}
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter vote count"
            />
          </div>

          {/* Popularity */}
          <div className="space-y-2">
            <Label htmlFor="popularity" className="text-white">
              Popularity
            </Label>
            <Input
              id="popularity"
              name="popularity"
              type="number"
              step="any"
              min="0"
              defaultValue={movie.popularity}
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter popularity score"
            />
          </div>

          {/* Poster Path */}
          <div className="space-y-2">
            <Label htmlFor="posterPath" className="text-white">
              Poster Path
            </Label>
            <Input
              id="posterPath"
              name="posterPath"
              type="text"
              value={movie.posterPath || 'No poster available'}
              readOnly
              className="bg-slate-600/50 border-slate-500 text-slate-300 cursor-not-allowed"
            />
          </div>

          {/* Backdrop Path */}
          <div className="space-y-2">
            <Label htmlFor="backdropPath" className="text-white">
              Backdrop Path
            </Label>
            <Input
              id="backdropPath"
              name="backdropPath"
              type="text"
              value={movie.backdropPath || 'No backdrop available'}
              readOnly
              className="bg-slate-600/50 border-slate-500 text-slate-300 cursor-not-allowed"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/movies/${movie.id}`)}
              className="flex items-center gap-2 bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:border-slate-500 hover:text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 