import Link from "next/link"

export function Footer() {
  return (
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
  )
} 