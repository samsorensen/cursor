// Import required components and services for the movies page
import { MovieGrid } from '@/components/movie-grid'
import { MovieService } from '@/lib/services/movie-service'
import { ServiceError } from '@/components/service-error'
import { Badge } from "@/components/ui/badge"
import { Film, Star } from "lucide-react"

/**
 * MoviesPage - A Next.js server component that displays a curated collection of top-rated movies
 * 
 * This page fetches the highest-rated movies from the database and displays them in a responsive grid.
 * It serves as a showcase for the best content in the streaming service, helping users discover
 * critically acclaimed films. The page maintains the same dark theme and sci-fi aesthetic as other pages.
 * 
 * Error Handling:
 * - Handles database connection errors
 * - Handles validation errors for invalid parameters
 * - Displays user-friendly error messages
 * - Provides retry functionality for recoverable errors
 */
export default async function MoviesPage() {
  // Fetch top-rated movies from the database using the MovieService
  // This is a server-side data fetch that happens at build time or request time
  // The limit of 10 movies provides a focused selection of the best content
  const result = await MovieService.getTopRatedMovies(10)

  // Handle error cases
  if (!result.success || result.error) {
    return (
      <div className="flex flex-col min-h-full">
        {/* Hero Section - Compact introduction with visual effects */}
        <section className="w-full py-8 md:py-12 relative overflow-hidden">
          {/* Background gradient overlay for visual depth and atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
          {/* Content container with relative positioning to appear above background */}
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                {/* Quality badge indicating the curated nature of the content */}
                <Badge variant="secondary" className="w-fit bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <Star className="w-3 h-3 mr-1" />
                  Highest Rated
                </Badge>
                {/* Page title with gradient text effect and responsive sizing */}
                <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Top Rated Movies
                </h1>
                {/* Descriptive subtitle explaining the content selection criteria */}
                <p className="max-w-[600px] text-slate-300 text-sm md:text-base">
                  Discover the most critically acclaimed films from our collection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Error Section */}
        <section className="w-full py-8 bg-slate-800/50">
          <div className="container mx-auto px-4 md:px-6">
            <ServiceError 
              error={result.error!}
              title="Failed to Load Movies"
              description="We couldn't load the top-rated movies at this time."
            />
          </div>
        </section>
      </div>
    )
  }

  const movies = result.data!

  return (
    // Main container with full viewport height and dark gradient background
    // The gradient creates a space-like atmosphere consistent with the app's theme
    <div className="flex flex-col min-h-full">
      {/* Hero Section - Compact introduction with visual effects */}
      <section className="w-full py-8 md:py-12 relative overflow-hidden">
        {/* Background gradient overlay for visual depth and atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        {/* Content container with relative positioning to appear above background */}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-3 text-center">
            <div className="space-y-2">
              {/* Quality badge indicating the curated nature of the content */}
              <Badge variant="secondary" className="w-fit bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Star className="w-3 h-3 mr-1" />
                Highest Rated
              </Badge>
              {/* Page title with gradient text effect and responsive sizing */}
              <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Top Rated Movies
              </h1>
              {/* Descriptive subtitle explaining the content selection criteria */}
              <p className="max-w-[600px] text-slate-300 text-sm md:text-base">
                Discover the most critically acclaimed films from our collection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid Section - Main content area displaying the movie collection */}
      <section className="w-full py-8 bg-slate-800/50">
        <div className="container mx-auto px-4 md:px-6">
          {/* MovieGrid component handles the display and interaction logic for the movie collection */}
          <MovieGrid 
            movies={movies}
            emptyMessage="No movies found."
            showCount={true}
            // Dynamic count label that handles singular/plural grammar correctly
            // This provides users with immediate feedback about the number of results
            countLabel={`Found ${movies.length} top-rated movie${movies.length !== 1 ? 's' : ''}`}
          />
        </div>
      </section>
    </div>
  )
} 