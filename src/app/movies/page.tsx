// Import required components and services for the movies page
import { MovieGrid } from '@/components/movie-grid'
import { MovieService } from '@/lib/services/movie-service'
import { Badge } from "@/components/ui/badge"
import { Film, Star, Rocket } from "lucide-react"
import Link from "next/link"

/**
 * MoviesPage - A Next.js server component that displays a curated collection of top-rated movies
 * 
 * This page fetches the highest-rated movies from the database and displays them in a responsive grid.
 * It serves as a showcase for the best content in the streaming service, helping users discover
 * critically acclaimed films. The page maintains the same dark theme and sci-fi aesthetic as other pages.
 */
export default async function MoviesPage() {
  // Fetch top-rated movies from the database using the MovieService
  // This is a server-side data fetch that happens at build time or request time
  // The limit of 10 movies provides a focused selection of the best content
  const movies = await MovieService.getTopRatedMovies(10)

  return (
    // Main container with full viewport height and dark gradient background
    // The gradient creates a space-like atmosphere consistent with the app's theme
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header Section - Sticky navigation with branding and page context */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80 sticky top-0 z-50">
        {/* Brand logo and navigation link back to home page */}
        <Link href="/" className="flex items-center justify-center gap-2">
          <Rocket className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            SciFi Stream
          </span>
        </Link>
        {/* Page context indicator showing current section */}
        <div className="ml-auto flex items-center gap-2">
          <Film className="h-6 w-6 text-blue-400" />
          <span className="text-sm font-medium text-slate-300">Top Rated Movies</span>
        </div>
      </header>

      {/* Main content area that takes up remaining viewport space */}
      <main className="flex-1">
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
      </main>

      {/* Footer Section - Copyright and attribution information */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-slate-700/50 bg-slate-900/80">
        {/* Copyright notice with dynamic year */}
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} SciFi Stream. All rights reserved.</p>
        {/* Right side footer content: attribution */}
        <div className="sm:ml-auto flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
          {/* Data source attribution with proper external link handling */}
          <p className="text-xs text-slate-400">
            Movie data provided by{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              The Movie Database (TMDb)
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
} 