import { AppError, DatabaseError, ValidationError } from '@/types/errors'

/**
 * Wraps an async operation with error handling
 * @param operation The async operation to execute
 * @param errorMessage Custom error message
 * @param errorCode Custom error code
 * @returns Promise with result or error
 */
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  errorMessage: string = 'Operation failed',
  errorCode: string = 'OPERATION_ERROR'
): Promise<{ data: T | null; error: AppError | null; success: boolean }> {
  try {
    const result = await operation()
    return {
      data: result,
      error: null,
      success: true
    }
  } catch (error) {
    console.error(`Error in ${errorCode}:`, error)
    
    return {
      data: null,
      error: new DatabaseError(
        errorMessage,
        errorCode,
        { originalError: error instanceof Error ? error.message : String(error) }
      ),
      success: false
    }
  }
}

/**
 * Validates required parameters
 * @param params Object containing parameters to validate
 * @returns Validation result
 */
export function validateRequiredParams(params: Record<string, any>): { isValid: boolean; error?: ValidationError } {
  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
      return {
        isValid: false,
        error: new ValidationError(
          `Missing required parameter: ${key}`,
          'MISSING_REQUIRED_PARAM',
          { missingParam: key, providedValue: value }
        )
      }
    }
  }
  
  return { isValid: true }
}

/**
 * Validates numeric range
 * @param value The value to validate
 * @param min Minimum allowed value
 * @param max Maximum allowed value
 * @param paramName Name of the parameter for error messages
 * @returns Validation result
 */
export function validateNumericRange(
  value: number,
  min: number,
  max: number,
  paramName: string
): { isValid: boolean; error?: ValidationError } {
  if (typeof value !== 'number' || isNaN(value)) {
    return {
      isValid: false,
      error: new ValidationError(
        `${paramName} must be a valid number`,
        'INVALID_NUMERIC_VALUE',
        { paramName, providedValue: value }
      )
    }
  }
  
  if (value < min || value > max) {
    return {
      isValid: false,
      error: new ValidationError(
        `${paramName} must be between ${min} and ${max}`,
        'VALUE_OUT_OF_RANGE',
        { paramName, providedValue: value, min, max }
      )
    }
  }
  
  return { isValid: true }
}

/**
 * Logs errors with consistent formatting
 * @param error The error to log
 * @param context Additional context information
 */
export function logError(error: AppError, context?: Record<string, any>): void {
  const logData = {
    timestamp: new Date().toISOString(),
    error: {
      name: error.name,
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      details: error.details
    },
    context
  }
  
  console.error('Application Error:', JSON.stringify(logData, null, 2))
} 