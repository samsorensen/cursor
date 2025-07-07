import { AlertTriangle, RefreshCw, Database, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppError } from '@/types/errors'

interface ServiceErrorProps {
  error: AppError
  onRetry?: () => void
  title?: string
  description?: string
}

export function ServiceError({ 
  error, 
  onRetry, 
  title = "Something went wrong",
  description = "We encountered an error while loading the data."
}: ServiceErrorProps) {
  const getErrorIcon = () => {
    switch (error.code) {
      case 'DATABASE_ERROR':
      case 'DATABASE_CONNECTION_ERROR':
      case 'FETCH_TOP_RATED_MOVIES_ERROR':
      case 'FETCH_MOVIES_BY_GENRE_ERROR':
        return <Database className="h-8 w-8 text-red-500" />
      case 'VALIDATION_ERROR':
        return <Shield className="h-8 w-8 text-yellow-500" />
      default:
        return <AlertTriangle className="h-8 w-8 text-red-500" />
    }
  }

  const getErrorMessage = () => {
    if (error.message) return error.message
    
    switch (error.code) {
      case 'DATABASE_CONNECTION_ERROR':
        return 'Unable to connect to the database. Please check your connection and try again.'
      case 'FETCH_TOP_RATED_MOVIES_ERROR':
        return 'Failed to load top-rated movies. Please try again later.'
      case 'FETCH_MOVIES_BY_GENRE_ERROR':
        return 'Failed to load movies for this genre. Please try again later.'
      case 'VALIDATION_ERROR':
        return 'Invalid request parameters. Please check your input and try again.'
      default:
        return 'An unexpected error occurred. Please try again.'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-4">
          {getErrorIcon()}
        </div>
        
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-slate-400 mb-6">{getErrorMessage()}</p>
        
        {error.details && process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-400 mb-2">
              Error Details (Development)
            </summary>
            <pre className="text-xs text-slate-500 bg-slate-800 p-3 rounded overflow-auto">
              {JSON.stringify(error.details, null, 2)}
            </pre>
          </details>
        )}
        
        {onRetry && (
          <Button onClick={onRetry} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
} 