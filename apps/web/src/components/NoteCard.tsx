import React from 'react'
import { Note } from '../lib/api'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { formatDate } from '../lib/utils'
import { Edit, Trash2 } from 'lucide-react'

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (id: string) => void
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Criado em {formatDate(note.createdAt)}
        </p>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm line-clamp-4 whitespace-pre-wrap">
          {note.content}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between gap-2">
        <Button
          className="flex items-center gap-2"
          variant="secondary"
          size="sm"
          onClick={() => onEdit(note)}
          aria-label={`Editar nota ${note.title}`}
        >
          <Edit className="h-4 w-4" />
          Editar
        </Button>
        
        <Button
          className="flex items-center gap-2"
          variant="destructive"
          size="sm"
          onClick={() => onDelete(note.id)}
          aria-label={`Excluir nota ${note.title}`}
        >
          Excluir
          <Trash2 className="h-4 w-4" />

        </Button>
      </CardFooter>
    </Card>
  )
}
