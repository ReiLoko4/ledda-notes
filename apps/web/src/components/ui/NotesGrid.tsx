import React from 'react'
import { Note } from '../../lib/api'
import { NoteCard } from '../NoteCard'

interface NotesGridProps {
  notes: Note[]
  onEdit: (note: Note) => void
  onDelete: (id: string) => void
}

export const NotesGrid: React.FC<NotesGridProps> = ({ notes, onEdit, onDelete }) => {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Suas Notas</h2>
            <p className="text-muted-foreground">
              {notes.length} {notes.length === 1 ? 'nota encontrada' : 'notas encontradas'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note.id} className="transform transition-all duration-200 hover:-translate-y-1">
              <NoteCard
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
