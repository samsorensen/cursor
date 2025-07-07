import { Star } from "lucide-react"
import { Movie } from "@/types/movie"
import { SecureImage } from "./secure-image"
import Link from "next/link"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-[#101926] rounded-xl overflow-hidden shadow-lg flex flex-col items-center p-0 w-full group cursor-pointer">
      {/* Poster with hover overlay and button */}
      <div className="relative w-full aspect-[2/3] flex items-center justify-center">
        <SecureImage
          src={movie.posterPath}
          alt={`${movie.title} poster`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        {/* READ MORE Button on hover */}
        <Link href={`/movies/${movie.id}`}>
          <button
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f20034] hover:bg-[#d1002d] text-white font-bold rounded-full px-8 py-3 text-base shadow-lg transition-all duration-200 z-20 tracking-wide opacity-0 group-hover:opacity-100 whitespace-nowrap"
            tabIndex={-1}
          >
            READ MORE
          </button>
        </Link>
      </div>
      {/* Title */}
      <div className="w-full flex flex-col items-start px-4 pt-4 pb-2">
        <span className="text-[#E6E93A] text-base font-extrabold uppercase tracking-wide leading-tight mb-2">
          {movie.title}
        </span>
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-6 w-6 text-yellow-400 fill-yellow-400 mr-1" />
          <span className="text-2xl font-bold text-white">
            {movie.voteAverage.toFixed(3)}
          </span>
          <span className="text-base text-slate-400 font-medium">/10</span>
        </div>
      </div>
    </div>
  )
} 