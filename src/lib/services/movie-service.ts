import { db } from '@/lib/db'
import { Movie } from '@/types/movie'
import { ServiceResult, DatabaseError, ValidationError } from '@/types/errors'

export class MovieService {
  /**
   * Optimized query to get top rated movies with all related data in a single query
   * This eliminates N+1 queries by using proper joins
   */
  static async getTopRatedMovies(limit: number = 10): Promise<ServiceResult<Movie[]>> {
    try {
      // Input validation
      if (limit <= 0 || limit > 100) {
        return {
          data: null,
          error: new ValidationError(
            'Limit must be between 1 and 100',
            'INVALID_LIMIT',
            { providedLimit: limit }
          ),
          success: false
        }
      }

      // Single optimized query with all related data
      const movies = await db.movie.findMany({
        take: limit,
        select: {
          id: true,
          title: true,
          overview: true,
          releaseDate: true,
          popularity: true,
          voteAverage: true,
          voteCount: true,
          posterPath: true,
          backdropPath: true,
          // Optimized genre selection with direct join
          genres: {
            select: {
              genre: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          // Optimized actor selection with direct join
          actors: {
            select: {
              actor: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          // Optimized director selection with direct join
          directors: {
            select: {
              director: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        },
        orderBy: {
          voteAverage: 'desc'
        }
      })

      return {
        data: movies,
        error: null,
        success: true
      }
    } catch (error) {
      console.error('Error fetching top rated movies:', error)
      
      return {
        data: null,
        error: new DatabaseError(
          'Failed to fetch top rated movies',
          'FETCH_TOP_RATED_MOVIES_ERROR',
          { originalError: error instanceof Error ? error.message : String(error) }
        ),
        success: false
      }
    }
  }

  /**
   * Optimized query to get movies by genre with all related data in a single query
   * This eliminates N+1 queries by using proper joins and filtering
   */
  static async getMoviesByGenre(genreName: string): Promise<ServiceResult<Movie[]>> {
    try {
      // Input validation
      if (!genreName || typeof genreName !== 'string' || genreName.trim().length === 0) {
        return {
          data: null,
          error: new ValidationError(
            'Genre name is required and must be a non-empty string',
            'INVALID_GENRE_NAME',
            { providedGenre: genreName }
          ),
          success: false
        }
      }

      // Single optimized query with genre filtering and all related data
      const movies = await db.movie.findMany({
        where: {
          genres: {
            some: {
              genre: {
                name: genreName.trim()
              }
            }
          }
        },
        select: {
          id: true,
          title: true,
          overview: true,
          releaseDate: true,
          popularity: true,
          voteAverage: true,
          voteCount: true,
          posterPath: true,
          backdropPath: true,
          // Optimized genre selection with direct join
          genres: {
            select: {
              genre: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          // Optimized actor selection with direct join
          actors: {
            select: {
              actor: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          // Optimized director selection with direct join
          directors: {
            select: {
              director: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        },
        orderBy: {
          voteAverage: 'desc'
        }
      })

      return {
        data: movies,
        error: null,
        success: true
      }
    } catch (error) {
      console.error('Error fetching movies by genre:', error)
      
      return {
        data: null,
        error: new DatabaseError(
          'Failed to fetch movies by genre',
          'FETCH_MOVIES_BY_GENRE_ERROR',
          { 
            genreName,
            originalError: error instanceof Error ? error.message : String(error) 
          }
        ),
        success: false
      }
    }
  }

  /**
   * Optimized query to get movies with pagination support
   * This provides better performance for large datasets
   */
  static async getMoviesWithPagination(
    page: number = 1,
    pageSize: number = 20,
    genreFilter?: string
  ): Promise<ServiceResult<{ movies: Movie[]; total: number; page: number; totalPages: number }>> {
    try {
      // Input validation
      if (page < 1 || pageSize < 1 || pageSize > 100) {
        return {
          data: null,
          error: new ValidationError(
            'Page must be >= 1 and pageSize must be between 1 and 100',
            'INVALID_PAGINATION_PARAMS',
            { page, pageSize }
          ),
          success: false
        }
      }

      const skip = (page - 1) * pageSize

      // Build where clause for genre filtering
      const whereClause = genreFilter ? {
        genres: {
          some: {
            genre: {
              name: genreFilter.trim()
            }
          }
        }
      } : {}

      // Get total count for pagination
      const total = await db.movie.count({
        where: whereClause
      })

      // Get movies with pagination
      const movies = await db.movie.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        select: {
          id: true,
          title: true,
          overview: true,
          releaseDate: true,
          popularity: true,
          voteAverage: true,
          voteCount: true,
          posterPath: true,
          backdropPath: true,
          genres: {
            select: {
              genre: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          actors: {
            select: {
              actor: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          directors: {
            select: {
              director: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        },
        orderBy: {
          voteAverage: 'desc'
        }
      })

      const totalPages = Math.ceil(total / pageSize)

      return {
        data: {
          movies,
          total,
          page,
          totalPages
        },
        error: null,
        success: true
      }
    } catch (error) {
      console.error('Error fetching movies with pagination:', error)
      
      return {
        data: null,
        error: new DatabaseError(
          'Failed to fetch movies with pagination',
          'FETCH_MOVIES_PAGINATION_ERROR',
          { 
            page,
            pageSize,
            genreFilter,
            originalError: error instanceof Error ? error.message : String(error) 
          }
        ),
        success: false
      }
    }
  }

  /**
   * Optimized query to get a single movie by ID with all related data
   * This eliminates N+1 queries for single movie details
   */
  static async getMovieById(movieId: number): Promise<ServiceResult<Movie | null>> {
    try {
      // Input validation
      if (!movieId || movieId <= 0) {
        return {
          data: null,
          error: new ValidationError(
            'Movie ID must be a positive integer',
            'INVALID_MOVIE_ID',
            { providedId: movieId }
          ),
          success: false
        }
      }

      const movie = await db.movie.findUnique({
        where: { id: movieId },
        select: {
          id: true,
          title: true,
          overview: true,
          releaseDate: true,
          popularity: true,
          voteAverage: true,
          voteCount: true,
          posterPath: true,
          backdropPath: true,
          genres: {
            select: {
              genre: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          actors: {
            select: {
              actor: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          },
          directors: {
            select: {
              director: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      })

      return {
        data: movie,
        error: null,
        success: true
      }
    } catch (error) {
      console.error('Error fetching movie by ID:', error)
      
      return {
        data: null,
        error: new DatabaseError(
          'Failed to fetch movie by ID',
          'FETCH_MOVIE_BY_ID_ERROR',
          { 
            movieId,
            originalError: error instanceof Error ? error.message : String(error) 
          }
        ),
        success: false
      }
    }
  }

  static async getSciFiMovies(): Promise<ServiceResult<Movie[]>> {
    return this.getMoviesByGenre('Science Fiction')
  }

  // Helper method to check database connection
  static async checkConnection(): Promise<ServiceResult<boolean>> {
    try {
      await db.$queryRaw`SELECT 1`
      return {
        data: true,
        error: null,
        success: true
      }
    } catch (error) {
      console.error('Database connection check failed:', error)
      return {
        data: false,
        error: new DatabaseError(
          'Database connection failed',
          'DATABASE_CONNECTION_ERROR',
          { originalError: error instanceof Error ? error.message : String(error) }
        ),
        success: false
      }
    }
  }
} 