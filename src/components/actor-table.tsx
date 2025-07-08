'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Edit } from 'lucide-react'
import { ActorWithMovies } from '@/types/actor'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ActorTableProps {
  actors: ActorWithMovies[]
}

export function ActorTable({ actors }: ActorTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const toggleRow = (actorId: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(actorId)) {
      newExpanded.delete(actorId)
    } else {
      newExpanded.add(actorId)
    }
    setExpandedRows(newExpanded)
  }

  const formatDate = (date: Date) => {
    return new Date(date).getFullYear()
  }

  return (
    <div className="rounded-md border border-gray-700 bg-gray-900 shadow-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-800 hover:bg-gray-800 border-gray-700">
            <TableHead className="w-12 text-gray-200 font-semibold"></TableHead>
            <TableHead className="text-gray-200 font-semibold">Name</TableHead>
            <TableHead className="text-right text-gray-200 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {actors.map((actor) => {
            const isExpanded = expandedRows.has(actor.id)
            const hasMovies = actor.movies.length > 0

            return (
              <React.Fragment key={actor.id}>
                <TableRow className="hover:bg-gray-800 border-b border-gray-700">
                  <TableCell className="py-3">
                    {hasMovies ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRow(actor.id)}
                        className="h-6 w-6 p-0 hover:bg-gray-700 text-gray-300"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    ) : (
                      <div className="w-6" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-gray-100 py-3">{actor.name}</TableCell>
                  <TableCell className="text-right py-3">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:border-gray-500"
                    >
                      <Link href={`/actors/${actor.id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
                
                {isExpanded && hasMovies && (
                  <TableRow>
                    <TableCell colSpan={3} className="bg-gray-800 border-b border-gray-700">
                      <div className="p-4">
                        <h4 className="font-medium mb-3 text-gray-100">Movies ({actor.movies.length})</h4>
                        <div className="grid gap-2">
                          {actor.movies.map(({ movie }) => (
                            <div
                              key={movie.id}
                              className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-700 shadow-sm"
                            >
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-gray-100">{movie.title}</span>
                                <Badge variant="secondary" className="bg-gray-700 text-gray-200 border-gray-600">
                                  {formatDate(movie.releaseDate)}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-yellow-900/20 text-yellow-300 border-yellow-700">
                                  ⭐ {movie.voteAverage.toFixed(1)}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  asChild
                                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                >
                                  <Link href={`/movies/${movie.id}`}>
                                    View Movie
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
} 