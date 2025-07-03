// Import UI components from the design system for building the landing page
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// Import Lucide React icons for visual elements throughout the page
import { Check, Film, Rocket, Star, Zap } from "lucide-react"
// Import Next.js components for optimized images and client-side navigation
import Image from "next/image"
import Link from "next/link"
// Import the hero image asset for the main visual section
import heroImage from '../../images/hero-image.png'

/**
 * HomePage - The main landing page component for SciFi Stream
 * 
 * This is a comprehensive landing page that showcases the sci-fi movie streaming service.
 * It includes a hero section, features overview, pricing plans, and call-to-action sections.
 * The page uses a dark theme with blue/purple gradients to match the sci-fi aesthetic.
 * All sections are fully responsive and optimized for various screen sizes.
 */
export default function Component() {
  return (
    // Main container with full viewport height and dark gradient background
    // The gradient creates a space-like atmosphere fitting for sci-fi content
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header Section - Sticky navigation with branding and main navigation links */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80 sticky top-0 z-50">
        {/* Brand logo and navigation link back to home page */}
        <Link href="/" className="flex items-center justify-center gap-2">
          <Rocket className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            SciFi Stream
          </span>
        </Link>
        {/* Main navigation menu with links to different sections and pages */}
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link href="/movies" className="text-sm font-medium hover:text-blue-400 transition-colors">
            Movies
          </Link>
          <Link href="/sci-fi-movies" className="text-sm font-medium hover:text-blue-400 transition-colors">
            Sci-Fi Movies
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-blue-400 transition-colors">
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-blue-400 transition-colors">
            About
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-blue-400 transition-colors">
            Contact
          </Link>
        </nav>
      </header>

      {/* Main content area that takes up remaining viewport space */}
      <main className="flex-1">
        {/* Hero Section - Main value proposition with call-to-action buttons */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          {/* Background gradient overlay for visual depth and atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          {/* Content container with relative positioning to appear above background */}
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Two-column grid layout: content on left, hero image on right */}
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              {/* Left column: Main content and call-to-action buttons */}
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  {/* Genre badge indicating the service focus */}
                  <Badge variant="secondary" className="w-fit bg-blue-500/20 text-blue-300 border-blue-500/30">
                    <Star className="w-3 h-3 mr-1" />
                    Popular Sci-Fi Movies
                  </Badge>
                  {/* Main headline with gradient text effect and responsive sizing */}
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    Explore the Universe of Science Fiction
                  </h1>
                  {/* Descriptive subtitle explaining the service value proposition */}
                  <p className="max-w-[600px] text-slate-300 md:text-xl">
                    Discover the most popular science fiction movies, from classic space operas to cutting-edge
                    cyberpunk. Stream unlimited sci-fi content with our premium collection.
                  </p>
                </div>
                {/* Call-to-action buttons with responsive layout */}
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  {/* Primary CTA button linking to sci-fi movies page */}
                  <Link href="/sci-fi-movies">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Film className="w-4 h-4 mr-2" />
                      Explore Sci-Fi Movies
                    </Button>
                  </Link>
                  {/* Secondary CTA button linking to all movies page */}
                  <Link href="/movies">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                    >
                      View All Movies
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Right column: Hero image with responsive aspect ratio */}
              <div className="mx-auto aspect-video overflow-hidden rounded-xl lg:order-last">
                <Image
                  src={heroImage}
                  width="600"
                  height="400"
                  alt="Science Fiction Movies Collage"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Highlighting key service benefits */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-800/50">
          <div className="container mx-auto px-4 md:px-6">
            {/* Section header with title and description */}
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose SciFi Stream?</h2>
                <p className="max-w-[900px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The ultimate destination for science fiction enthusiasts with curated content and premium features.
                </p>
              </div>
            </div>
            {/* Three-column grid of feature cards */}
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {/* Feature 1: Curated Collection */}
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20">
                  <Star className="h-8 w-8 text-blue-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Curated Collection</h3>
                  <p className="text-slate-300">
                    Hand-picked selection of the best science fiction movies from all eras and subgenres.
                  </p>
                </div>
              </div>
              {/* Feature 2: 4K Streaming */}
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20">
                  <Zap className="h-8 w-8 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">4K Streaming</h3>
                  <p className="text-slate-300">
                    Experience your favorite sci-fi movies in stunning 4K quality with Dolby Atmos sound.
                  </p>
                </div>
              </div>
              {/* Feature 3: Exclusive Content */}
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                  <Film className="h-8 w-8 text-green-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Exclusive Content</h3>
                  <p className="text-slate-300">
                    Access to rare sci-fi gems, director's cuts, and behind-the-scenes content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section - Subscription plans with detailed feature comparisons */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            {/* Section header */}
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Choose Your Subscription</h2>
                <p className="max-w-[900px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Select the perfect plan for your sci-fi movie streaming needs.
                </p>
              </div>
            </div>
            {/* Three-column grid of pricing cards */}
            <div className="grid gap-6 mt-12 md:grid-cols-3 md:gap-8 max-w-6xl mx-auto">
              {/* Basic Plan: Explorer */}
              <Card className="bg-slate-800/50 border-slate-700 text-white">
                <CardHeader>
                  <CardTitle className="text-xl">Explorer</CardTitle>
                  <CardDescription className="text-slate-300">Perfect for casual sci-fi fans</CardDescription>
                  <div className="text-3xl font-bold">
                    $9.99<span className="text-base font-normal text-slate-400">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Feature list with checkmark icons */}
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Access to 500+ sci-fi movies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">HD streaming quality</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">1 device at a time</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Mobile & tablet access</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-transparent" variant="outline">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>

              {/* Popular Plan: Voyager (highlighted as most popular) */}
              <Card className="bg-gradient-to-b from-blue-700/50 to-purple-700/50 border-blue-500 text-white relative">
                {/* Popular badge positioned at the top */}
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
                  Most Popular
                </Badge>
                <CardHeader>
                  <CardTitle className="text-xl">Voyager</CardTitle>
                  <CardDescription className="text-slate-500">Best value for true sci-fi enthusiasts</CardDescription>
                  <div className="text-3xl font-bold">
                    $19.99<span className="text-base font-normal text-slate-500">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Access to 1000+ sci-fi movies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">4K Ultra HD streaming</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">3 devices simultaneously</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">All devices + Smart TV</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Exclusive director's cuts</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Start Free Trial
                  </Button>
                </CardFooter>
              </Card>

              {/* Premium Plan: Commander */}
              <Card className="bg-slate-800/50 border-slate-700 text-white">
                <CardHeader>
                  <CardTitle className="text-xl">Commander</CardTitle>
                  <CardDescription className="text-slate-300">Ultimate experience for collectors</CardDescription>
                  <div className="text-3xl font-bold">
                    $29.99<span className="text-base font-normal text-slate-400">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Complete sci-fi library</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">4K + Dolby Atmos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Unlimited devices</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Download for offline viewing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Behind-the-scenes content</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Early access to new releases</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-transparent" variant="outline">
                    Go Premium
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section - Final conversion opportunity */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Explore the Galaxy?</h2>
                <p className="max-w-[600px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of sci-fi fans and start your journey through the cosmos of cinema today.
                </p>
              </div>
              {/* Final CTA buttons with responsive layout */}
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Start Your Free Trial
                </Button>
                <Link href="/movies">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                  >
                    Browse Movies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section - Copyright, attribution, and legal links */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-slate-700/50 bg-slate-900/80">
        {/* Copyright notice with dynamic year */}
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} SciFi Stream. All rights reserved.</p>
        {/* Right side footer content: attribution and legal links */}
        <div className="sm:ml-auto flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
          {/* Data source attribution */}
          <p className="text-xs text-slate-400">
            Movie data provided by{" "}
            <Link
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              The Movie Database (TMDb)
            </Link>
          </p>
          {/* Legal navigation links */}
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs text-slate-400 hover:text-slate-300">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-slate-400 hover:text-slate-300">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
