'use server'

import { ActorService } from '@/lib/services/actor-service'
import { ActorUpdateData } from '@/types/actor'
import { revalidatePath } from 'next/cache'

export async function getAllActors() {
  return await ActorService.getAllActors()
}

export async function getActorById(actorId: number) {
  return await ActorService.getActorById(actorId)
}

export async function updateActor(actorId: number, updateData: ActorUpdateData) {
  const result = await ActorService.updateActor(actorId, updateData)
  
  if (result.success) {
    // Revalidate the actors list page and the specific actor page
    revalidatePath('/actors')
    revalidatePath(`/actors/${actorId}`)
  }
  
  return result
} 