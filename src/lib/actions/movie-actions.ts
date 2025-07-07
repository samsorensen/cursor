'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { MovieService } from '@/lib/services/movie-service'
import { ServiceResult } from '@/types/errors'

export async function updateMovieAction(
  movieId: number,
  formData: FormData
): Promise<ServiceResult<null>> {
  try {
    // Extract form data
    const title = formData.get('title') as string
    const overview = formData.get('overview') as string
    const releaseDateStr = formData.get('releaseDate') as string
    const voteAverageStr = formData.get('voteAverage') as string
    const voteCountStr = formData.get('voteCount') as string
    const popularityStr = formData.get('popularity') as string
    const posterPath = formData.get('posterPath') as string
    const backdropPath = formData.get('backdropPath') as string

    // Prepare update data
    const updateData: any = {}

    if (title) updateData.title = title
    if (overview) updateData.overview = overview
    if (releaseDateStr) updateData.releaseDate = new Date(releaseDateStr)
    if (voteAverageStr) updateData.voteAverage = parseFloat(voteAverageStr)
    if (voteCountStr) updateData.voteCount = parseInt(voteCountStr, 10)
    if (popularityStr) updateData.popularity = parseFloat(popularityStr)
    if (posterPath !== undefined) updateData.posterPath = posterPath || null
    if (backdropPath !== undefined) updateData.backdropPath = backdropPath || null

    // Call the service to update the movie
    const result = await MovieService.updateMovie(movieId, updateData)

    if (result.success) {
      // Revalidate the movie detail page and movies list
      revalidatePath(`/movies/${movieId}`)
      revalidatePath('/movies')
      revalidatePath('/sci-fi-movies')
      
      return {
        data: null,
        error: null,
        success: true
      }
    } else {
      return {
        data: null,
        error: result.error,
        success: false
      }
    }
  } catch (error) {
    console.error('Error in updateMovieAction:', error)
    
    return {
      data: null,
      error: {
        name: 'ActionError',
        message: 'An unexpected error occurred while updating the movie',
        code: 'UPDATE_MOVIE_ACTION_ERROR',
        details: { originalError: error instanceof Error ? error.message : String(error) }
      },
      success: false
    }
  }
} 