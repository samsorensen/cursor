# Database Setup with Prisma and SQLite

This project uses Prisma ORM with SQLite to manage movie data. The database includes movies, actors, directors, and genres with proper relationships.

## Database Schema

### Models

- **Movie**: Contains movie information (title, overview, release date, ratings, etc.)
- **Actor**: Contains actor information
- **Director**: Contains director information  
- **Genre**: Contains genre information
- **MovieGenre**: Junction table for movie-genre relationships
- **MovieActor**: Junction table for movie-actor relationships
- **MovieDirector**: Junction table for movie-director relationships

### Relationships

- Movies can have multiple genres, actors, and directors
- Genres, actors, and directors can be associated with multiple movies
- All relationships are many-to-many through junction tables

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install prisma @prisma/client
   npm install -D tsx
   ```

2. **Initialize Prisma**
   ```bash
   npx prisma init --datasource-provider sqlite
   ```

3. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

4. **Create Database Tables**
   ```bash
   npx prisma db push
   ```

5. **Seed the Database**
   ```bash
   npm run db:seed
   ```

## Available Scripts

- `npm run db:seed`: Populate the database with sample data from `seed-data/`
- `npx prisma studio`: Open Prisma Studio to view and edit data in a web interface
- `npx prisma generate`: Regenerate the Prisma client after schema changes
- `npx prisma db push`: Push schema changes to the database

## Usage in Next.js

### Database Connection

Import the database client in your components:

```typescript
import { db } from '@/lib/db'
```

### Example Queries

**Fetch movies with relationships:**
```typescript
const movies = await db.movie.findMany({
  include: {
    genres: { include: { genre: true } },
    actors: { include: { actor: true } },
    directors: { include: { director: true } }
  }
})
```

**Find movies by genre:**
```typescript
const actionMovies = await db.movie.findMany({
  include: {
    genres: {
      include: {
        genre: true
      }
    }
  },
  where: {
    genres: {
      some: {
        genre: {
          name: 'Action'
        }
      }
    }
  }
})
```

**Find movies by director:**
```typescript
const nolanMovies = await db.movie.findMany({
  include: {
    directors: {
      include: {
        director: true
      }
    }
  },
  where: {
    directors: {
      some: {
        director: {
          name: 'Christopher Nolan'
        }
      }
    }
  }
})
```

## Data Structure

The seed data includes:
- **Movies**: 1,000+ movies with ratings, release dates, and metadata
- **Actors**: 1,000+ actors
- **Directors**: 200+ directors  
- **Genres**: 19 movie genres (Action, Adventure, Comedy, etc.)

## File Structure

```
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── seed.ts               # Database seeding script
├── src/
│   ├── lib/
│   │   └── db.ts             # Database client configuration
│   └── generated/
│       └── prisma/           # Generated Prisma client
├── seed-data/
│   ├── movies.json           # Movie data
│   ├── actors.json           # Actor data
│   ├── directors.json        # Director data
│   └── genres.json           # Genre data
└── dev.db                    # SQLite database file
```

## Environment Variables

The database connection is configured in `.env`:
```
DATABASE_URL="file:./dev.db"
```

## Notes

- The database file (`dev.db`) is created automatically when you run `npx prisma db push`
- The seeding script clears existing data before inserting new data
- All relationships are properly maintained during seeding
- The database uses SQLite for simplicity and development purposes 