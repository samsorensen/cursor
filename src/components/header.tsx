import Link from "next/link"
import { Rocket } from "lucide-react"

export function Header() {
  return (
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
        <Link href="/" className="text-sm font-medium hover:text-blue-400 transition-colors">
          Home
        </Link>
        <Link href="/movies" className="text-sm font-medium hover:text-blue-400 transition-colors">
          Movies
        </Link>
        <Link href="/sci-fi-movies" className="text-sm font-medium hover:text-blue-400 transition-colors">
          Sci-Fi Movies
        </Link>
        <Link href="/actors" className="text-sm font-medium hover:text-blue-400 transition-colors">
          Actors
        </Link>
        <Link href="/#pricing" className="text-sm font-medium hover:text-blue-400 transition-colors">
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
  )
} 