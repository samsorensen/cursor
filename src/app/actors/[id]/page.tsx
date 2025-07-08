import { notFound } from 'next/navigation'
import { getActorById } from '@/lib/actions/actor-actions'
import { EditActorForm } from '@/components/edit-actor-form'
import { ServiceError } from '@/components/service-error'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ActorPageProps {
  params: {
    id: string
  }
}

export default async function ActorPage({ params }: ActorPageProps) {
  const actorId = parseInt(params.id, 10)
  
  if (isNaN(actorId)) {
    notFound()
  }

  const result = await getActorById(actorId)

  if (!result.success) {
    return <ServiceError error={result.error!} />
  }

  if (!result.data) {
    notFound()
  }

  const actor = result.data

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Edit Actor</h1>
        <p className="text-slate-400">
          Update actor information and view their filmography.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Edit Actor Details</CardTitle>
          </CardHeader>
          <CardContent>
            <EditActorForm actor={actor} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Filmography ({actor.movies.length} movies)</CardTitle>
          </CardHeader>
          <CardContent>
            {actor.movies.length > 0 ? (
              <div className="space-y-3">
                {actor.movies.map(({ movie }) => (
                  <div
                    key={movie.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{movie.title}</span>
                      <Badge variant="secondary">
                        {new Date(movie.releaseDate).getFullYear()}
                      </Badge>
                    </div>
                    <Badge variant="outline">
                      ⭐ {movie.voteAverage.toFixed(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">No movies found for this actor.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 