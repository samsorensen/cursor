export interface MovieGenre {
  genre: {
    id: number
    name: string
  }
}

export interface MovieActor {
  actor: {
    id: number
    name: string
  }
}

export interface MovieDirector {
  director: {
    id: number
    name: string
  }
}

export interface Movie {
  id: number
  title: string
  overview: string
  releaseDate: Date
  popularity: number
  voteAverage: number
  voteCount: number
  posterPath?: string | null
  backdropPath?: string | null
  genres: MovieGenre[]
  actors: MovieActor[]
  directors: MovieDirector[]
} 