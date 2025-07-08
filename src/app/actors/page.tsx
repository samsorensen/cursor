import { getAllActors } from '@/lib/actions/actor-actions'
import { ActorTable } from '@/components/actor-table'
import { ServiceError } from '@/components/service-error'

export default async function ActorsPage() {
  const result = await getAllActors()

  if (!result.success) {
    return <ServiceError error={result.error!} />
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Actors</h1>
        <p className="text-slate-400">
          Browse all actors and their filmography. Click the expand button to see movies for each actor.
        </p>
      </div>

      <ActorTable actors={result.data || []} />
    </div>
  )
} 