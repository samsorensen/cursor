import { PrismaClient } from '../src/generated/prisma'
import moviesData from '../seed-data/movies.json'
import actorsData from '../seed-data/actors.json'
import directorsData from '../seed-data/directors.json'
import genresData from '../seed-data/genres.json'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  console.log('🗑️ Clearing existing data...')
  await prisma.movieDirector.deleteMany()
  await prisma.movieActor.deleteMany()
  await prisma.movieGenre.deleteMany()
  await prisma.movie.deleteMany()
  await prisma.director.deleteMany()
  await prisma.actor.deleteMany()
  await prisma.genre.deleteMany()

  // Seed genres
  console.log('📝 Seeding genres...')
  await prisma.genre.createMany({
    data: genresData.map((genre) => ({
      id: genre.id,
      name: genre.name,
    })),
  })

  // Seed actors
  console.log('🎭 Seeding actors...')
  await prisma.actor.createMany({
    data: actorsData.map((actor) => ({
      id: actor.id,
      name: actor.name,
    })),
  })

  // Seed directors
  console.log('🎬 Seeding directors...')
  await prisma.director.createMany({
    data: directorsData.map((director) => ({
      id: director.id,
      name: director.name,
    })),
  })

  // Seed movies
  console.log('🎬 Seeding movies...')
  for (const movie of moviesData) {
    await prisma.movie.create({
      data: {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        releaseDate: new Date(movie.releaseDate),
        posterPath: movie.posterPath,
        backdropPath: movie.backdropPath,
        popularity: movie.popularity,
        voteAverage: movie.voteAverage,
        voteCount: movie.voteCount,
      },
    })
  }

  // Create relationships
  console.log('🔗 Creating relationships...')
  for (const movie of moviesData) {
    // Movie-Genre relationships
    if (movie.genreIds && movie.genreIds.length > 0) {
      await prisma.movieGenre.createMany({
        data: movie.genreIds.map((genreId) => ({
          movieId: movie.id,
          genreId: genreId,
        })),
      })
    }

    // Movie-Actor relationships
    if (movie.actorIds && movie.actorIds.length > 0) {
      await prisma.movieActor.createMany({
        data: movie.actorIds.map((actorId) => ({
          movieId: movie.id,
          actorId: actorId,
        })),
      })
    }

    // Movie-Director relationships
    if (movie.directorIds && movie.directorIds.length > 0) {
      await prisma.movieDirector.createMany({
        data: movie.directorIds.map((directorId) => ({
          movieId: movie.id,
          directorId: directorId,
        })),
      })
    }
  }

  console.log('✅ Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 