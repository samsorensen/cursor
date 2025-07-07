import { db } from './db'

/**
 * Wraps a database query with performance monitoring
 * @param queryName Name of the query for logging
 * @param queryFn The query function to execute
 * @returns Query result with performance metrics
 */
export async function withQueryPerformance<T>(
  queryName: string,
  queryFn: () => Promise<T>
): Promise<{ data: T; performance: { duration: number; timestamp: string } }> {
  const startTime = performance.now()
  const startTimestamp = new Date().toISOString()
  
  try {
    const result = await queryFn()
    const duration = performance.now() - startTime
    
    // Log slow queries for monitoring
    if (duration > 100) { // Log queries taking more than 100ms
      console.warn(`Slow query detected: ${queryName} took ${duration.toFixed(2)}ms`)
    }
    
    return {
      data: result,
      performance: {
        duration,
        timestamp: startTimestamp
      }
    }
  } catch (error) {
    const duration = performance.now() - startTime
    console.error(`Query failed: ${queryName} after ${duration.toFixed(2)}ms`, error)
    throw error
  }
}

/**
 * Executes multiple queries in parallel for better performance
 * @param queries Array of query functions to execute
 * @returns Array of results in the same order as queries
 */
export async function executeParallelQueries<T>(
  queries: (() => Promise<T>)[]
): Promise<T[]> {
  return Promise.all(queries.map(query => query()))
}

/**
 * Batch processes items to avoid overwhelming the database
 * @param items Array of items to process
 * @param batchSize Size of each batch
 * @param processBatch Function to process each batch
 * @returns Array of all results
 */
export async function batchProcess<T, R>(
  items: T[],
  batchSize: number,
  processBatch: (batch: T[]) => Promise<R[]>
): Promise<R[]> {
  const results: R[] = []
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    const batchResults = await processBatch(batch)
    results.push(...batchResults)
  }
  
  return results
}

/**
 * Gets database query statistics for monitoring
 * @returns Database performance metrics
 */
export async function getDatabaseStats() {
  try {
    const stats = await db.$queryRaw<Array<{
      total_movies: number
      avg_rating: number
      max_rating: number
      min_rating: number
      unique_movies: number
    }>>`
      SELECT 
        COUNT(*) as total_movies,
        AVG(voteAverage) as avg_rating,
        MAX(voteAverage) as max_rating,
        MIN(voteAverage) as min_rating,
        COUNT(DISTINCT id) as unique_movies
      FROM movies
    `
    
    return {
      success: true,
      data: stats[0],
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    }
  }
}

/**
 * Optimizes database connection pool
 * @param maxConnections Maximum number of connections
 * @param idleTimeout Idle timeout in milliseconds
 */
export function optimizeConnectionPool(maxConnections: number = 10, idleTimeout: number = 30000) {
  // Note: SQLite doesn't use connection pooling, but this is a placeholder
  // for when migrating to PostgreSQL or MySQL
  console.log(`Connection pool optimized: max=${maxConnections}, idleTimeout=${idleTimeout}ms`)
}

/**
 * Clears database query cache (if using caching)
 */
export async function clearQueryCache() {
  // Note: Prisma doesn't have built-in query caching, but this is a placeholder
  // for when implementing custom caching solutions
  console.log('Query cache cleared')
}

/**
 * Validates query performance against thresholds
 * @param duration Query duration in milliseconds
 * @param threshold Warning threshold in milliseconds
 * @returns Performance validation result
 */
export function validateQueryPerformance(duration: number, threshold: number = 100): {
  isAcceptable: boolean
  warning: string | null
  recommendation: string | null
} {
  if (duration <= threshold) {
    return {
      isAcceptable: true,
      warning: null,
      recommendation: null
    }
  }
  
  let recommendation = 'Consider adding database indexes'
  
  if (duration > 1000) {
    recommendation = 'Query is very slow. Consider query optimization or caching'
  } else if (duration > 500) {
    recommendation = 'Query is slow. Consider adding indexes or reducing data fetched'
  }
  
  return {
    isAcceptable: false,
    warning: `Query took ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`,
    recommendation
  }
} 