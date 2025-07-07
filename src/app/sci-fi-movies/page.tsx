// Import required components and services for the science fiction movies page
import { MovieGrid } from '@/components/movie-grid'
import { MovieService } from '@/lib/services/movie-service'
import { ServiceError } from '@/components/service-error'
import { Badge } from "@/components/ui/badge"
import { Film, Star } from "lucide-react"

/**
 * SciFiMoviesPage - A Next.js server component that displays a curated collection of science fiction movies
 * 
 * This page fetches science fiction movies from the database and renders them in a responsive grid layout
 * with a themed header, hero section, and footer. The page uses a dark gradient theme with blue/purple
 * accents to match the sci-fi genre aesthetic.
 * 
 * Error Handling:
 * - Handles database connection errors
 * - Handles validation errors for invalid parameters
 * - Displays user-friendly error messages
 * - Provides retry functionality for recoverable errors
 */
export default async function SciFiMoviesPage() {
  // Fetch science fiction movies from the database using the MovieService
  // This is a server-side data fetch that happens at build time or request time
  const result = await MovieService.getSciFiMovies()

  // Handle error cases
  if (!result.success || result.error) {
    return (
      <div className="flex flex-col min-h-full">
        {/* Hero Section - Compact introduction with visual effects */}
        <section className="w-full py-8 md:py-12 relative overflow-hidden">
          {/* Background gradient overlay for visual depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
          {/* Content container with relative positioning to appear above background */}
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <div className="space-y-2">
                {/* Genre badge with themed styling */}
                <Badge
                  variant="secondary"
                  className="w-fit bg-blue-500/20 text-blue-300 border-blue-500/30"
                >
                  <Star className="w-3 h-3 mr-1" />
                  Sci-Fi Collection
                </Badge>
                {/* Page title with gradient text effect */}
                <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Science Fiction Movies
                </h1>
                {/* Descriptive subtitle with responsive text sizing */}
                <p className="max-w-[600px] text-slate-300 text-sm md:text-base">
                  Explore the universe of science fiction cinema.
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
              title="Failed to Load Sci-Fi Movies"
              description="We couldn't load the science fiction movies at this time."
            />
          </div>
        </section>
      </div>
    )
  }

  const sciFiMovies = result.data!

  return (
    // Main container with full viewport height and dark gradient background
    // The gradient creates a space-like atmosphere fitting for sci-fi content
    <div className="flex flex-col min-h-full">
      {/* Hero Section - Compact introduction with visual effects */}
      <section className="w-full py-8 md:py-12 relative overflow-hidden">
        {/* Background gradient overlay for visual depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        {/* Content container with relative positioning to appear above background */}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-3 text-center">
            <div className="space-y-2">
              {/* Genre badge with themed styling */}
              <Badge
                variant="secondary"
                className="w-fit bg-blue-500/20 text-blue-300 border-blue-500/30"
              >
                <Star className="w-3 h-3 mr-1" />
                Sci-Fi Collection
              </Badge>
              {/* Page title with gradient text effect */}
              <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Science Fiction Movies
              </h1>
              {/* Descriptive subtitle with responsive text sizing */}
              <p className="max-w-[600px] text-slate-300 text-sm md:text-base">
                Explore the universe of science fiction cinema.
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
            movies={sciFiMovies}
            emptyMessage="No science fiction movies found."
            showCount={true}
            // Dynamic count label that handles singular/plural grammar correctly
            countLabel={`Found ${sciFiMovies.length} science fiction movie${
              sciFiMovies.length !== 1 ? "s" : ""
            }`}
          />
        </div>
      </section>
    </div>
  );
} 