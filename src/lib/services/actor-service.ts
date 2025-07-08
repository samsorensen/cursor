import { db } from '@/lib/db'
import { Actor, ActorWithMovies, ActorUpdateData } from '@/types/actor'
import { ServiceResult, DatabaseError, ValidationError } from '@/types/errors'

export class ActorService {
  /**
   * Get all actors with their movies
   */
  static async getAllActors(): Promise<ServiceResult<ActorWithMovies[]>> {
    try {
      const actors = await db.actor.findMany({
        select: {
          id: true,
          name: true,
          movies: {
            select: {
              movie: {
                select: {
                  id: true,
                  title: true,
                  releaseDate: true,
                  voteAverage: true
                }
              }
            }
          }
        },
        orderBy: {
          name: 'asc'
        }
      })

      return {
        data: actors,
        error: null,
        success: true
      }
    } catch (error) {
      console.error('Error fetching actors:', error)
      
      return {
        data: null,
        error: new DatabaseError(
          'Failed to fetch actors',
          'FETCH_ACTORS_ERROR',
          { originalError: error instanceof Error ? error.message : String(error) }
        ),
        success: false
      }
    }
  }

  /**
   * Get actor by ID with their movies
   */
  static async getActorById(actorId: number): Promise<ServiceResult<ActorWithMovies | null>> {
    try {
      // Input validation
      if (!actorId || actorId <= 0) {
        return {
          data: null,
          error: new ValidationError(
            'Actor ID must be a positive number',
            'INVALID_ACTOR_ID',
            { providedId: actorId }
          ),
          success: false
        }
      }

      const actor = await db.actor.findUnique({
        where: { id: actorId },
        select: {
          id: true,
          name: true,
          movies: {
            select: {
              movie: {
                select: {
                  id: true,
                  title: true,
                  releaseDate: true,
                  voteAverage: true
                }
              }
            }
          }
        }
      })

      return {
        data: actor,
        error: null,
        success: true
      }
    } catch (error) {
      console.error('Error fetching actor:', error)
      
      return {
        data: null,
        error: new DatabaseError(
          'Failed to fetch actor',
          'FETCH_ACTOR_ERROR',
          { 
            actorId,
            originalError: error instanceof Error ? error.message : String(error) 
          }
        ),
        success: false
      }
    }
  }

  /**
   * Update actor name
   */
  static async updateActor(actorId: number, updateData: ActorUpdateData): Promise<ServiceResult<Actor | null>> {
    try {
      // Input validation
      if (!actorId || actorId <= 0) {
        return {
          data: null,
          error: new ValidationError(
            'Actor ID must be a positive number',
            'INVALID_ACTOR_ID',
            { providedId: actorId }
          ),
          success: false
        }
      }

      if (!updateData.name || updateData.name.trim().length === 0) {
        return {
          data: null,
          error: new ValidationError(
            'Actor name cannot be empty',
            'INVALID_ACTOR_NAME',
            { providedName: updateData.name }
          ),
          success: false
        }
      }

      const updatedActor = await db.actor.update({
        where: { id: actorId },
        data: {
          name: updateData.name.trim()
        },
        select: {
          id: true,
          name: true
        }
      })

      return {
        data: updatedActor,
        error: null,
        success: true
      }
    } catch (error) {
      console.error('Error updating actor:', error)
      
      return {
        data: null,
        error: new DatabaseError(
          'Failed to update actor',
          'UPDATE_ACTOR_ERROR',
          { 
            actorId,
            updateData,
            originalError: error instanceof Error ? error.message : String(error) 
          }
        ),
        success: false
      }
    }
  }
} 