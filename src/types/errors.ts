export interface AppError {
  name: string
  message: string
  code: string
  statusCode?: number
  details?: Record<string, any>
}

export class DatabaseError extends Error implements AppError {
  public code: string
  public statusCode: number
  public details?: Record<string, any>

  constructor(message: string, code: string = 'DATABASE_ERROR', details?: Record<string, any>) {
    super(message)
    this.name = 'DatabaseError'
    this.code = code
    this.statusCode = 500
    this.details = details
  }
}

export class ValidationError extends Error implements AppError {
  public code: string
  public statusCode: number
  public details?: Record<string, any>

  constructor(message: string, code: string = 'VALIDATION_ERROR', details?: Record<string, any>) {
    super(message)
    this.name = 'ValidationError'
    this.code = code
    this.statusCode = 400
    this.details = details
  }
}

export class NotFoundError extends Error implements AppError {
  public code: string
  public statusCode: number

  constructor(message: string, code: string = 'NOT_FOUND') {
    super(message)
    this.name = 'NotFoundError'
    this.code = code
    this.statusCode = 404
  }
}

export type ServiceResult<T> = {
  data: T | null
  error: AppError | null
  success: boolean
} 