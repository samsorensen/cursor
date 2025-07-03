// Import required components and services for the science fiction movies page
import { MovieGrid } from '@/components/movie-grid'
import { MovieService } from '@/lib/services/movie-service'
import { Badge } from "@/components/ui/badge"
import { Film, Rocket, Star } from "lucide-react"
import Link from "next/link"

/**
 * SciFiMoviesPage - A Next.js server component that displays a curated collection of science fiction movies
 * 
 * This page fetches science fiction movies from the database and renders them in a responsive grid layout
 * with a themed header, hero section, and footer. The page uses a dark gradient theme with blue/purple
 * accents to match the sci-fi genre aesthetic.
 */
export default async function SciFiMoviesPage() {
  // Fetch science fiction movies from the database using the MovieService
  // This is a server-side data fetch that happens at build time or request time
  const sciFiMovies = await MovieService.getSciFiMovies()

  return (
    // Main container with full viewport height and dark gradient background
    // The gradient creates a space-like atmosphere fitting for sci-fi content
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
          <span className="text-sm font-medium text-slate-300">Science Fiction Movies</span>
        </div>
      </header>

      {/* Main content area that takes up remaining viewport space */}
      <main className="flex-1">
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
              highlightGenre="Science Fiction"
              emptyMessage="No science fiction movies found."
              showCount={true}
              // Dynamic count label that handles singular/plural grammar correctly
              countLabel={`Found ${sciFiMovies.length} science fiction movie${
                sciFiMovies.length !== 1 ? "s" : ""
              }`}
            />
          </div>
        </section>
      </main>

      {/* Footer Section - Copyright and attribution information */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-slate-700/50 bg-slate-900/80">
        {/* Copyright notice with dynamic year */}
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} SciFi Stream. All rights reserved.
        </p>
        {/* External attribution and links */}
        <div className="sm:ml-auto flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
          <p className="text-xs text-slate-400">
            Movie data provided by{" "}
            {/* External link to data source with proper security attributes */}
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
  );
} 