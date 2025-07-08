'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Actor } from '@/types/actor'
import { updateActor } from '@/lib/actions/actor-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertTriangle } from 'lucide-react'

interface EditActorFormProps {
  actor: Actor
}

export function EditActorForm({ actor }: EditActorFormProps) {
  const router = useRouter()
  const [name, setName] = useState(actor.name)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const result = await updateActor(actor.id, { name })

    if (result.success) {
      router.push('/actors')
    } else {
      setError(result.error?.message || 'Failed to update actor')
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Actor Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter actor name"
          required
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          <AlertTriangle className="h-4 w-4" />
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading || !name.trim()}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/actors')}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
} 