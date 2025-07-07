import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function MovieNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-red-400 mb-4">
              Movie Not Found
            </h1>
            <p className="text-lg text-slate-300">
              The movie you're looking for doesn't exist in our database.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link href="/movies">
              <Button 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                Go back to movies
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 