export interface Actor {
  id: number
  name: string
}

export interface ActorWithMovies extends Actor {
  movies: {
    movie: {
      id: number
      title: string
      releaseDate: Date
      voteAverage: number
    }
  }[]
}

export interface ActorUpdateData {
  name: string
} 