import { db } from '@/lib/db'
import { Movie } from '@/types/movie'

export class MovieService {
  static async getTopRatedMovies(limit: number = 10): Promise<Movie[]> {
    return db.movie.findMany({
      take: limit,
      include: {
        genres: {
          include: {
            genre: true
          }
        },
        actors: {
          include: {
            actor: true
          }
        },
        directors: {
          include: {
            director: true
          }
        }
      },
      orderBy: {
        voteAverage: 'desc'
      }
    })
  }

  static async getMoviesByGenre(genreName: string): Promise<Movie[]> {
    return db.movie.findMany({
      where: {
        genres: {
          some: {
            genre: {
              name: genreName
            }
          }
        }
      },
      include: {
        genres: {
          include: {
            genre: true
          }
        },
        actors: {
          include: {
            actor: true
          }
        },
        directors: {
          include: {
            director: true
          }
        }
      },
      orderBy: {
        voteAverage: 'desc'
      }
    })
  }

  static async getSciFiMovies(): Promise<Movie[]> {
    return this.getMoviesByGenre('Science Fiction')
  }
} 